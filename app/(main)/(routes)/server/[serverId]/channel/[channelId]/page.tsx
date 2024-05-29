import ChatInput from '@/components/chat/chat-input';
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
      <div className='flex flex-col h-[calc(100vh-45px)]'>
        <div className='flex-1'></div>
        <ChatInput
          serverId={params.serverId}
          channelId={params.channelId}
          name={channel.name}
          type='channel'
        />
      </div>
    </main>
  );
}
