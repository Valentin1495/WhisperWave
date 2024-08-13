'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { AvatarPhoto } from '../avatar-photo';
import { useFormState } from 'react-dom';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import Upload from '../upload';
import { FileType } from '@/types';
import { toast } from 'sonner';
import EditProfileButton from '../buttons/edit-profile-button';
import { editProfile } from '@/actions/profile.action';
import { Label } from '../ui/label';

const initialState = {
  message: '',
};

export default function EditProfileDialog() {
  const { open, closeDialog, type, data } = useDialog();
  const [file, setFile] = useState<FileType | null>(null);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [state, editProfileAction] = useFormState(editProfile, initialState);
  const [username, setUsername] = useState<string>();

  let prevProfilePic = data?.userInfo?.profilePic;
  let prevUsername = data?.userInfo?.username;
  const isSameProfile =
    prevProfilePic === file?.url && username === prevUsername;

  useEffect(() => {
    setFile({ url: prevProfilePic || '', name: 'previous profile picture' });
    setUsername(prevUsername);
  }, [data, prevProfilePic, prevUsername]);

  useEffect(() => {
    if (state.message === 'Success') {
      closeDialog();
    } else if (state.message) {
      toast.error('Failed to edit the profile');
    }
  }, [state, closeDialog]);

  return (
    <Dialog open={open && type === 'editProfile'} onOpenChange={closeDialog}>
      <DialogContent className='px-3 pb-3 pt-6'>
        <DialogHeader>
          <DialogTitle className='font-bold text-xl text-center'>
            Profile Overview
          </DialogTitle>
        </DialogHeader>

        <form action={editProfileAction}>
          {file ? (
            <div
              className='relative rounded-full size-32 flex items-center justify-center cursor-pointer mx-auto'
              onMouseEnter={() => setMouseEnter(true)}
              onMouseLeave={() => setMouseEnter(false)}
              onClick={() => {
                setFile(null);
              }}
            >
              {file.url.includes('#') ? (
                <section
                  style={{
                    backgroundColor: file.url,
                  }}
                  className='size-full rounded-full'
                ></section>
              ) : (
                <AvatarPhoto
                  src={file.url}
                  alt={file.name}
                  className='size-full'
                />
              )}
              {mouseEnter && (
                <section className='absolute inset-0 bg-black/50 rounded-full flex items-center justify-center'>
                  <h3 className='text-xs text-center font-bold text-primary-foreground dark:text-foreground'>
                    CHANGE <br /> PHOTO
                  </h3>
                </section>
              )}
            </div>
          ) : (
            <Upload handleFile={setFile} handleMouseEnter={setMouseEnter} />
          )}

          <Input
            type='hidden'
            className='hidden'
            value={file?.url}
            readOnly
            name='profilePic'
          />

          <Label
            htmlFor='username'
            className='text-sm font-semibold mt-5 inline-block'
          >
            USERNAME
          </Label>
          <Input
            id='username'
            name='username'
            className='border-none my-2.5 bg-primary/10 dark:bg-primary/20'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <EditProfileButton
            username={username || ''}
            file={file}
            isSameProfile={isSameProfile}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
