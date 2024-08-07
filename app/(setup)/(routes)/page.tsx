import { createProfile } from '@/actions/profile.action';
import { redirectToServer } from '@/actions/server.action';
import CreateServerForm from '@/components/create-server-form';
import { notFound } from 'next/navigation';

export default async function Setup() {
  const profile = await createProfile();

  if (!profile) {
    notFound();
  }

  await redirectToServer(profile.id);

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <CreateServerForm />
    </main>
  );
}
