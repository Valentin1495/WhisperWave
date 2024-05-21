import { getCurrentProfile } from '@/actions/profile.action';
import { findServer } from '@/actions/server.action';
import { ServerWithMembers } from '@/types';
import ServerSidebarHeader from './server-sidebar-header';
import MembersLink from './members-link';
import Channel from '../channel/channel';

type ServerSidebarProps = {
  serverId: string;
};

export default async function ServerSidebar({ serverId }: ServerSidebarProps) {
  const currentProfile = await getCurrentProfile();
  const server = (await findServer(serverId)) as ServerWithMembers;
  const role = server.members.find(
    (member) => member.profileId === currentProfile?.id
  )?.role;

  return (
    <aside className='md:sticky md:top-0 bg-blue-50 dark:bg-secondary/50 h-screen w-60'>
      <ServerSidebarHeader server={server} role={role} />
      <section className='w-full bg-blue-100 dark:bg-secondary h-[2px]' />
      <MembersLink serverId={serverId} />
      <h3 className='mt-3 text-sm px-3 mb-2'>CHANNELS</h3>
      <div className='space-y-1'>
        {!!server.channels.length &&
          server.channels.map((channel) => (
            <Channel
              key={channel.id}
              {...channel}
              role={role}
              server={server}
            />
          ))}
      </div>
    </aside>
  );
}
