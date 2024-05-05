import ChannelSidebar from '@/components/server/channel-sidebar';

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
      <ChannelSidebar serverId={params.serverId} />
      {children}
    </div>
  );
}
