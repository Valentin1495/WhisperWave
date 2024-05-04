import { findMyServers } from '@/actions/server.action';
import MyServer from './my-server';
import AddServerDialog from './dialogs/add-server-dialog';
import { ModeToggle } from './mode-toggle';
import { UserButton } from '@clerk/nextjs';

export default async function NavSidebar() {
  const myServers = await findMyServers();

  return (
    <nav className='sticky top-0 bg-blue-50 dark:bg-secondary h-screen w-16 py-2.5'>
      <div className='space-y-2 h-[calc(100vh-186px)] mb-2.5'>
        {myServers.map(({ id, name, imageUrl }) => (
          <MyServer key={id} id={id} name={name} imageUrl={imageUrl} />
        ))}
      </div>

      <div className='flex flex-col items-center gap-2'>
        <AddServerDialog />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: 'size-11',
            },
          }}
        />
        <ModeToggle />
      </div>
    </nav>
  );
}
