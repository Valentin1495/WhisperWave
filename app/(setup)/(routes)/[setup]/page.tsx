import { createProfile, createRandomProfile } from '@/actions/profile.action';
import { redirectToServer } from '@/actions/server.action';
import CreateServerForm from '@/components/create-server-form';
import { auth } from '@clerk/nextjs/server';

export default async function Setup() {
  const { userId } = auth();
  let profile;

  if (userId) {
    profile = await createProfile();
  } else {
    profile = await createRandomProfile();
  }

  if (!profile) {
    throw new Error('Profile not found');
  }

  await redirectToServer(profile.id);

  return (
    <main className='center'>
      <CreateServerForm />
    </main>
  );
}
