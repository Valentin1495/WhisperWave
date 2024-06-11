'use client';

import { MemberWithProfile } from '@/types';
import ChatMessage from './chat-message';
import { useMessages } from '@/lib/hooks/use-messages';
import { Channel } from '@prisma/client';
import ChatScrollAnchor from './chat-scroll-anchor';

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

  if (isLoading)
    return (
      <div className='flex flex-col items-center h-full justify-center gap-2'>
        <span className='loading w-10 h-10 border-[5px]'></span>
        <p>Loading messages...</p>
      </div>
    );
  if (error)
    return (
      <div className='flex h-full items-center'>
        <p className='text-destructive text-center'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut vel eius
          eveniet aperiam quae iusto temporibus non expedita asperiores at?
        </p>
      </div>
    );
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
      <ChatScrollAnchor />
    </div>
  );
}
