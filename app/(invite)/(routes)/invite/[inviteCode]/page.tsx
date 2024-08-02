import RedirectToInvitedServer from '@/components/redirect-to-invited-server';

type InvitedServerProps = {
  params: {
    inviteCode: string;
  };
};

export default async function InvitedServer({ params }: InvitedServerProps) {
  return <RedirectToInvitedServer inviteCode={params.inviteCode} />;
}
