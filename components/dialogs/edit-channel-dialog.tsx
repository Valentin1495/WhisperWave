'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { editChannel } from '@/actions/server.action';
import { useFormState } from 'react-dom';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import EditChannelButton from '../buttons/edit-channel-button';

const initialState = {
  message: '',
};

export default function EditChannelDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const [channelName, setChannelName] = useState<string>();
  const [state, editChannelAction] = useFormState(editChannel, initialState);
  let prevChannelName = data?.channel?.name;
  const isSameChannel = channelName === prevChannelName;

  useEffect(() => {
    setChannelName(prevChannelName);
  }, [data, prevChannelName]);

  useEffect(() => {
    if (state.message === 'Success') {
      closeDialog();
    }
  }, [state, closeDialog]);

  return (
    <Dialog open={open && type === 'editChannel'} onOpenChange={closeDialog}>
      <DialogContent className='px-3 pb-3 pt-6'>
        <DialogHeader>
          <DialogTitle className='font-bold text-xl text-center'>
            Channel Overview
          </DialogTitle>
        </DialogHeader>

        <form action={editChannelAction}>
          <Label htmlFor='channelName' className='text-sm font-semibold'>
            CHANNEL NAME
          </Label>
          <Input
            id='channelName'
            name='channelName'
            className='border-none my-2.5 bg-primary/10 dark:bg-primary/20'
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <Input
            type='hidden'
            className='hidden'
            value={data?.server?.id}
            readOnly
            name='serverId'
          />
          <Input
            type='hidden'
            className='hidden'
            value={data?.channel?.id}
            readOnly
            name='channelId'
          />
          <EditChannelButton
            channelName={channelName || ''}
            isSameChannel={isSameChannel}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
