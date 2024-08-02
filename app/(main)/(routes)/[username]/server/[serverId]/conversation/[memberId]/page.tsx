import { findOrCreateConversation } from '@/actions/conversation.action';
import { findMember } from '@/actions/member.action';
import { getCurrentProfile } from '@/actions/profile.action';
import ServerHeader from '@/components/server/server-header';
import { MemberWithProfile } from '@/types';
import { Profile } from '@prisma/client';

type ConversationProps = {
  params: {
    username: string;
    serverId: string;
    memberId: string;
  };
};

export default async function Conversation({ params }: ConversationProps) {
  const currentProfile = (await getCurrentProfile()) as Profile;
  if (!currentProfile) {
    return null;
  }

  const member = (await findMember(
    params.serverId,
    currentProfile.id
  )) as MemberWithProfile;

  const conversation = await findOrCreateConversation(
    member.id,
    params.memberId
  );
  const { memberOne, memberTwo } = conversation;
  const otherMember =
    memberOne.profileId === currentProfile.id ? memberTwo : memberOne;

  return (
    <main>
      <ServerHeader
        name={otherMember.profile.username}
        serverId={params.serverId}
        type='conversation'
        imageUrl={otherMember.profile.imageUrl}
        username={params.username}
      />
    </main>
  );
}
