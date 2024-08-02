'use client';

import { inviteToServer } from '@/actions/server.action';
import { useQuery } from '@tanstack/react-query';
import { ServerCrash } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

type RedirectToInvitedServerProps = {
  inviteCode: string;
};

export default function RedirectToInvitedServer({
  inviteCode,
}: RedirectToInvitedServerProps) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const {
    data: serverId,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['invitedServer', inviteCode],
    queryFn: async () => await inviteToServer(inviteCode, username),
  });

  if (isLoading)
    return (
      <div className='flex flex-col items-center justify-center gap-2 h-screen'>
        <span className='loading size-10 border-[5px]' />
        <p>Redirecting to the invited server...</p>
      </div>
    );

  if (error)
    return (
      <div className='flex flex-col items-center justify-center gap-2 h-screen text-destructive'>
        <ServerCrash size={40} />
        <p>Something went wrong.</p>
      </div>
    );

  redirect(`/${username}/server/${serverId}`);
}
