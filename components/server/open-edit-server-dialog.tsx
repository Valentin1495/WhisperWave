'use client';

import { Settings } from 'lucide-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { DialogData, useDialog } from '@/hooks/use-dialog-store';

export default function OpenEditServerDialog({ server }: DialogData) {
  const { openDialog } = useDialog();

  return (
    <DropdownMenuItem
      onClick={() =>
        openDialog('editServer', {
          server,
        })
      }
      className='cursor-pointer focus:bg-primary hover:bg-primary group'
    >
      <span className='font-medium group-hover:text-primary-foreground'>
        Server Settings
      </span>
      <Settings
        size={16}
        className='ml-auto  group-hover:text-primary-foreground'
        strokeWidth={2.25}
      />
    </DropdownMenuItem>
  );
}
