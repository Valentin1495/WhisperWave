'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AvatarPhoto } from '../avatar-photo';
import { Separator } from '../ui/separator';
import { LogOut, UserRoundCog } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import { logout } from '@/actions/profile.action';

type UserButtonProps = {
  imageUrl: string;
  username: string | null;
};

export default function UserButton({ imageUrl, username }: UserButtonProps) {
  const { signOut } = useClerk();
  const { openDialog } = useDialog();
  let destroySession;

  if (username?.includes('guest')) {
    destroySession = async () => {
      await logout();
    };
  } else {
    destroySession = () => {
      signOut({ redirectUrl: '/' });
    };
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {imageUrl.includes('#') ? (
          <section
            className='size-[52px] rounded-full'
            style={{
              backgroundColor: imageUrl,
            }}
          ></section>
        ) : (
          <AvatarPhoto
            src={imageUrl}
            alt={username ?? 'Profile picture'}
            className='size-[52px]'
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' align='end'>
        <h1 className='text-sm font-medium p-2'>{username}</h1>

        <Separator className='my-1' />

        <DropdownMenuItem
          onClick={() => {
            openDialog('editProfile', {
              userInfo: {
                username: username ?? '',
                profilePic: imageUrl,
              },
            });
          }}
        >
          <UserRoundCog className='mr-3' size={18} />
          <span className='text-sm'>Edit profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={destroySession}>
          <LogOut className='mr-3' size={18} />
          <span className='text-sm'>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
