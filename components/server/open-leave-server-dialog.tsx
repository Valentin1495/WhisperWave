'use client';

import { LogOut } from 'lucide-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import { ServerWithMembers } from '@/types';

type OpenLeaveServerDialogProps = { server: ServerWithMembers };

export default function OpenLeaveServerDialog({
  server,
}: OpenLeaveServerDialogProps) {
  const { openDialog } = useDialog();

  return (
    <DropdownMenuItem
      onClick={() =>
        openDialog('leaveServer', {
          server,
        })
      }
      className='cursor-pointer focus:bg-destructive hover:bg-destructive group'
    >
      <span className='text-destructive font-medium group-hover:text-destructive-foreground'>
        Leave Server
      </span>
      <LogOut
        size={16}
        className='ml-auto text-destructive group-hover:text-destructive-foreground'
        strokeWidth={2.25}
      />
    </DropdownMenuItem>
  );
}
