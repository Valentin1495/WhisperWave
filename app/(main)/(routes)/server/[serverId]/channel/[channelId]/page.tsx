import { findChannel } from '@/actions/channel.action';
import { findMember } from '@/actions/member.action';
import { getCurrentProfile } from '@/actions/profile.action';
import ServerHeader from '@/components/server/server-header';
import { redirect } from 'next/navigation';
import ChatRoom from '@/components/chat/chat-room';
import { redirectToServer } from '@/actions/server.action';

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
    redirect(`/server/${serverId}`);
  }

  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    throw new Error('Profile not found');
  }

  const currentMember = await findMember(serverId, currentProfile.id);

  if (!currentMember) {
    await redirectToServer(currentProfile.id);
    return;
  }

  return (
    <main>
      <ServerHeader serverId={serverId} name={channel.name} type='channel' />
      <ChatRoom channel={channel} currentMember={currentMember} />
    </main>
  );
}
