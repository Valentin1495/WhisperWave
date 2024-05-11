'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

type CreateChannelProps = {
  channelName: string;
};

export default function CreateChannelButton({
  channelName,
}: CreateChannelProps) {
  const { pending } = useFormStatus();

  return (
    <div className='text-end'>
      <Button
        disabled={!channelName.trim() || pending}
        className='dark:text-secondary-foreground w-40'
      >
        {pending ? (
          <span className='pending'>
            <span></span>
            <span></span>
            <span></span>
          </span>
        ) : (
          '  Create Channel'
        )}
      </Button>
    </div>
  );
}
