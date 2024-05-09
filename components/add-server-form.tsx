'use client';

import { useRef, useState } from 'react';
import { Label } from './ui/label';
import { ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addServer } from '@/actions/server.action';
import { Input } from './ui/input';
import { AvatarPhoto } from './avatar-photo';
import AddServerButton from './add-server-button';
import ImagePreview from './image-preview';
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
};

export default function AddServerForm() {
  const [serverName, setServerName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [_, addServerAction] = useFormState(addServer, initialState);

  return (
    <div className='w-96 lg:w-[500px] bg-secondary px-3 pb-3 pt-6 rounded-lg space-y-5'>
      <div className='space-y-2'>
        <h1 className='font-bold text-xl text-center'>Create Your Server</h1>
        <p className='text-sm text-center'>
          Your server is where you and your friends hang out. Make yours and
          start talking.
        </p>
      </div>
      <form action={addServerAction}>
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
          <ImagePreview file={file} setPreview={setPreview} />
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
        <Label className='text-sm font-semibold'>SERVER NAME</Label>
        <Input
          name='serverName'
          className='border-none my-2.5 bg-primary/10 dark:bg-primary/20'
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
        />

        <AddServerButton serverName={serverName} file={file} />
      </form>
    </div>
  );
}
