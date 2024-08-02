import MyServer from './my-server';
import { ModeToggle } from './mode-toggle';
import OpenAddServerDialog from './open-add-server-dialog';
import { AvatarPhoto } from './avatar-photo';
import { getCurrentProfile } from '@/actions/profile.action';
import { Profile, Server } from '@prisma/client';
import { findMyServers } from '@/actions/server.action';

type NavSidebarProps = {
  user: string;
};

export default async function NavSidebar({ user }: NavSidebarProps) {
  const currentProfile = (await getCurrentProfile(user)) as Profile;

  if (!currentProfile) {
    return null;
  }

  const myServers = (await findMyServers(user, currentProfile.id)) as Server[];

  return (
    <aside className='md:top-0 md:sticky bg-blue-100 dark:bg-secondary h-screen w-[76px] py-2.5'>
      <nav className='space-y-2 h-[calc(100vh-210px)] mb-2.5'>
        {myServers.map(({ id, name, imageUrl }) => (
          <MyServer key={id} id={id} name={name} imageUrl={imageUrl} />
        ))}
      </nav>

      <div className='flex flex-col items-center gap-2'>
        <OpenAddServerDialog />

        <AvatarPhoto
          src={currentProfile.imageUrl}
          alt={currentProfile.username}
          className='size-[52px]'
        />

        <ModeToggle />
      </div>
    </aside>
  );
}
