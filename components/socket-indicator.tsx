'use client';

import { useSocketContext } from '@/lib/hooks/use-socket-context';
import { Badge } from './ui/badge';

export default function SocketIndicator() {
  const { isConnected } = useSocketContext();

  if (isConnected)
    return (
      <Badge
        variant='outline'
        className='bg-emerald-500 text-secondary border-none'
      >
        Live: Real-time updates
      </Badge>
    );

  return (
    <Badge
      variant='outline'
      className='bg-yellow-600 text-secondary border-none'
    >
      Fallback: Polling every 1s
    </Badge>
  );
}
