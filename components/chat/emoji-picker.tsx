'use client';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Smile } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type EmojiPickerProps = {
  handleEmojiSelect: (emoji: string) => void;
};

export default function EmojiPicker({ handleEmojiSelect }: EmojiPickerProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger className='text-zinc-500 hover:text-zinc-700 transition disabled:pointer-events-none'>
        <Smile />
      </PopoverTrigger>
      <PopoverContent
        side='top'
        sideOffset={20}
        className='w-auto mr-8 p-0 shadow-none border-none border-0'
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => {
            handleEmojiSelect(emoji.native);
          }}
          theme={resolvedTheme}
        />
      </PopoverContent>
    </Popover>
  );
}
