import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMessages } from '../utils';
import { useSocketContext } from './use-socket-context';

export const useMessagesQuery = (channelId: string) => {
  const { isConnected } = useSocketContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => fetchMessages(channelId),
    refetchInterval: isConnected ? false : 1000,
  });
  const queryClient = useQueryClient();

  return { data, isLoading, error, queryClient };
};
