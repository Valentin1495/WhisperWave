import { createProfile } from '@/actions/profile.action';
import { redirectToServer } from '@/actions/server.action';
import AddServerForm from '@/components/add-server-form';
import { notFound } from 'next/navigation';

export default async function Setup() {
  const profile = await createProfile();

  if (!profile) {
    notFound();
  }

  await redirectToServer(profile.id);

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <AddServerForm />
    </main>
  );
}
