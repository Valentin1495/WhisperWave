'use client';

import { changeRole } from '@/actions/server.action';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MemberRole } from '@prisma/client';
import { Check, ShieldQuestion } from 'lucide-react';

type RoleDropdownMenuProps = {
  serverId: string;
  memberId: string;
  role: MemberRole;
  changeOptimisticRole: (action: MemberRole) => void;
};

export default function RoleDropdownMenu({
  serverId,
  memberId,
  role,
  changeOptimisticRole,
}: RoleDropdownMenuProps) {
  const handleClick = async (
    serverId: string,
    memberId: string,
    newRole: MemberRole
  ) => {
    changeOptimisticRole(newRole);
    await changeRole(serverId, memberId, newRole);
  };

  const isGuest = role === 'GUEST';
  const isMod = role === 'MODERATOR';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='bg-zinc-100 hover:bg-zinc-200 transition p-1 rounded-sm text-sm dark:bg-zinc-700 dark:hover:bg-zinc-800 w-10'>
        <ShieldQuestion size={16} className='mx-auto' />
        Role
      </DropdownMenuTrigger>
      <DropdownMenuContent side='left'>
        <DropdownMenuItem
          onClick={() => handleClick(serverId, memberId, 'GUEST')}
        >
          {isGuest && <Check size={16} className='mr-1' />}
          Guest
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleClick(serverId, memberId, 'MODERATOR')}
        >
          {isMod && <Check size={16} className='mr-1' />}
          Moderator
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
