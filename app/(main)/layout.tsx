import NavSidebar from '@/components/nav-sidebar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex items-start'>
      <NavSidebar />
      {children}
    </div>
  );
}
