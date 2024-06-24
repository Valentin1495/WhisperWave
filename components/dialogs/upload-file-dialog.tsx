'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useDialog } from '@/lib/hooks/use-dialog-store';
import { UploadDropzone } from '@/lib/utils';
import '@uploadthing/react/styles.css';

export default function UploadFileDialog() {
  const { open, closeDialog, type, addAttachment } = useDialog();

  return (
    <Dialog open={open && type === 'uploadFile'} onOpenChange={closeDialog}>
      <DialogContent>
        <UploadDropzone
          className='upload-dropzone'
          endpoint='imageUploader'
          onClientUploadComplete={(res) => {
            const { name, url } = res[0];
            addAttachment(url, name);
            closeDialog();
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
