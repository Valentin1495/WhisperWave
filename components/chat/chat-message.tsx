'use client';

import { Channel, MemberRole } from '@prisma/client';
import { AvatarPhoto } from '../avatar-photo';
import { format, isEqual } from 'date-fns';
import Image from 'next/image';
import { Edit, Trash2 } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';
import EmojiPicker from './emoji-picker';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import { UseMutationResult } from '@tanstack/react-query';
import { EditedMessage } from '@/types';
import { socket } from '@/socket';

type ChatMessageProps = {
  id: string;
  fileUrl: string | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  currentMemberId: string;
  currentMemberRole: MemberRole;
  channel: Channel;
  member: {
    id: string;
    role: MemberRole;
    profile: {
      name: string;
      imageUrl: string;
    };
  };
  editMessageMutation: UseMutationResult<
    any,
    Error,
    EditedMessage,
    {
      previousMessages: unknown;
    }
  >;
  deleteMessageMutation: UseMutationResult<
    any,
    Error,
    string,
    {
      previousMessages: unknown;
    }
  >;
};

export default function ChatMessage({
  id,
  content,
  fileUrl,
  createdAt,
  updatedAt,
  channel,
  member,
  currentMemberId,
  currentMemberRole,
  editMessageMutation,
}: ChatMessageProps) {
  const { profile } = member;
  const { name, imageUrl } = profile;
  const timestamp = format(createdAt, 'MM/dd/yyyy h:mm a');
  const isCurrentMemberMsg = currentMemberId === member.id;
  const isGuest = currentMemberRole === 'GUEST';
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const { channelId } = useParams();
  const isEdited = !isEqual(createdAt, updatedAt);
  const { openDialog } = useDialog();

  const editMessage = async (event: FormEvent) => {
    event.preventDefault();

    editMessageMutation.mutate(
      {
        messageId: id,
        channelId: channelId as string,
        editedContent,
      },
      {
        onSuccess: (updatedMessage) => {
          socket.emit(`chat:${channelId}`, updatedMessage);
          setIsEditing(false);
        },
        onError: (error) => {
          console.error(error);
          toast(
            'An error occurred while editing the message. Please try again.'
          );
        },
      }
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      editMessage(event as any); // TypeScript workaround for FormEvent
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='hover:bg-zinc-100 dark:hover:bg-zinc-800 px-4 py-1 group'>
      <div className='flex gap-3'>
        <AvatarPhoto
          src={imageUrl}
          alt='profile picture'
          className='object-cover size-10'
        />

        <div className='w-full'>
          <div className='space-x-1.5 relative'>
            <span className='font-medium'>{name}</span>
            <span className='text-xs text-zinc-500 dark:text-zinc-400 mr-auto'>
              {timestamp}
            </span>
            <section className='group-hover:inline hidden absolute right-0 space-x-1'>
              {isCurrentMemberMsg && (
                <button
                  className='hover:opacity-75 transition'
                  onClick={() => setIsEditing((prev) => !prev)}
                >
                  <Edit size={16} />
                </button>
              )}
              {(!isGuest || isCurrentMemberMsg) && (
                <button
                  className='hover:opacity-75 transition text-destructive'
                  onClick={() =>
                    openDialog('deleteMessage', {
                      messageId: id,
                      channel,
                    })
                  }
                >
                  <Trash2 size={16} />
                </button>
              )}
            </section>
          </div>
          <div>
            {isEditing ? (
              <>
                <form
                  onSubmit={editMessage}
                  className='bg-zinc-200 dark:bg-zinc-600 rounded-md my-2 flex items-center p-2'
                >
                  <TextareaAutosize
                    className='w-full bg-transparent outline-none resize-none disabled:pointer-events-none text-sm'
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <EmojiPicker
                    handleEmojiSelect={(emoji: string) => {
                      setEditedContent((prev) => prev + emoji);
                    }}
                  />
                </form>
                <p className='text-xs'>escape to cancel</p>
              </>
            ) : (
              <p className={cn(fileUrl && 'mb-1', 'text-sm')}>
                {content}{' '}
                {isEdited && <span className='text-xs'>(edited)</span>}
              </p>
            )}
            {fileUrl && (
              <a
                href={fileUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='w-fit inline-block'
              >
                <section className='relative size-64 rounded-md overflow-hidden'>
                  <Image
                    src={fileUrl}
                    alt='attachment'
                    fill
                    className='object-cover'
                  />
                </section>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
