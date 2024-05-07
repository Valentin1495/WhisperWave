'use client';

import { UserPlus } from 'lucide-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { useDialog } from '@/hooks/use-dialog-store';

type OpenInvitePeopleDialogProps = {
  serverName: string;
};

export default function OpenInvitePeopleDialog({
  serverName,
}: OpenInvitePeopleDialogProps) {
  const { openDialog } = useDialog();
  const handleClick = () => {
    openDialog('invitePeople', serverName);
  };
  return (
    <DropdownMenuItem
      onClick={handleClick}
      className='cursor-pointer focus:bg-primary hover:bg-primary group'
    >
      <span className='text-primary font-medium group-hover:text-primary-foreground transition'>
        Invite People
      </span>
      <UserPlus
        size={16}
        className='ml-auto text-primary group-hover:text-primary-foreground transition'
        strokeWidth={2.25}
      />
    </DropdownMenuItem>
  );
}
