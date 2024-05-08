import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

type EditServerButtonProps = {
  serverName: string;
  isSameServer: boolean;
};

export default function EditServerButton({
  serverName,
  isSameServer,
}: EditServerButtonProps) {
  const { pending } = useFormStatus();

  return (
    <div className='text-end'>
      <Button
        disabled={!serverName.trim() || isSameServer || pending}
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
