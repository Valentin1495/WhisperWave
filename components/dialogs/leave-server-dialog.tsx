'use client';

import { leaveServer } from '@/actions/server.action';
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
import LeaveServerButton from '../buttons/leave-server-button';

export default function LeaveServerDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const leaveServerAction = async () => {
    await leaveServer(data?.server.id);
    closeDialog();
  };

  return (
    <AlertDialog
      open={open && type === 'leaveServer'}
      onOpenChange={closeDialog}
    >
      <AlertDialogContent>
        <form action={leaveServerAction}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <LeaveServerButton />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
