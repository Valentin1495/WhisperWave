'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { signIn } from '@/actions/profile.action';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { Separator } from './ui/separator';

const initialState = {
  message: '',
};

export default function SignInForm() {
  const [state, signInAction] = useFormState(signIn, initialState);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (state.message === 'Success') {
      router.push(`/${username}`);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, username, router]);

  return (
    <div className='w-2/3 md:w-1/2 xl:w-1/4 bg-secondary p-5 rounded-lg'>
      <h1 className='text-center font-bold text-lg'>Sign in to WhisperWave</h1>
      <p className='text-sm text-center mb-5'>
        Welcome back! Please sign in to continue
      </p>

      <form action={signInAction} className='space-y-5'>
        <section className='space-y-2'>
          <Label htmlFor='username' className='font-semibold'>
            Username
          </Label>
          <Input
            id='username'
            name='username'
            placeholder='Your unique username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </section>

        <section className='text-right'>
          <SubmitButton username={username.trim()} />
        </section>
      </form>

      <Separator className='bg-secondary-foreground mt-5 mb-3' />

      <p className='text-sm text-center'>
        Don&apos;t have an account?{' '}
        <Link href='/' className='font-semibold hover:underline'>
          Sign up
        </Link>
      </p>
    </div>
  );
}

type SubmitButtonProps = {
  username: string;
};

function SubmitButton({ username }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      className='w-full font-semibold'
      disabled={pending || !username}
    >
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
