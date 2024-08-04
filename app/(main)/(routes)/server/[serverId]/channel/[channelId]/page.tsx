import { findChannel } from '@/actions/channel.action';
import { findMember } from '@/actions/member.action';
import { getCurrentProfile } from '@/actions/profile.action';
import ServerHeader from '@/components/server/server-header';
import { MemberWithProfile } from '@/types';
import { Channel, Profile } from '@prisma/client';
import ChatInput from '@/components/chat/chat-input';
import ChatMessageList from '@/components/chat/chat-message-list';
import { notFound } from 'next/navigation';

type ChannelPageProps = {
  params: {
    serverId: string;
    channelId: string;
  };
};

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { serverId, channelId } = params;
  const channel = await findChannel(channelId);

  if (!channel) {
    notFound();
  }

  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    throw new Error('Profile not found');
  }

  const currentMember = (await findMember(
    serverId,
    currentProfile.id
  )) as MemberWithProfile;

  return (
    <main>
      <ServerHeader serverId={serverId} name={channel.name} type='channel' />
      <div className='flex flex-col h-[calc(100vh-52px)] md:h-[calc(100vh-45px)]'>
        <div className='flex-1 py-4 overflow-y-auto space-y-4'>
          <p className='font-bold text-xl text-center'>
            Welcome to <br /> {channel.name}
          </p>
          <ChatMessageList
            type='channel'
            name={channel.name}
            currentMember={currentMember}
            channel={channel}
          />
        </div>
        <ChatInput
          type='channel'
          name={channel.name}
          currentMember={currentMember}
          channelId={channelId}
        />
      </div>
    </main>
  );
}
