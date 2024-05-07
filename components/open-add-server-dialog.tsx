'use client';

import { useDialog } from '@/hooks/use-dialog-store';
import { Plus } from 'lucide-react';

export default function OpenAddServerDialog() {
  const { openDialog } = useDialog();

  return (
    <button
      className='bg-background size-11 rounded-full flex items-center justify-center group hover:bg-primary hover:rounded-xl transition'
      onClick={() => openDialog('addServer', null)}
    >
      <Plus className='text-primary group-hover:text-secondary transition-colors' />
    </button>
  );
}
