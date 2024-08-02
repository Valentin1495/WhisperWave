'use client';

import { deleteServer } from '@/actions/server.action';
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
import { useParams } from 'next/navigation';

export default function DeleteServerDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const params = useParams();
  const username = params.username as string;
  const deleteServerAction = async () => {
    await deleteServer(username, data?.server?.id);
    closeDialog();
  };

  return (
    <AlertDialog
      open={open && type === 'deleteServer'}
      onOpenChange={closeDialog}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            server{' '}
            <span className='text-primary font-semibold'>
              {data?.server?.name}
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form action={deleteServerAction} className='ml-auto space-x-1.5'>
          <AlertDialogCancel className='w-[93px]'>Cancel</AlertDialogCancel>
          <DeleteButton />
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
