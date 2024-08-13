import { findChannel } from '@/actions/channel.action';
import { findMember } from '@/actions/member.action';
import { getCurrentProfile } from '@/actions/profile.action';
import ServerHeader from '@/components/server/server-header';
import { notFound } from 'next/navigation';
import ChatRoom from '@/components/chat/chat-room';

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

  const currentMember = await findMember(serverId, currentProfile.id);

  if (!currentMember) {
    notFound();
  }

  return (
    <main>
      <ServerHeader serverId={serverId} name={channel.name} type='channel' />
      <ChatRoom channel={channel} currentMember={currentMember} />
    </main>
  );
}
