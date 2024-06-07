'use client';

import { MemberWithProfile } from '@/types';
import ChatMessage from './chat-message';
import { useMessages } from '@/lib/hooks/use-messages';
import { Channel } from '@prisma/client';

type ChatMessagesListProps = {
  currentMember: MemberWithProfile;
  name: string;
  type: string;
  channel: Channel;
};

export default function ChatMessagesList({
  channel,
  currentMember,
}: ChatMessagesListProps) {
  const {
    messages,
    isLoading,
    error,
    editMessageMutation,
    deleteMessageMutation,
  } = useMessages(channel.id, currentMember);

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div className='space-y-3'>
      {messages?.map(
        ({ id, content, createdAt, fileUrl, member, updatedAt }) => (
          <ChatMessage
            id={id}
            key={id}
            createdAt={createdAt}
            content={content}
            fileUrl={fileUrl}
            member={member}
            currentMemberId={currentMember.id}
            currentMemberRole={currentMember.role}
            updatedAt={updatedAt}
            editMessageMutation={editMessageMutation}
            deleteMessageMutation={deleteMessageMutation}
            channel={channel}
          />
        )
      )}
    </div>
  );
}
