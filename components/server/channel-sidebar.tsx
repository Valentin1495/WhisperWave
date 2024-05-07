import { getMyProfile } from '@/actions/profile.action';
import { findServer } from '@/actions/server.action';
import { ServerWithMembers } from '@/types';
import ChannelHeader from './channel-header';

type ChannelSidebarProps = {
  serverId: string;
};

export default async function ChannelSidebar({
  serverId,
}: ChannelSidebarProps) {
  const myProfile = await getMyProfile();
  const server = (await findServer(serverId)) as ServerWithMembers;
  const role = server.members.find(
    (member) => member.profileId === myProfile?.id
  )?.role;

  return (
    <div className='sticky top-0 bg-blue-50 dark:bg-secondary/50 h-screen'>
      <ChannelHeader server={server} role={role} />
      <section className='w-full bg-blue-100 dark:bg-secondary h-[2px]' />
    </div>
  );
}
