'use client';

import { Channel } from '@prisma/client';
import ChatInput from './chat-input';
import { MemberWithProfile, MessageWithMember } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useMessagesQuery } from '@/lib/hooks/use-messages-query';
import { useQueryClient } from '@tanstack/react-query';
import ChatMessage from './chat-message';
import { socket } from '@/lib/socket';
import { ServerCrash } from 'lucide-react';

type ChatRoomProps = {
  channel: Channel;
  currentMember: MemberWithProfile;
};

export default function ChatRoom({ channel, currentMember }: ChatRoomProps) {
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isNewMessageAdded, setIsNewMessageAdded] = useState(true);
  const [isMyMsg, setIsMyMsg] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { data: messages, isLoading, error } = useMessagesQuery(channel.id);
  const queryClient = useQueryClient();
  const currentMemberId = currentMember.id;

  const scrollToBottom = () => {
    setTimeout(() => {
      if (!messagesEndRef.current) return;

      messagesEndRef.current.scrollIntoView();
    }, 10); // Adjust the delay as needed
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isBottom = scrollHeight - scrollTop <= clientHeight + 10; // Slight buffer to account for any inaccuracy

    if (isBottom) {
      setNewMessageCount(0);
      setIsNewMessageAdded(false);
    }

    setIsAtBottom(isBottom);
  };

  useEffect(() => {
    if (
      (isNewMessageAdded && messages && messages.length && isMyMsg) ||
      (isNewMessageAdded && isAtBottom)
    ) {
      scrollToBottom();
    }

    if (!isAtBottom && !isMyMsg && isNewMessageAdded) {
      setNewMessageCount((prev) => prev + 1);
    }
  }, [messages, isMyMsg, isNewMessageAdded]);

  useEffect(() => {
    socket.on('newMessage', (message: MessageWithMember | null) => {
      if (!message) {
        alert('Channel doest not exist');
        return;
      }

      setIsNewMessageAdded(true);
      setIsMyMsg(message.memberId === currentMemberId);

      queryClient.setQueryData(
        ['messages', channel.id],
        (old: MessageWithMember[] = []) => [...old, message]
      );
    });

    return () => {
      socket.off('newMessage');
    };
  }, [queryClient, channel.id, currentMemberId]);

  return (
    <div className='flex flex-col h-[calc(100vh-52px)] md:h-[calc(100vh-45px)]'>
      <div
        className='flex-1 py-4 overflow-y-auto space-y-4 relative'
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        <p className='font-bold text-xl text-center'>
          Welcome to <br /> {channel.name}
        </p>

        <div className='space-y-3'>
          {isLoading ? (
            <div className='flex flex-col items-center mt-20 gap-2'>
              <span className='loading size-10 border-[5px]' />
              <p>Loading messages...</p>
            </div>
          ) : error ? (
            <div className='flex flex-col items-center mt-20 gap-2 text-destructive'>
              <ServerCrash size={40} />
              <p>Something went wrong.</p>
            </div>
          ) : messages && messages.length ? (
            messages.map(
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
                  queryClient={queryClient}
                />
              )
            )
          ) : null}
        </div>

        {!isAtBottom && newMessageCount > 0 && (
          <button
            onClick={() => {
              scrollToBottom();
            }}
            className='fixed bottom-20 right-1/2 md:right-[calc((100vw-316px)/2)] translate-x-1/2 rounded-full py-1.5 px-3 text-sm hover:scale-105 transition-transform bg-blue-100 text-blue-500 dark:bg-blue-950 dark:text-blue-200'
          >
            {newMessageCount} new message{newMessageCount > 1 && 's'}
          </button>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        type='channel'
        name={channel.name}
        currentMember={currentMember}
        channelId={channel.id}
      />
    </div>
  );
}
