'use client';

import { MemberWithProfile, MessageWithMember } from '@/types';
import ChatMessage from './chat-message';
import { Channel } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { ServerCrash } from 'lucide-react';
import { useMessagesQuery } from '@/lib/hooks/use-messages-query';
import { useQueryClient } from '@tanstack/react-query';
import { socket } from '@/lib/socket';

type ChatMessageListProps = {
  currentMember: MemberWithProfile;
  name: string;
  type: string;
  channel: Channel;
};

export default function ChatMessageList({
  channel,
  currentMember,
}: ChatMessageListProps) {
  const [isNewMessageAdded, setIsNewMessageAdded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { data: messages, isLoading, error } = useMessagesQuery(channel.id);
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('newMessage', (message: MessageWithMember) => {
      queryClient.setQueryData(
        ['messages', channel.id],
        (old: MessageWithMember[] = []) => [...old, message]
      );
      setIsNewMessageAdded(true);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [queryClient, channel.id]);

  useEffect(() => {
    if (isNewMessageAdded && messages) {
      messagesEndRef.current?.scrollIntoView();
      setIsNewMessageAdded(false);
    }
  }, [messages, isNewMessageAdded]);

  if (isLoading)
    return (
      <div className='flex flex-col items-center h-full justify-center gap-2'>
        <span className='loading size-10 border-[5px]' />
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

  if (messages)
    return (
      <div className='space-y-3'>
        {messages.length
          ? messages.map(
              ({ id, content, createdAt, fileUrl, member, updatedAt }) => (
                <ChatMessage
                  id={id}
                  key={id}
                  createdAt={createdAt}
                  content={content}
                  fileUrl={fileUrl}
                  member={member}
                  currentMemberId={currentMember?.id}
                  currentMemberRole={currentMember?.role}
                  updatedAt={updatedAt}
                  queryClient={queryClient}
                />
              )
            )
          : null}

        <div ref={messagesEndRef} />
      </div>
    );
}
