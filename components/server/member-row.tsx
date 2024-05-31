'use client';

import { Member, Profile } from '@prisma/client';
import { AvatarPhoto } from '../avatar-photo';
import { MessageCirclePlus, ShieldAlert, ShieldCheck } from 'lucide-react';
import RoleDropdownMenu from './role-dropdown-menu';
import { useChangeRole } from '@/lib/hooks/use-change-role';
import OpenKickMemberDialog from './open-kick-member-dialog';
import { ServerWithMembers } from '@/types';
import Link from 'next/link';

type MemberWithProfile = Member & {
  profile: Profile;
  isGuest: boolean;
  server: ServerWithMembers;
  currentProfileId: string;
};

const roleIcons = {
  GUEST: null,
  ADMIN: <ShieldAlert className='text-destructive' size={16} />,
  MODERATOR: <ShieldCheck className='text-lime-600' size={16} />,
};

export default function MemberRow({
  profile,
  role,
  id: memberId,
  isGuest,
  server,
  currentProfileId,
}: MemberWithProfile) {
  const { name, email, imageUrl, id } = profile;
  const { optimisticRole, changeOptimisticRole } = useChangeRole(role);
  const serverId = server.id;

  const isCurrentMember = id === currentProfileId;

  return (
    <div className='flex p-3 justify-between items-center'>
      <div className='flex items-center gap-2'>
        <AvatarPhoto src={imageUrl} alt={name} className='size-10' />
        <section>
          <p className='text-sm font-medium flex items-center gap-1'>
            {name}
            {roleIcons[optimisticRole]}
          </p>
          <p className='text-sm'>{email}</p>
        </section>
      </div>
      {!isCurrentMember && (
        <Link
          href={`/server/${serverId}/conversation/${memberId}`}
          className='ml-auto'
        >
          <MessageCirclePlus
            size={30}
            className='text-primary hover:scale-110 transition'
          />
        </Link>
      )}
      {!isGuest && (
        <div className='ml-1.5'>
          {role !== 'ADMIN' && (
            <div className='space-x-1.5'>
              <RoleDropdownMenu
                serverId={serverId}
                memberId={memberId}
                role={optimisticRole}
                changeOptimisticRole={changeOptimisticRole}
              />
              <OpenKickMemberDialog server={server} memberId={memberId} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
