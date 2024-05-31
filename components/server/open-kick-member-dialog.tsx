'use client';

import { useDialog } from '@/lib/hooks/use-dialog-store';
import { ServerWithMembers } from '@/types';
import { UserRoundMinus } from 'lucide-react';

type OpenKickMemberDialogProps = {
  server: ServerWithMembers;
  memberId: string;
};

export default function OpenKickMemberDialog({
  server,
  memberId,
}: OpenKickMemberDialogProps) {
  const { openDialog } = useDialog();

  return (
    <button
      className='bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-800 w-10 transition p-1 rounded-sm text-sm'
      onClick={() =>
        openDialog('kickMember', {
          server,
          memberId,
        })
      }
    >
      <UserRoundMinus size={16} className='mx-auto' />
      Kick
    </button>
  );
}
