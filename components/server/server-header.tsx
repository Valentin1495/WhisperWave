import { Hash, UsersRound } from 'lucide-react';
import MobileToggle from '../mobile-toggle';
import { AvatarPhoto } from '../avatar-photo';
import SocketIndicator from '../socket-indicator';

type ServerHeaderProps = {
  serverId: string;
  name: string;
  type: 'channel' | 'conversation' | 'members';
  imageUrl?: string;
};

export default function ServerHeader({
  name,
  type,
  serverId,
  imageUrl,
}: ServerHeaderProps) {
  return (
    <header className='md:w-[calc(100vw-316px)] flex gap-3 px-4 py-3 text-sm font-semibold items-center bg-blue-100 dark:bg-secondary'>
      <MobileToggle serverId={serverId} />

      {type === 'members' ? (
        <UsersRound size={20} strokeWidth={2.25} />
      ) : type === 'channel' ? (
        <Hash size={20} strokeWidth={2.25} />
      ) : (
        <AvatarPhoto src={imageUrl!} alt={name} className='size-10' />
      )}
      {name}

      <div className='ml-auto'>
        <SocketIndicator />
      </div>
    </header>
  );
}
