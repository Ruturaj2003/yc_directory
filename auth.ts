import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { client } from './sanity/lib/client';
import { AUTHOR__BY_GITHUB_ID_QUERY } from './sanity/lib/queries';
import { writeClient } from './sanity/lib/write-client';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { name, email, image }, account, profile }) {
      if (!profile || !profile.id) {
        console.error('GitHub profile is missing ID:', profile);
        return false;
      }

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR__BY_GITHUB_ID_QUERY, {
          id: profile.id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id: profile.id,
          name: name,
          username: profile.login,
          email: email,
          image: image,
          bio: profile.bio || '',
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR__BY_GITHUB_ID_QUERY, {
            id: profile.id,
          });

        if (user) {
          token.id = user._id; // Ensure `user` is valid before accessing `_id`
          token.user = {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            image: user.image,
            bio: user.bio,
          };
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user; // Assign entire user object from token
      }
      return session;
    },
  },
});
