'use client';

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
import { Button } from '../ui/button';
import { FormEvent } from 'react';
import { toast } from 'sonner';
import { useMessages } from '@/lib/hooks/use-messages';
import { socket } from '@/socket';

export default function DeleteMessageDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const channelId = data?.channel?.id as string;
  const messageId = data?.messageId as string;
  const { deleteMessageMutation } = useMessages(channelId);
  const deleteMessage = async (e: FormEvent) => {
    e.preventDefault();

    deleteMessageMutation.mutate(messageId, {
      onSuccess: (updatedMessage) => {
        socket.emit(`chat:${channelId}`, updatedMessage);
        closeDialog();
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          'An error occurred while deleting the message. Please try again.'
        );
      },
    });
  };

  return (
    <AlertDialog
      open={open && type === 'deleteMessage'}
      onOpenChange={closeDialog}
    >
      <AlertDialogContent>
        <form onSubmit={deleteMessage} className='space-y-3'>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant='destructive' className='w-full md:w-[93px]'>
              Delete
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
