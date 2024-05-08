'use client';

import { useEffect, useRef, useState } from 'react';
import { Label } from './ui/label';
import { ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addServer } from '@/actions/server.action';
import { Input } from './ui/input';
import { AvatarPhoto } from './avatar-photo';
import SubmitButton from './add-server-button';

export default function AddServerForm() {
  const [serverName, setServerName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
  }, [file]);

  return (
    <div className='w-80 lg:w-[400px] bg-secondary px-3 pb-3 pt-6 rounded-lg'>
      <form action={addServer}>
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
        <Label className='text-sm font-semibold'>SERVER NAME</Label>
        <Input
          name='serverName'
          className='border-none my-2.5 bg-primary/10 dark:bg-primary/20'
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
        />

        <SubmitButton serverName={serverName} file={file} />
      </form>
    </div>
  );
}
