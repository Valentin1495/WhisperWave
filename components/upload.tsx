import { UploadDropzone } from '@/lib/utils';
import { FileType } from '@/types';
import { Dispatch, SetStateAction } from 'react';

type UploadProps = {
  handleFile: Dispatch<SetStateAction<FileType | null>>;
  handleMouseEnter: Dispatch<SetStateAction<boolean>>;
};

export default function Upload({ handleFile, handleMouseEnter }: UploadProps) {
  return (
    <UploadDropzone
      appearance={{
        container:
          'size-32 rounded-full p-0 border-2 border-primary cursor-pointer mx-auto space-y-0',
        label: 'hidden',
        allowedContent: 'hidden',
        button: 'text-sm w-[100px] h-9 rounded-full font-semibold',
        uploadIcon: 'text-primary size-11 -mt-3',
      }}
      endpoint='imageUploader'
      onClientUploadComplete={(res) => {
        const { url, name } = res[0];
        handleFile({ url, name });
        handleMouseEnter(false);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
