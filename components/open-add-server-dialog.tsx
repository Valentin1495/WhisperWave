'use client';

import { useDialog } from '@/lib/hooks/use-dialog-store';
import { Plus } from 'lucide-react';

export default function OpenAddServerDialog() {
  const { openDialog } = useDialog();

  return (
    <button
      className='bg-background size-[52px] rounded-full flex items-center justify-center group hover:bg-primary hover:rounded-xl transition'
      onClick={() => openDialog('addServer')}
    >
      <Plus className='text-primary group-hover:text-secondary transition-colors' />
    </button>
  );
}
