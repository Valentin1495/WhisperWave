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
      <ServerSidebar serverId={params.serverId} />
      <div className='w-[calc(100vw-316px)]'>{children}</div>
    </div>
  );
}
