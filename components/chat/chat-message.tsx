'use client';

import { MemberRole } from '@prisma/client';
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

type ChatMessageProps = {
  id: string;
  fileUrl: string | null;
  content: string;
  createdAt: Date;
  deleted: boolean;
  updatedAt: Date;
  currentMemberId: string;
  currentMemberRole: MemberRole;

  member: {
    id: string;
    role: MemberRole;
    profile: {
      name: string;
      imageUrl: string;
    };
  };
};

export default function ChatMessage({
  id,
  content,
  fileUrl,
  createdAt,
  updatedAt,
  deleted,
  member,
  currentMemberId,
  currentMemberRole,
}: ChatMessageProps) {
  const { role, profile } = member;
  const { name, imageUrl } = profile;
  const timestamp = format(createdAt, 'MM/dd/yyyy h:mm a');
  const isCurrentMemberMsg = currentMemberId === member.id;
  const isGuest = currentMemberRole === 'GUEST';
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const params = useParams();
  const isEdited = !isEqual(createdAt, updatedAt);
  const { type, openDialog, closeDialog, data } = useDialog();
  const editMessage = async (event: FormEvent) => {
    event.preventDefault();

    const message = {
      messageId: id,
      editedContent,
      channelId: params.channelId,
      fileUrl,
    };

    setIsLoading(true);
    try {
      const response = await fetch('/api/edit-message', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast('An error occurred while editing the message. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
              <form
                onSubmit={editMessage}
                className='bg-zinc-200 dark:bg-zinc-600 rounded-md my-2 flex items-center p-2'
              >
                <TextareaAutosize
                  className='w-full bg-transparent outline-none resize-none disabled:pointer-events-none text-sm'
                  disabled={isLoading}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <EmojiPicker
                  isLoading={false}
                  handleEmojiSelect={(emoji: string) => {
                    setEditedContent((prev) => prev + emoji);
                  }}
                />
              </form>
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
