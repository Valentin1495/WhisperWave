import { createProfile } from '@/actions/profile.action';
import { redirectToServer } from '@/actions/server.action';
import AddServerForm from '@/components/add-server-form';

export default async function Setup() {
  await createProfile();
  await redirectToServer();

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <AddServerForm />
    </main>
  );
}
