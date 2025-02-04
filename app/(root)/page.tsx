import StartupCard, { StartupCardType } from '@/components/StartupCard';
import SearchForm from '../../components/SearchForm';

import { STARTUPS_QUERY } from '@/sanity/lib/queries';

import { sanityFetch, SanityLive } from '@/sanity/lib/live';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  // const posts = await client.fetch(STARTUPS_QUERY);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY });

  // const posts = [
  //   {
  //     _createdAt: new Date().toISOString(),
  //     views: 69,
  //     author: { _id: 1, name: 'Ray' },
  //     _id: 1,
  //     description: 'Dummy Desc',
  //     category: 'Robots',
  //     title: 'The Last Knight',
  //     image:
  //       'https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24390847/last_knight_optimus.jpeg?quality=90&strip=all&crop=23.501263423879%2C0%2C54.200884396715%2C100&w=828',
  //   },
  // ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect with entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query}></SearchForm>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : 'All Startups'}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => {
              return <StartupCard key={index} post={post}></StartupCard>;
            })
          ) : (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>
      <SanityLive></SanityLive>
    </>
  );
}
