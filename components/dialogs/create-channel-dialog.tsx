'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import { Label } from '../ui/label';
import { useEffect, useState } from 'react';
import CreateChannelButton from '../buttons/create-channel-button';
import { Hash, Router } from 'lucide-react';
import { useFormState } from 'react-dom';
import { createChannel } from '@/actions/server.action';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const initialState = {
  message: '',
};

export default function CreateChannelDialog() {
  const { closeDialog, data, open, type } = useDialog();
  const [channelName, setChannelName] = useState('');
  const [state, createChannelAction] = useFormState(
    createChannel,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.message.includes('Success')) {
      closeDialog();
      router.push(state.message.split(':')[1]);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, closeDialog, router]);

  return (
    <Dialog open={open && type === 'createChannel'} onOpenChange={closeDialog}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
        <form action={createChannelAction}>
          <Label htmlFor='channelName' className='text-xs font-semibold'>
            CHANNEL NAME
          </Label>
          <section className='flex items-center bg-primary/10 dark:bg-primary/20 px-2 gap-1.5 rounded-sm mt-1.5 mb-3'>
            <Hash size={20} />
            <Input
              id='channelName'
              name='channelName'
              className='border-none my-2.5 bg-transparent w-full outline-0'
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <Input
              name='serverId'
              value={data?.server?.id}
              className='hidden'
              type='hidden'
              readOnly
            />
          </section>

          <CreateChannelButton channelName={channelName} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
