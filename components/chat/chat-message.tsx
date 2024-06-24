'use client';

import { MemberRole } from '@prisma/client';
import { AvatarPhoto } from '../avatar-photo';
import { format, isEqual } from 'date-fns';
import Image from 'next/image';
import { Edit, Trash2 } from 'lucide-react';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';
import EmojiPicker from './emoji-picker';
import { useParams } from 'next/navigation';
import { socket } from '@/socket';
import { MessageWithMember } from '@/types';

type ChatMessageProps = {
  id: string;
  fileUrl: string | null;
  content: string;
  createdAt: Date;
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
  setMessages: Dispatch<SetStateAction<MessageWithMember[]>>;
};

export default function ChatMessage({
  id,
  content,
  fileUrl,
  createdAt,
  updatedAt,
  member,
  currentMemberId,
  currentMemberRole,
  setMessages,
}: ChatMessageProps) {
  const timestamp = format(createdAt, 'MM/dd/yyyy h:mm a');
  const isCurrentMemberMsg = currentMemberId === member?.id;
  const isGuest = currentMemberRole === 'GUEST';
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(content);
  const [isEdited, setIsEdited] = useState(!isEqual(createdAt, updatedAt));
  const { channelId } = useParams();

  const editMessage = async (event: FormEvent) => {
    event.preventDefault();

    socket.emit('editMessage', {
      messageId: id,
      channelId,
      editedMessage,
    });
  };

  const deleteMessage = async (event: FormEvent) => {
    event.preventDefault();
    const confirmed = window.confirm(
      'Are you sure you want to delete this message?'
    );

    if (confirmed) {
      socket.emit('deleteMessage', {
        messageId: id,
        channelId,
      });
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
        setEditedMessage(content);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [content]);

  useEffect(() => {
    if (socket) {
      socket.on('editedMessage', (message: MessageWithMember) => {
        id === message.id && setIsEdited(true);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === message.id ? { ...msg, content: message.content } : msg
          )
        );
        setIsEditing(false);
      });

      socket.on('deletedMessage', (message: MessageWithMember) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== message.id));
      });
    }
  }, [id, setMessages]);

  return (
    <div className='hover:bg-zinc-100 dark:hover:bg-zinc-800 px-4 py-1 group'>
      <div className='flex gap-3'>
        <AvatarPhoto
          src={member?.profile?.imageUrl}
          alt='Profile picture'
          className='size-10'
        />

        <div className='w-full'>
          <div className='space-x-1.5 relative'>
            <span className='font-medium'>{member?.profile?.name}</span>
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
                  onClick={deleteMessage}
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
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <EmojiPicker
                    handleEmojiSelect={(emoji: string) => {
                      setEditedMessage((prev) => prev + emoji);
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
