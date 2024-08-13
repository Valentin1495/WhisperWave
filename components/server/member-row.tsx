'use client';

import { Member, Profile } from '@prisma/client';
import { AvatarPhoto } from '../avatar-photo';
import {
  // MessageCirclePlus,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import RoleDropdownMenu from './role-dropdown-menu';
import { useChangeRole } from '@/lib/hooks/use-change-role';
import OpenKickMemberDialog from './open-kick-member-dialog';
import { ServerWithMembers } from '@/types';
// import Link from 'next/link';

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
}: // currentProfileId,
MemberWithProfile) {
  const { username, imageUrl } = profile;
  const { optimisticRole, changeOptimisticRole } = useChangeRole(role);
  const serverId = server.id;

  // const isCurrentMember = id === currentProfileId;

  return (
    <div className='flex p-3 justify-between items-center'>
      <div className='flex items-center gap-2'>
        {imageUrl.includes('#') ? (
          <section
            className='size-10 rounded-full'
            style={{
              backgroundColor: imageUrl,
            }}
          ></section>
        ) : (
          <AvatarPhoto src={imageUrl} alt={username} className='size-10' />
        )}

        <p className='text-sm font-medium flex items-center gap-1'>
          {username}
          {roleIcons[optimisticRole]}
        </p>
      </div>
      {/* {!isCurrentMember && (
        <Link
          href={`/server/${serverId}/conversation/${memberId}`}
          className='ml-auto bg-zinc-100 hover:bg-zinc-200 transition p-1 rounded-sm text-sm dark:bg-zinc-700 dark:hover:bg-zinc-800 w-10'
          prefetch={false}
        >
          <MessageCirclePlus size={16} className='mx-auto' />
          Chat
        </Link>
      )} */}
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
