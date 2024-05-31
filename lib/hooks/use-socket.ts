import { useEffect } from 'react';
import io from 'socket.io-client';

export const useSocket = () => {
  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      /// ...
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};
