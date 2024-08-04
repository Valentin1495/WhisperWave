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
import { useDialog } from '@/lib/hooks/use-dialog-store';
import LeaveServerButton from '../buttons/leave-server-button';

export default function LeaveServerDialog() {
  const { open, closeDialog, type, data } = useDialog();

  const leaveServerAction = async () => {
    await leaveServer(data?.server?.id);
    closeDialog();
  };

  return (
    <AlertDialog
      open={open && type === 'leaveServer'}
      onOpenChange={closeDialog}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form action={leaveServerAction} className='space-x-1.5'>
            <AlertDialogCancel className='w-[93px]'>Cancel</AlertDialogCancel>
            <LeaveServerButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
