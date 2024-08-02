'use client';

import { FileUp, Send, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { FormEvent, KeyboardEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Separator } from '../ui/separator';
import EmojiPicker from './emoji-picker';
import { useMounted } from '@/lib/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { MemberWithProfile } from '@/types';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import { socket } from '@/lib/socket';

type ChatInputProps = {
  channelId: string;
  name: string;
  type: 'conversation' | 'channel';
  currentMember: MemberWithProfile;
};

export default function ChatInput({
  channelId,
  name,
  type,
  currentMember,
}: ChatInputProps) {
  const [newMessage, setNewMessage] = useState('');
  const { openDialog, fileName, fileUrl, removeAttachment } = useDialog();

  const handleSend = async (event: FormEvent) => {
    event.preventDefault();

    socket.emit('sendMessage', {
      newMessage: newMessage.trim(),
      fileUrl,
      channelId,
      currentMemberId: currentMember?.id,
    });

    setNewMessage('');
    if (fileUrl) {
      removeAttachment();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend(event as any); // TypeScript workaround for FormEvent
    }
  };

  const isEmpty = newMessage.trim().length === 0 && !fileUrl;
  const isMounted = useMounted();

  if (isMounted)
    return (
      <div className='sticky top-0 mb-4 mx-4'>
        <form
          onSubmit={handleSend}
          className='bg-blue-50 dark:bg-secondary/50 p-3 rounded-md flex-col'
        >
          {fileUrl && (
            <>
              <div className='bg-background w-fit p-2 space-y-2 relative'>
                <section className='bg-background rounded-sm overflow-hidden relative size-40'>
                  <Image
                    src={fileUrl}
                    alt={fileName!}
                    fill
                    className='object-cover'
                  />
                </section>
                <button
                  type='button'
                  onClick={removeAttachment}
                  className='absolute -top-3 p-1 rounded-full -right-1 bg-red-700 hover:bg-red-600'
                >
                  <Trash2 className='text-white' size={20} />
                </button>
                <p className='text-sm text-zinc-500 truncate w-40'>
                  {fileName}
                </p>
              </div>
              <Separator className='my-3' />
            </>
          )}

          <div className='flex items-start'>
            <button
              type='button'
              onClick={() => openDialog('uploadFile')}
              className='text-zinc-500 hover:text-zinc-700 transition'
            >
              <FileUp />
            </button>
            <TextareaAutosize
              name='newMessage'
              className='w-full bg-transparent outline-none resize-none mx-2'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={
                type === 'channel' ? `Message #${name}` : `Message @${name}`
              }
              onKeyDown={handleKeyDown}
            />

            <EmojiPicker
              handleEmojiSelect={(emoji: string) => {
                setNewMessage((prev) => prev + emoji);
              }}
            />
            <button
              className={cn(
                'disabled:pointer-events-none hover:scale-110 transition ml-2',
                isEmpty && 'opacity-50'
              )}
              type='submit'
              disabled={isEmpty}
            >
              <Send className='text-primary' />
            </button>
          </div>
        </form>
      </div>
    );
}
