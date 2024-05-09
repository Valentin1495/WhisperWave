import { inviteToServer } from '@/actions/server.action';
import { redirect } from 'next/navigation';

type InvitedServerProps = {
  params: {
    inviteCode: string;
  };
};

export default async function InvitedServer({ params }: InvitedServerProps) {
  const serverId = await inviteToServer(params.inviteCode);

  redirect(`/server/${serverId}`);
}
