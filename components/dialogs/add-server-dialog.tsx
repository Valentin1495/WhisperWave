'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { addServer } from '@/actions/server.action';
import AddServerButton from '../buttons/add-server-button';
import { useFormState } from 'react-dom';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import { AvatarPhoto } from '../avatar-photo';
import Upload from '../upload';
import { FileType } from '@/types';
import { toast } from 'sonner';

const initialState = {
  message: '',
};

export default function AddServerDialog() {
  const [serverName, setServerName] = useState('');
  const [file, setFile] = useState<FileType | null>(null);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [state, addServerAction] = useFormState(addServer, initialState);
  const { open, closeDialog, type } = useDialog();

  useEffect(() => {
    if (state.message === 'Success') {
      closeDialog();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, closeDialog]);

  return (
    <Dialog open={open && type === 'addServer'} onOpenChange={closeDialog}>
      <DialogContent className='px-3 pb-3 pt-6'>
        <DialogHeader>
          <DialogTitle className='font-bold text-xl text-center'>
            Customize Your Server
          </DialogTitle>
          <DialogDescription className='text-sm text-center'>
            Give your new server a personality with a name and an icon. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>

        <form action={addServerAction}>
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
            value={serverName.trim()}
            onChange={(e) => setServerName(e.target.value)}
          />

          <Input
            name='serverIcon'
            value={file?.url}
            type='hidden'
            className='hidden'
            readOnly
          />

          <AddServerButton serverName={serverName} file={file?.url} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
