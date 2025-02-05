import { client } from '@/sanity/lib/client';
import Ping from './Ping';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';

export const View = async ({ id }: { id: string }) => {
  const viewsObj = await client
    .withConfig({
      useCdn: false,
    })
    .fetch(STARTUP_VIEWS_QUERY, { id });
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping></Ping>
      </div>
      <p className="view-text">
        <span className="font-black">{viewsObj.views} Views</span>
      </p>
    </div>
  );
};
