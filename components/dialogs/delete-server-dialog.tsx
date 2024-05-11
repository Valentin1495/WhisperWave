'use client';

import { deleteServer } from '@/actions/server.action';
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
import DeleteServerButton from '../buttons/delete-server-button';

export default function DeleteServerDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const deleteServerAction = async () => {
    await deleteServer(data?.server.id);
    closeDialog();
  };

  return (
    <AlertDialog
      open={open && type === 'deleteServer'}
      onOpenChange={closeDialog}
    >
      <AlertDialogContent>
        <form action={deleteServerAction} className='space-y-3'>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <DeleteServerButton />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
