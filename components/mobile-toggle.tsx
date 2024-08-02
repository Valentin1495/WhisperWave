import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import ServerSidebar from './server/server-sidebar';
import NavSidebar from './nav-sidebar';

type MobileToggleProps = {
  username: string;
  serverId: string;
};

export default function MobileToggle({
  username,
  serverId,
}: MobileToggleProps) {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden bg-primary p-1.5 rounded-full text-secondary'>
        <Menu size={16} strokeWidth={2.25} />
      </SheetTrigger>
      <SheetContent side='left' className='flex p-0 gap-0 w-[315px]'>
        <NavSidebar user={username} />
        <ServerSidebar user={username} serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
}
