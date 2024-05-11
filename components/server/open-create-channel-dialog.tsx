'use client';

import { PlusCircle } from 'lucide-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { ServerWithMembers } from '@/types';
import { useDialog } from '@/hooks/use-dialog-store';

type OpenCreateChannelDialogProps = { server: ServerWithMembers };

export default function OpenCreateChannelDialog({
  server,
}: OpenCreateChannelDialogProps) {
  const { openDialog } = useDialog();
  return (
    <DropdownMenuItem
      onClick={() =>
        openDialog('createChannel', {
          server,
        })
      }
      className='cursor-pointer focus:bg-primary hover:bg-primary group'
    >
      <span className='font-medium group-hover:text-primary-foreground'>
        Create Channel
      </span>
      <PlusCircle
        size={16}
        className='ml-auto  group-hover:text-primary-foreground'
        strokeWidth={2.25}
      />
    </DropdownMenuItem>
  );
}
