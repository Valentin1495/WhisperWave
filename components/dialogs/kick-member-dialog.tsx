'use client';

import { kickMember } from '@/actions/server.action';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import KickMemberButton from '../buttons/kick-member-button';
import { useParams } from 'next/navigation';

export default function KickMemberDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const serverId = data?.server?.id;
  const memberId = data?.memberId;
  const params = useParams();

  const kickMemberAction = async () => {
    await kickMember(params.username as string, serverId, memberId);
    closeDialog();
  };

  return (
    <AlertDialog
      open={open && type === 'kickMember'}
      onOpenChange={closeDialog}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently kick this member
            out of the server.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <form action={kickMemberAction} className='space-x-1.5'>
            <AlertDialogCancel className='w-[93px]'>Cancel</AlertDialogCancel>
            <KickMemberButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
