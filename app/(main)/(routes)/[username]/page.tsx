import { findProfile } from '@/actions/profile.action';
import { redirectToServer } from '@/actions/server.action';
import AddServerForm from '@/components/add-server-form';
import { notFound } from 'next/navigation';

type SetupProps = {
  params: {
    username: string;
  };
};

export default async function Setup({ params }: SetupProps) {
  const username = params.username;
  const profile = await findProfile(username);

  if (!profile) {
    notFound();
  }

  await redirectToServer(username, profile.id);

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <AddServerForm />
    </main>
  );
}
