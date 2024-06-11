import { findServer } from '@/actions/server.action';
import { Frown } from 'lucide-react';
import { redirect } from 'next/navigation';

type ServerProps = {
  params: {
    serverId: string;
  };
};

export default async function Server({ params }: ServerProps) {
  const server = await findServer(params.serverId);
  const channels = server?.channels;

  if (channels?.length === 0)
    return (
      <main className='flex flex-col justify-center items-center min-h-screen gap-2'>
        <Frown size={48} />
        <h1 className='font-semibold'>NO CHANNELS</h1>
        <p className='text-center'>
          You find yourself in a strange place. You don&apos;t have access to
          any channels, or there are none in this server.
        </p>
      </main>
    );

  redirect(`/server/${server?.id}/channel/${channels![0].id}`);
}
