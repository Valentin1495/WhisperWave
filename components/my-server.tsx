'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
          'h-11 bg-blue-600 dark:bg-blue-300 w-1 rounded-full',
          isCurrentServer ? 'opacity-100' : 'opacity-0'
        )}
      />

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger className='mx-auto'>
            <Link href={`/server/${id}`}>
              <AvatarPhoto
                className='size-11 hover:opacity-75 transition'
                src={imageUrl}
                alt={name}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent className='max-w-40' side='right' sideOffset={14}>
            <p className='font-semibold'>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
