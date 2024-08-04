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

type UserButtonProps = {
  imageUrl: string;
  username: string | null;
};

export default function UserButton({ imageUrl, username }: UserButtonProps) {
  const { signOut } = useClerk();
  const { openDialog } = useDialog();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarPhoto
          src={imageUrl}
          alt={username ?? 'Profile picture'}
          className='size-[52px]'
        />
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

        <DropdownMenuItem
          onClick={() => {
            signOut({ redirectUrl: '/' });
          }}
        >
          <LogOut className='mr-3' size={18} />
          <span className='text-sm'>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
