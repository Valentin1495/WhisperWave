'use client';

import { MemberWithProfile, MessageWithMember } from '@/types';
import ChatMessage from './chat-message';
import { Channel } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { ServerCrash } from 'lucide-react';
import { socket } from '@/socket';
import { useMessagesQuery } from '@/lib/hooks/use-messages-query';
import { isEqual } from 'date-fns';

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
  const [isNewMessageAdded, setIsNewMessageAdded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<MessageWithMember[]>([]);
  const { data, isLoading, error } = useMessagesQuery(channel.id);

  useEffect(() => {
    if (data) {
      setMessages(data);
      setIsNewMessageAdded(true);
    }
  }, [data]);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message: MessageWithMember) => {
        setMessages((prev) => {
          if (isEqual(prev[prev.length - 1].createdAt, message.createdAt)) {
            return prev;
          } else {
            return [...prev, message];
          }
        });
        setIsNewMessageAdded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (isNewMessageAdded) {
      messagesEndRef.current?.scrollIntoView();
      setIsNewMessageAdded(false);
    }
  }, [messages, isNewMessageAdded]);

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
                currentMemberId={currentMember.id}
                currentMemberRole={currentMember.role}
                updatedAt={updatedAt}
                setMessages={setMessages}
              />
            )
          )
        : null}

      <div ref={messagesEndRef} />
    </div>
  );
}
