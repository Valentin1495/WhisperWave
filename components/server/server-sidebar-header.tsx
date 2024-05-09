import { ServerWithMembers } from '@/types';
import { MemberRole } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, PlusCircle } from 'lucide-react';
import OpenInvitePeopleDialog from './open-invite-people-dialog';
import OpenEditServerDialog from './open-edit-server-dialog';

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
          {isMod && (
            <DropdownMenuItem className='cursor-pointer focus:bg-primary hover:bg-primary group'>
              <span className='font-medium group-hover:text-primary-foreground'>
                Create Channel
              </span>
              <PlusCircle
                size={16}
                className='ml-auto  group-hover:text-primary-foreground'
                strokeWidth={2.25}
              />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer focus:bg-destructive hover:bg-destructive group'>
                <span className='text-destructive font-medium group-hover:text-destructive-foreground'>
                  Leave Server
                </span>
                <LogOut
                  size={16}
                  className='ml-auto text-destructive group-hover:text-destructive-foreground'
                  strokeWidth={2.25}
                />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
