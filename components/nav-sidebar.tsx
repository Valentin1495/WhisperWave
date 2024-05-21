import { findMyServers } from '@/actions/server.action';
import MyServer from './my-server';
import { ModeToggle } from './mode-toggle';
import { UserButton } from '@clerk/nextjs';
import OpenAddServerDialog from './open-add-server-dialog';

export default async function NavSidebar() {
  const myServers = await findMyServers();

  return (
    <nav className='md:sticky md:top-0 bg-blue-100 dark:bg-secondary h-screen w-[76px] py-2.5'>
      <div className='space-y-2 h-[calc(100vh-210px)] mb-2.5'>
        {myServers.map(({ id, name, imageUrl }) => (
          <MyServer key={id} id={id} name={name} imageUrl={imageUrl} />
        ))}
      </div>

      <div className='flex flex-col items-center gap-2'>
        <OpenAddServerDialog />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: 'size-[52px]',
            },
          }}
        />
        <ModeToggle />
      </div>
    </nav>
  );
}
