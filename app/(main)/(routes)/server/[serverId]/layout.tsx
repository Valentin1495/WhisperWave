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
      <section className='hidden md:block'>
        <ServerSidebar serverId={params.serverId} />
      </section>
      <div className='w-[calc(100vw-316px)]'>{children}</div>
    </div>
  );
}
