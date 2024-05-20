import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

type EditChannelButtonProps = {
  channelName: string;
  isSameChannel: boolean;
};

export default function EditChannelButton({
  channelName,
  isSameChannel,
}: EditChannelButtonProps) {
  const { pending } = useFormStatus();

  return (
    <div className='text-end'>
      <Button
        disabled={!channelName.trim() || isSameChannel || pending}
        className='dark:text-secondary-foreground w-[76px]'
      >
        {pending ? (
          <span className='pending'>
            <span></span>
            <span></span>
            <span></span>
          </span>
        ) : (
          'Save'
        )}
      </Button>
    </div>
  );
}
