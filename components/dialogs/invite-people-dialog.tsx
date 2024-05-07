'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDialog } from '@/hooks/use-dialog-store';
import { useParams } from 'next/navigation';
import { Button } from '../ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function InvitePeopleDialog() {
  const { open, closeDialog, type, serverName } = useDialog();
  const { serverId } = useParams();
  const origin = window.location.origin;
  const serverLink = `${origin}/server/${serverId}`;
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(serverLink);
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
            Invite friends to <span className='font-bold'>{serverName}</span>
          </DialogTitle>
          <DialogDescription className='text-xs'>
            SEND A SERVER INVITE LINK TO A FRIEND
          </DialogDescription>
        </DialogHeader>
        <p className='text-sm bg-zinc-100 dark:bg-secondary text-zinc-500 dark:text-secondary-foreground px-1 rounded-lg flex items-center'>
          <span className='px-2 py-1'>{serverLink}</span>
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
