'use client';

import Link from 'next/link';
import { AvatarPhoto } from './avatar-photo';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

type MyServerProps = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function MyServer({ id, name, imageUrl }: MyServerProps) {
  const { serverId } = useParams();

  const isCurrentServer = serverId === id;

  return (
    <div className='flex'>
      <Link href={`/server/${id}`} className='mx-auto'>
        <AvatarPhoto
          className={cn(
            'size-[52px] hover:opacity-75 transition',
            isCurrentServer &&
              'border-blue-600 dark:border-blue-300 border-[3px]'
          )}
          src={imageUrl}
          alt={name}
        />
      </Link>
    </div>
  );
}
