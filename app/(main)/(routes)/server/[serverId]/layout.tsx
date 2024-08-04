import NavSidebar from '@/components/nav-sidebar';
import ServerSidebar from '@/components/server/server-sidebar';

export default async function ServerLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}>) {
  return (
    <div className='flex items-start'>
      <div className='sidebar'>
        <NavSidebar />
      </div>
      <div className='sidebar'>
        <ServerSidebar serverId={params.serverId} />
      </div>
      <div className='w-screen md:w-[calc(100vw-316px)]'>{children}</div>
    </div>
  );
}
