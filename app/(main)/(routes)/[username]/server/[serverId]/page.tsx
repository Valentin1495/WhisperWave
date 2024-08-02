import { findServer } from '@/actions/server.action';
import SetUsernameInLocalStorage from '@/components/set-username-in-local-storage';
import { Frown } from 'lucide-react';
import { redirect } from 'next/navigation';

type ServerProps = {
  params: {
    username: string;
    serverId: string;
  };
};

export default async function Server({ params }: ServerProps) {
  const server = await findServer(params.serverId);
  const channels = server?.channels;
  const username = params.username;

  if (channels?.length === 0)
    return (
      <main className='flex flex-col justify-center items-center min-h-screen gap-2'>
        <Frown size={48} />
        <h1 className='font-semibold'>NO CHANNELS</h1>
        <p className='text-center'>
          You find yourself in a strange place. You don&apos;t have access to
          any channels, or there are none in this server.
        </p>

        <SetUsernameInLocalStorage username={username} />
      </main>
    );

  redirect(`/${username}/server/${server?.id}/channel/${channels![0].id}`);
}
