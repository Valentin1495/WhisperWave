'use client';

import { deleteChannel } from '@/actions/server.action';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import DeleteButton from '../buttons/delete-button';

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

        <form action={deleteChannelAction} className='ml-auto space-x-1.5'>
          <AlertDialogCancel className='w-[93px]'>Cancel</AlertDialogCancel>
          <DeleteButton />
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
