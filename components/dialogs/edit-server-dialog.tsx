'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useRef, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { AvatarPhoto } from '../avatar-photo';
import { cn } from '@/lib/utils';
import { editServer } from '@/actions/server.action';
import { useFormState } from 'react-dom';
import { useDialog } from '@/hooks/use-dialog-store';
import ImagePreview from '../image-preview';
import EditServerButton from '../edit-server-button';

const initialState = {
  message: '',
};

export default function EditServerDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const [serverName, setServerName] = useState<string>();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();
  const [mouseEnter, setMouseEnter] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [state, editServerAction] = useFormState(editServer, initialState);
  let prevServerName = data?.server?.name;
  let prevImageUrl = data?.server?.imageUrl;
  const isSameServer = serverName === prevServerName && !file;

  useEffect(() => {
    setServerName(prevServerName);
    setPreview(prevImageUrl);
  }, [data]);

  useEffect(() => {
    if (state.message === 'Success!') {
      closeDialog();
    }
  }, [state]);

  return (
    <Dialog open={open && type === 'editServer'} onOpenChange={closeDialog}>
      <DialogContent className='px-3 pb-3 pt-6'>
        <DialogHeader>
          <DialogTitle className='font-bold text-xl text-center'>
            Server Overview
          </DialogTitle>
        </DialogHeader>

        <form action={editServerAction}>
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
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
          >
            <ImagePreview file={file} setPreview={setPreview} />
            {preview && (
              <div className='relative'>
                <AvatarPhoto
                  src={preview}
                  alt={file ? file.name : 'server icon'}
                  className='size-full'
                />
                {mouseEnter && (
                  <section className='absolute inset-0 bg-black/50 rounded-full flex items-center justify-center'>
                    <h3 className='text-xs text-center font-bold text-primary-foreground dark:text-foreground'>
                      CHANGE <br /> ICON
                    </h3>
                  </section>
                )}
              </div>
            )}
          </div>
          <Label className='text-sm font-semibold'>SERVER NAME</Label>
          <Input
            name='serverName'
            className='border-none my-2.5 bg-primary/10 dark:bg-primary/20'
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
          <Input
            type='hidden'
            className='hidden'
            value={data?.server?.id}
            readOnly
            name='serverId'
          />
          <Input
            type='hidden'
            className='hidden'
            value={prevImageUrl}
            readOnly
            name='prevImageUrl'
          />
          <EditServerButton
            serverName={serverName || ''}
            isSameServer={isSameServer}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
