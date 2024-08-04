import { findMember } from '@/actions/member.action';
import { getCurrentProfile } from '@/actions/profile.action';
import { findServer } from '@/actions/server.action';
import { Frown } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';

type ServerProps = {
  params: {
    serverId: string;
  };
};

export default async function Server({ params }: ServerProps) {
  const server = await findServer(params.serverId);

  if (!server) {
    notFound();
  }

  const channels = server.channels;
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    throw new Error('Profile not found');
  }

  const currentMember = await findMember(server.id, currentProfile.id);

  if (!currentMember) {
    notFound();
  }

  if (channels.length === 0)
    return (
      <main className='flex flex-col justify-center items-center min-h-screen gap-2 p-3'>
        <Frown size={48} />
        <h1 className='font-semibold'>NO CHANNELS</h1>
        <p className='text-center'>
          You find yourself in a strange place. You don&apos;t have access to
          any channels, or there are none in this server.
        </p>
      </main>
    );

  redirect(`/server/${server.id}/channel/${channels[0].id}`);
}
