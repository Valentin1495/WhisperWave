import { getCurrentProfile } from '@/actions/profile.action';
import { inviteToServer, redirectToServer } from '@/actions/server.action';
import { redirect } from 'next/navigation';

type InvitedServerProps = {
  params: {
    inviteCode: string;
  };
};

export default async function InvitedServer({ params }: InvitedServerProps) {
  const serverId = await inviteToServer(params.inviteCode);
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    throw new Error('Profile not found');
  }

  if (!serverId) {
    await redirectToServer(currentProfile.id);
    return;
  }

  redirect(`/server/${serverId}`);
}
