import MyServer from './my-server';
import { ModeToggle } from './mode-toggle';
import OpenAddServerDialog from './open-add-server-dialog';
import { getCurrentProfile, getSession } from '@/actions/profile.action';
import { Profile, Server } from '@prisma/client';
import { findMyServers } from '@/actions/server.action';
import UserButton from './buttons/user-button';

export default async function NavSidebar() {
  const currentProfile = (await getCurrentProfile()) as Profile;
  const session = await getSession();

  if (!currentProfile) {
    throw new Error('Profile not found');
  }

  const { id, username, imageUrl } = currentProfile;
  const myServers = (await findMyServers(id)) as Server[];

  return (
    <aside className='md:top-0 md:sticky bg-blue-100 dark:bg-secondary h-screen w-[76px] py-2.5'>
      <nav className='space-y-2 h-[calc(100vh-210px)] mb-2.5'>
        {myServers.map(({ id, name, imageUrl }) => (
          <MyServer key={id} id={id} name={name} imageUrl={imageUrl} />
        ))}
      </nav>

      <div className='flex flex-col items-center gap-2'>
        <OpenAddServerDialog />

        <UserButton username={username} imageUrl={imageUrl} session={session} />

        <ModeToggle />
      </div>
    </aside>
  );
}
