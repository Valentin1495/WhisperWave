'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AvatarPhoto } from '../avatar-photo';
import { Separator } from '../ui/separator';
import { LogOut } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';

type UserButtonProps = {
  imageUrl: string;
  fullName: string | null;
  username: string | null;
};

export default function UserButton({
  imageUrl,
  fullName,
  username,
}: UserButtonProps) {
  const { signOut } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarPhoto
          src={imageUrl}
          alt={fullName ?? 'Profile picture'}
          className='size-[52px]'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' align='end'>
        <section className='p-2'>
          <h1 className='text-sm font-medium'>{fullName}</h1>
          <h2 className='text-sm'>{username}</h2>
        </section>
        <Separator className='my-1' />
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
