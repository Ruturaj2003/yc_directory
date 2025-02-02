import { formatDate } from '@/lib/utils';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

type StartupCardType = {
  _createdAt: string;
  views: number;
  author: { _id: number; name: string };
  _id: number;
  description: string;
  category: string;
  title: string;
  image: string;
};

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _createdAt,
    views,
    author: { _id: authId, name },
    description,
    _id,
    category,
    title,
    image,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <span>{post.views}</span>
          <Eye className="size-6 text-primary"></Eye>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authId}`}>
            <p className="text-16-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1 ">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authId}`}>
          <Image
            src="https://placehold.co/48x48"
            alt="Place Holder Image"
            width={48}
            height={48}
            className="rounded-full"
          ></Image>
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img className="startup-card_img" src={image} alt="PlaceHolder" />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};
export default StartupCard;
