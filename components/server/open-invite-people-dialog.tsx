'use client';

import { UserPlus } from 'lucide-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { DialogData, useDialog } from '@/lib/hooks/use-dialog-store';

export default function OpenInvitePeopleDialog({ server }: DialogData) {
  const { openDialog } = useDialog();

  return (
    <DropdownMenuItem
      onClick={() => {
        openDialog('invitePeople', {
          server,
        });
      }}
      className='cursor-pointer focus:bg-primary hover:bg-primary group'
    >
      <span className='text-primary font-medium group-hover:text-primary-foreground'>
        Invite People
      </span>
      <UserPlus
        size={16}
        className='ml-auto text-primary group-hover:text-primary-foreground'
        strokeWidth={2.25}
      />
    </DropdownMenuItem>
  );
}
