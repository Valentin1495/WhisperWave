import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { FileType } from '@/types';

type EditServerButtonProps = {
  username: string;
  isSameProfile: boolean;
  file: FileType | null;
};

export default function EditProfileButton({
  username,
  isSameProfile,
  file,
}: EditServerButtonProps) {
  const { pending } = useFormStatus();

  return (
    <div className='text-end'>
      <Button
        disabled={!username.trim() || isSameProfile || !file || pending}
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
