import { getSession, login } from '@/actions/profile.action';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getSession();
  const { userId } = auth();

  if (session || userId) {
    redirect('/setup');
  }

  return (
    <main className='center flex-col gap-3'>
      <div className='flex items-center gap-3 mb-10'>
        <Image src='/logo.svg' alt='logo' width={60} height={60} />
        <h1 className='text-primary font-bold text-2xl'>WhisperWave</h1>
      </div>
      <SignInButton
        mode='modal'
        forceRedirectUrl='/setup'
        signUpForceRedirectUrl='/setup'
      >
        <Button size='lg' className='w-[132px]'>
          Log in
        </Button>
      </SignInButton>
      or
      <form
        action={async () => {
          'use server';
          await login();
          revalidatePath('/');
        }}
      >
        <Button variant='secondary' size='lg' className='w-[132px]'>
          Skip Login
        </Button>
      </form>
    </main>
  );
}
