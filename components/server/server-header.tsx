import { Hash, UsersRound } from 'lucide-react';

type ServerHeaderProps = {
  name: string;
  type: string;
};

export default function ServerHeader({ name, type }: ServerHeaderProps) {
  return (
    <header className='w-[calc(100vw-316px)] flex gap-3 px-4 py-3 text-sm font-semibold items-center'>
      {type === 'members' ? (
        <UsersRound size={20} strokeWidth={2.25} />
      ) : (
        <Hash />
      )}
      {name}
    </header>
  );
}
