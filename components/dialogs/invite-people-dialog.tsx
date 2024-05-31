'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import { Button } from '../ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function InvitePeopleDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const origin = window.location.origin;
  const inviteLink = `${origin}/invite/${data?.server?.inviteCode}`;
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={open && type === 'invitePeople'} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-base'>
            Invite friends to{' '}
            <span className='font-bold'>{data?.server?.name}</span>
          </DialogTitle>
          <DialogDescription className='text-xs'>
            SEND A SERVER INVITE LINK TO A FRIEND
          </DialogDescription>
        </DialogHeader>
        <p className='text-sm bg-zinc-100 dark:bg-secondary text-zinc-500 dark:text-secondary-foreground px-1 rounded-lg flex items-center'>
          <span className='px-2 py-1'>{inviteLink}</span>
          <Button
            onClick={copyLink}
            className={cn(
              'w-24 h-8 p-0 dark:text-secondary-foreground',
              copied &&
                'hover:bg-zinc-700 bg-zinc-500 dark:bg-primary/70 dark:hover:bg-primary/50'
            )}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
