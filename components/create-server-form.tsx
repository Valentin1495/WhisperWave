'use client';

import { useEffect, useRef, useState } from 'react';
import { Label } from './ui/label';
import { ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createServer } from '@/actions/server.action';
import { Input } from './ui/input';
import { AvatarPhoto } from './avatar-photo';
import { useFormState } from 'react-dom';
import AddServerButton from './buttons/add-server-button';
import { useImagePreview } from '@/lib/hooks/use-image-preview';
import { toast } from 'sonner';

const initialState = {
  message: '',
};

export default function CreateServerForm() {
  const [serverName, setServerName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [state, createServerAction] = useFormState(createServer, initialState);

  useImagePreview(file, setPreview);

  useEffect(() => {
    if (state.message && state.message !== 'Success') {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className='w-2/3 md:w-1/2 xl:w-1/4 bg-secondary p-5 rounded-lg space-y-5'>
      <div className='space-y-2'>
        <h1 className='font-bold text-xl text-center'>Create Your Server</h1>
        <p className='text-sm text-center'>
          Your server is where you and your friends hang out. Make yours and
          start talking.
        </p>
      </div>
      <form action={createServerAction}>
        <Input
          name='serverIcon'
          type='file'
          className='hidden'
          ref={fileRef}
          accept='image/*'
          onChange={(e) => {
            const file = e.target.files && e.target.files[0];
            if (file && file.type.slice(0, 5) === 'image') {
              setFile(file);
            }
          }}
        />

        <div
          className={cn(
            'rounded-full size-[88px] flex items-center justify-center cursor-pointer mx-auto mb-5',
            !preview && 'border-2 border-foreground border-dashed'
          )}
          onClick={() => fileRef.current?.click()}
        >
          {preview ? (
            <AvatarPhoto
              src={preview}
              alt={file ? file.name : 'server icon'}
              className='size-full'
            />
          ) : (
            <section className='text-sm font-bold'>
              <ImagePlus
                strokeWidth={2.25}
                className='mx-auto text-foreground'
              />
              UPLOAD
            </section>
          )}
        </div>

        <Label htmlFor='serverName' className='text-sm font-semibold'>
          SERVER NAME
        </Label>
        <Input
          id='serverName'
          name='serverName'
          className='border-none my-2.5'
          value={serverName.trim()}
          onChange={(e) => setServerName(e.target.value)}
        />

        <AddServerButton serverName={serverName} file={file} />
      </form>
    </div>
  );
}
