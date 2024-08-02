'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { createProfile } from '@/actions/profile.action';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ImagePlus } from 'lucide-react';
import { AvatarPhoto } from './avatar-photo';
import { useImagePreview } from '@/lib/hooks/use-image-preview';
import { Separator } from './ui/separator';
import Link from 'next/link';

const initialState = {
  message: '',
};

export default function OnboardingForm() {
  const [state, onboardUser] = useFormState(createProfile, initialState);
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useImagePreview(file, setPreview);

  useEffect(() => {
    if (state.message === 'Success') {
      router.push(`/${username}`);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, username, router]);

  return (
    <div className='w-2/3 md:w-1/2 xl:w-1/4 bg-secondary p-5 rounded-lg'>
      <h1 className='text-center font-bold text-lg'>Create your profile</h1>
      <p className='text-sm text-center mb-5'>
        Welcome! Please fill in the details to get started.
      </p>

      <form action={onboardUser} className='space-y-5'>
        <section className='flex flex-col items-center gap-2.5'>
          <Input
            name='profilePic'
            type='file'
            className='hidden'
            ref={fileRef}
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file && file.type.slice(0, 5) === 'image') {
                setFile(file);
              }
            }}
          />

          <div
            className={cn(
              'rounded-full size-[88px] flex items-center justify-center cursor-pointer mx-auto mb-3',
              !preview && 'border-2 border-foreground border-dashed'
            )}
            onClick={() => fileRef.current?.click()}
          >
            {preview ? (
              <AvatarPhoto
                src={preview}
                alt={file ? file.name : 'server icon'}
                className='size-full'
              />
            ) : (
              <section className='text-sm font-bold'>
                <ImagePlus
                  strokeWidth={2.25}
                  className='mx-auto text-foreground'
                />
                UPLOAD
              </section>
            )}
          </div>
        </section>

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
          <SubmitButton file={file} username={username.trim()} />
        </section>
      </form>

      <Separator className='bg-secondary-foreground mt-5 mb-3' />

      <p className='text-sm text-center'>
        Already have a profile?{' '}
        <Link href='/sign-in' className='font-semibold hover:underline'>
          Sign in
        </Link>
      </p>
    </div>
  );
}

type SubmitButtonProps = {
  file: File | null;
  username: string;
};

function SubmitButton({ file, username }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      className='w-full font-semibold'
      disabled={pending || !username || !file}
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
