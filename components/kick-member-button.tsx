'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function KickMemberButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant='destructive' disabled={pending} className='w-[93px]'>
      {pending ? (
        <span className='pending'>
          <span></span>
          <span></span>
          <span></span>
        </span>
      ) : (
        'Continue'
      )}
    </Button>
  );
}
