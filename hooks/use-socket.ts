import {
  SocketContext,
  SocketContextType,
} from '@/components/providers/socket-provider';
import { useContext } from 'react';

export function useSocket(): SocketContextType {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
