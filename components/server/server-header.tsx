import { Hash, UsersRound } from 'lucide-react';
import MobileToggle from '../mobile-toggle';

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
}: ServerHeaderProps) {
  return (
    <header className='w-[calc(100vw-316px)] flex gap-3 px-4 py-3 text-sm font-semibold items-center'>
      <MobileToggle serverId={serverId} />
      {type === 'members' ? (
        <UsersRound size={20} strokeWidth={2.25} />
      ) : type === 'channel' ? (
        <Hash size={20} strokeWidth={2.25} />
      ) : null}
      {name}
    </header>
  );
}
