'use client';

import { cn } from '@/lib/utils';
import { UsersRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MembersLinkProps = {
  serverId: string;
};

export default function MembersLink({ serverId }: MembersLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.includes('members');

  return (
    <section className='p-3 space-y-3'>
      <Link
        href={`/server/${serverId}/members`}
        prefetch={false}
        className={cn(
          'flex gap-x-2 text-sm p-1.5 rounded-sm hover:bg-blue-100 dark:hover:bg-blue-800 transition',
          isActive &&
            'font-semibold bg-blue-200 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-900'
        )}
      >
        <UsersRound size={18} />
        Members
      </Link>
      <section className='w-full bg-blue-100 dark:bg-secondary h-[2px]' />
    </section>
  );
}
