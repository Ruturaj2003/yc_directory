import { auth, signOut, signIn } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href={'/'}>
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href={'/startup/create'}>
                <span>Create</span>
              </Link>

              <button onClick={signOut}>
                <span>Log Out</span>
              </button>

              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.email}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn('github', { redirectTo: '/dashboard' });
              }}
            >
              <button type="submit">Log In</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
