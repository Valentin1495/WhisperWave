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

type ChannelHeaderProps = {
  server: ServerWithMembers;
  role?: MemberRole;
};

export default function ChannelHeader({ server, role }: ChannelHeaderProps) {
  const isAdmin = role === MemberRole.ADMIN;
  const isMod = isAdmin || role === MemberRole.MODERATOR;
  const { name } = server;

  return (
    <header className='hover:bg-blue-200 dark:hover:bg-blue-900 truncate'>
      <DropdownMenu>
        <DropdownMenuTrigger className='p-3 flex items-center w-48 justify-between'>
          <span className='font-semibold text-sm'>{name}</span>
          <ChevronDown size={18} />
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-44'>
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
