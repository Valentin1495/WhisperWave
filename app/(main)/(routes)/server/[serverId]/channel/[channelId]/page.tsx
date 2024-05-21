import ServerHeader from '@/components/server/server-header';
import db from '@/lib/db';
import { Channel } from '@prisma/client';

type ChannelPageProps = {
  params: {
    serverId: string;
    channelId: string;
  };
};

export default async function ChannelPage({ params }: ChannelPageProps) {
  const channel = (await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })) as Channel;

  return (
    <main>
      <ServerHeader
        serverId={params.serverId}
        name={channel.name}
        type='channel'
      />
      <section className='bg-blue-100 dark:bg-secondary h-[2px] w-screen md:w-full' />
    </main>
  );
}
