'use client';

import { useEffect } from 'react';

type SetUsernameInLocalStorageProps = {
  username: string;
};

export default function SetUsernameInLocalStorage({
  username,
}: SetUsernameInLocalStorageProps) {
  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem('username', username);
    }
  }, [username]);

  return null;
}
