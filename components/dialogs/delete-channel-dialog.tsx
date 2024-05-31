'use client';

import { deleteChannel } from '@/actions/server.action';
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
import DeleteServerButton from '../buttons/delete-server-button';

export default function DeleteChannelDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const deleteChannelAction = async () => {
    await deleteChannel(data?.server?.id, data?.channel?.id);
    closeDialog();
  };

  return (
    <AlertDialog
      open={open && type === 'deleteChannel'}
      onOpenChange={closeDialog}
    >
      <AlertDialogContent>
        <form action={deleteChannelAction} className='space-y-3'>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              channel{' '}
              <span className='text-primary font-semibold'>
                #{data?.channel?.name}
              </span>
              .
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
