'use client';

import { MemberWithProfile } from '@/types';
import ChatMessage from './chat-message';
import { useMessages } from '@/lib/hooks/use-messages';
import { Channel } from '@prisma/client';
import { useEffect, useRef } from 'react';
import { ServerCrash } from 'lucide-react';

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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading)
    return (
      <div className='flex flex-col items-center h-full justify-center gap-2'>
        <span className='loading w-10 h-10 border-[5px]' />
        <p>Loading messages...</p>
      </div>
    );
  if (error)
    return (
      <div className='flex flex-col items-center h-full justify-center gap-2 text-destructive'>
        <ServerCrash size={40} />
        <p>Something went wrong.</p>
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

      <div ref={messagesEndRef} />
    </div>
  );
}
