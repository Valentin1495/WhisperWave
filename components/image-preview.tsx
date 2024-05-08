'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

type ImagePreviewProps = {
  file: File | null;
  setPreview: Dispatch<SetStateAction<string | undefined>>;
};

export default function ImagePreview({ file, setPreview }: ImagePreviewProps) {
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return null;
}
