'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { AvatarPhoto } from '../avatar-photo';
import { editServer } from '@/actions/server.action';
import { useFormState } from 'react-dom';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import EditServerButton from '../buttons/edit-server-button';
import Upload from '../upload';
import { FileType } from '@/types';
import { useParams } from 'next/navigation';

const initialState = {
  message: '',
};

export default function EditServerDialog() {
  const params = useParams();
  const { open, closeDialog, type, data } = useDialog();
  const [serverName, setServerName] = useState<string>();
  const [file, setFile] = useState<FileType | null>(null);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [state, editServerAction] = useFormState(editServer, initialState);
  let prevServerName = data?.server?.name;
  let prevImageUrl = data?.server?.imageUrl;
  const isSameServer =
    serverName === prevServerName && prevImageUrl === file?.url;

  useEffect(() => {
    setServerName(prevServerName);
    setFile({ url: prevImageUrl || '', name: 'previous server icon' });
  }, [data, prevImageUrl, prevServerName]);

  useEffect(() => {
    if (state.message === 'Success') {
      closeDialog();
    }
  }, [state, closeDialog]);

  return (
    <Dialog open={open && type === 'editServer'} onOpenChange={closeDialog}>
      <DialogContent className='px-3 pb-3 pt-6'>
        <DialogHeader>
          <DialogTitle className='font-bold text-xl text-center'>
            Server Overview
          </DialogTitle>
        </DialogHeader>

        <form action={editServerAction}>
          {file ? (
            <div
              className='relative rounded-full size-32 flex items-center justify-center cursor-pointer mx-auto'
              onMouseEnter={() => setMouseEnter(true)}
              onMouseLeave={() => setMouseEnter(false)}
              onClick={() => {
                setFile(null);
              }}
            >
              <AvatarPhoto
                src={file.url}
                alt={file.name}
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
          ) : (
            <Upload handleFile={setFile} handleMouseEnter={setMouseEnter} />
          )}

          <Label
            htmlFor='serverName'
            className='text-sm font-semibold mt-5 inline-block'
          >
            SERVER NAME
          </Label>
          <Input
            id='serverName'
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
            value={file?.url}
            readOnly
            name='serverIcon'
          />
          <Input
            type='hidden'
            className='hidden'
            value={params.username}
            readOnly
            name='username'
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
