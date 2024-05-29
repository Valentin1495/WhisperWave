import { SocketContext } from '@/components/providers/socket-provider';
import { useContext } from 'react';

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
