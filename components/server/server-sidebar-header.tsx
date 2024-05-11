import { ServerWithMembers } from '@/types';
import { MemberRole } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import OpenInvitePeopleDialog from './open-invite-people-dialog';
import OpenEditServerDialog from './open-edit-server-dialog';
import OpenCreateChannelDialog from './open-create-channel-dialog';
import OpenLeaveServerDialog from './open-leave-server-dialog';
import OpenDeleteServerDialog from './open-delete-server-dialog';

type ServerSidebarHeaderProps = {
  server: ServerWithMembers;
  role?: MemberRole;
};

export default function ServerSidebarHeader({
  server,
  role,
}: ServerSidebarHeaderProps) {
  const isAdmin = role === MemberRole.ADMIN;
  const isMod = isAdmin || role === MemberRole.MODERATOR;
  const { name } = server;

  return (
    <header className='hover:bg-blue-200 dark:hover:bg-blue-900 transition'>
      <DropdownMenu>
        <DropdownMenuTrigger className='p-3 flex items-center w-full justify-between'>
          <h1 className='font-semibold text-sm truncate'>{name}</h1>
          <ChevronDown size={18} className='min-w-fit' />
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-56'>
          <OpenInvitePeopleDialog server={server} />

          {isAdmin && <OpenEditServerDialog server={server} />}
          {isMod && <OpenCreateChannelDialog server={server} />}
          {!isAdmin && (
            <>
              <DropdownMenuSeparator />
              <OpenLeaveServerDialog server={server} />
            </>
          )}
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <OpenDeleteServerDialog server={server} />
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
