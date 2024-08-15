import { getCurrentProfile } from '@/actions/profile.action';
import { findServer, redirectToServer } from '@/actions/server.action';
import MemberRow from '@/components/server/member-row';
import ServerHeader from '@/components/server/server-header';
import { notFound } from 'next/navigation';

type MembersProps = {
  params: {
    serverId: string;
  };
};

export default async function Members({ params }: MembersProps) {
  const server = await findServer(params.serverId);

  if (!server) {
    throw new Error('Server not found');
  }

  const members = server.members;
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    throw new Error('Profile not found');
  }

  const isMember = members.find(
    (member) => member.profileId === currentProfile.id
  );

  if (!isMember) {
    await redirectToServer(currentProfile.id);
    return;
  }

  const myRole = isMember.role;
  const isGuest = myRole === 'GUEST';

  return (
    <main>
      <ServerHeader name='Members' type='members' serverId={params.serverId} />
      <section className='bg-blue-100 dark:bg-secondary h-[2px] w-screen md:w-full' />
      <div className='border rounded-lg divide-y mx-3 mt-3 w-[calc(100vw-24px)] md:w-auto'>
        <h2 className='text-sm font-medium p-3'>
          {members.length} {members.length === 1 ? 'Member' : 'Members'}
        </h2>
        {members.map((member) => (
          <MemberRow
            key={member.id}
            {...member}
            isGuest={isGuest}
            server={server}
            currentProfileId={currentProfile.id}
          />
        ))}
      </div>
    </main>
  );
}
