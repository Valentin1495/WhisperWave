import { findChannel } from '@/actions/channel.action';
import { findMember } from '@/actions/member.action';
import { getCurrentProfile } from '@/actions/profile.action';
import ChatInput from '@/components/chat/chat-input';
import ChatMessagesList from '@/components/chat/chat-message-list';
import ServerHeader from '@/components/server/server-header';
import { Channel, Member, Profile } from '@prisma/client';

type ChannelPageProps = {
  params: {
    serverId: string;
    channelId: string;
  };
};

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { serverId, channelId } = params;
  const channel = (await findChannel(channelId)) as Channel;
  const currentProfile = (await getCurrentProfile()) as Profile;
  const currentMember = (await findMember(
    serverId,
    currentProfile.id
  )) as Member;

  return (
    <main>
      <ServerHeader serverId={serverId} name={channel.name} type='channel' />
      <div className='flex flex-col h-[calc(100vh-45px)]'>
        <div className='flex-1 py-4 overflow-y-auto space-y-4'>
          <p className='font-bold text-xl text-center'>
            Welcome to <br /> {channel.name}
          </p>
          <ChatMessagesList
            type='channel'
            currentMember={currentMember}
            name={channel.name}
            paramValue={channelId}
          />
        </div>
        <ChatInput
          serverId={serverId}
          channelId={channelId}
          name={channel.name}
          type='channel'
        />
      </div>
    </main>
  );
}
