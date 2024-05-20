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
      <section
        className={cn(
          'h-[52px] bg-blue-600 dark:bg-blue-300 w-1 rounded-full',
          isCurrentServer ? 'opacity-100' : 'opacity-0'
        )}
      />

      <Link href={`/server/${id}`} className='mx-auto'>
        <AvatarPhoto
          className='size-[52px] hover:opacity-75 transition'
          src={imageUrl}
          alt={name}
        />
      </Link>
    </div>
  );
}
