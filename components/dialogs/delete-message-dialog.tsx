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
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function DeleteMessageDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const [isLoading, setIsLoading] = useState(false);

  const deleteMessage = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await fetch('/api/delete-message', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageId: data?.messageId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      closeDialog();
    } catch (error) {
      console.error(error);
      toast('An error occurred while deleting the message. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <Button
              variant='destructive'
              className='w-[93px]'
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='pending'>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              ) : (
                'Delete'
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
