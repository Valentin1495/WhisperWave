import NavSidebar from '@/components/nav-sidebar';
import ServerSidebar from '@/components/server/server-sidebar';

export default async function ServerLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    serverId: string;
    username: string;
  };
}>) {
  return (
    <div className='flex items-start'>
      <div className='sidebar'>
        <NavSidebar user={params.username} />
      </div>
      <div className='sidebar'>
        <ServerSidebar serverId={params.serverId} user={params.username} />
      </div>
      <div className='w-screen md:w-[calc(100vw-316px)]'>{children}</div>
    </div>
  );
}
