'use client';

import { Trash2 } from 'lucide-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { useDialog } from '@/hooks/use-dialog-store';
import { ServerWithMembers } from '@/types';

type OpenDeleteServerDialogProps = { server: ServerWithMembers };

export default function OpenDeleteServerDialog({
  server,
}: OpenDeleteServerDialogProps) {
  const { openDialog } = useDialog();

  return (
    <DropdownMenuItem
      onClick={() =>
        openDialog('deleteServer', {
          server,
        })
      }
      className='cursor-pointer focus:bg-destructive hover:bg-destructive group'
    >
      <span className='text-destructive font-medium group-hover:text-destructive-foreground'>
        Delete Server
      </span>
      <Trash2
        size={16}
        className='ml-auto text-destructive group-hover:text-destructive-foreground'
        strokeWidth={2.25}
      />
    </DropdownMenuItem>
  );
}
