import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

type SubmitButtonProps = {
  serverName: string;
  file: File | null;
};

export default function SubmitButton({ serverName, file }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <div className='text-end'>
      <Button
        disabled={!serverName.trim() || !file || pending}
        className='dark:text-secondary-foreground w-[76px]'
      >
        {pending ? (
          <span className='pending'>
            <span></span>
            <span></span>
            <span></span>
          </span>
        ) : (
          'Create'
        )}
      </Button>
    </div>
  );
}
