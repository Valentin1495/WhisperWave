'use client';

import { useDialog } from '@/lib/hooks/use-dialog-store';
import { cn } from '@/lib/utils';
import { ChannelWithRole } from '@/types';
import { Hash, Settings, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Channel({
  id,
  name,
  serverId,
  role,
  server,
}: ChannelWithRole) {
  const params = useParams();
  const isActive = params.channelId === id;
  const isGuest = role === 'GUEST';
  const { openDialog } = useDialog();

  return (
    <Link
      href={`/${params.username}/server/${serverId}/channel/${id}`}
      prefetch={false}
      className={cn(
        'flex items-center gap-2 mx-2 p-1 rounded-sm hover:bg-blue-100 dark:hover:bg-blue-800 transition',
        isActive &&
          'font-semibold bg-blue-200 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-900'
      )}
    >
      <Hash size={20} />
      <h5>{name}</h5>
      {isActive && !isGuest && (
        <section className='flex items-center gap-1 ml-auto'>
          <button
            onClick={() =>
              openDialog('deleteChannel', {
                server,
                channel: {
                  id,
                  name,
                },
              })
            }
          >
            <Trash2 size={16} className='hover:scale-125 transition' />
          </button>
          <button
            onClick={() =>
              openDialog('editChannel', {
                server,
                channel: {
                  id,
                  name,
                },
              })
            }
          >
            <Settings size={16} className='hover:scale-125 transition' />
          </button>
        </section>
      )}
    </Link>
  );
}
