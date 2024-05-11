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
import { useDialog } from '@/hooks/use-dialog-store';
import KickMemberButton from '../buttons/kick-member-button';

export default function KickMemberDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const serverId = data?.server.id;
  const memberId = data?.memberId;
  const kickMemberAction = async () => {
    await kickMember(serverId, memberId);
    closeDialog();
  };

  return (
    <AlertDialog
      open={open && type === 'kickMember'}
      onOpenChange={closeDialog}
    >
      <AlertDialogContent>
        <form action={kickMemberAction}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently kick this
              member out of the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <KickMemberButton />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
