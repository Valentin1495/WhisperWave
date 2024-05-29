import { Dispatch, SetStateAction, useEffect } from 'react';

export const useImagePreview = (
  file: File | null,
  setPreview: Dispatch<SetStateAction<string | null>>
) => {
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
};
