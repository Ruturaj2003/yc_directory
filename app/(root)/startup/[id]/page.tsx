import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { View } from '@/components/View';

const md = markdownit();
const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || '');
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          className="w-[400px] h-auto rounded-xl"
          alt="Thumbnail"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between gap-5">
            <Link
              href={`/user/${post.author._id}`}
              className="flex items-center gap-3"
            >
              <Image
                src={post.author.image}
                alt="author Pic"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium">@{post.author.username}</p>
              </div>
            </Link>
            <p className="category">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Startup Details</h3>
          {parsedContent ? (
            <article
              className="prose max-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">NO Details Provided</p>
          )}
        </div>
        <hr className="divider" />

        {/* Editor Pics */}
      </section>
      <Suspense fallback={<Skeleton className="view_skeleton"></Skeleton>}>
        <View id={id}></View>
      </Suspense>
    </>
  );
};

export default page;
