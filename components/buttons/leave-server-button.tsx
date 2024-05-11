'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

export default function LeaveServerButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant='destructive' disabled={pending} className='w-28'>
      {pending ? (
        <span className='pending'>
          <span></span>
          <span></span>
          <span></span>
        </span>
      ) : (
        'Leave Server'
      )}
    </Button>
  );
}
