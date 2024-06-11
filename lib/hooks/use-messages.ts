import { socket } from '@/socket';
import { EditedMessage, MemberWithProfile, MessageWithMember } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSocketContext } from './use-socket-context';

const fetchMessages = async (
  channelId: string
): Promise<MessageWithMember[]> => {
  const response = await fetch(`/api/chat?channel=${channelId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const messages = await response.json();
  return messages;
};

export const useMessages = (channelId: string, member?: MemberWithProfile) => {
  const { isConnected } = useSocketContext();

  const queryClient = useQueryClient();
  const {
    data: messages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => fetchMessages(channelId),
    refetchInterval: isConnected ? false : 1000,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      });

      const newMessage = await response.json();
      return newMessage;
    },
    onMutate: async (newMessage: FormData) => {
      await queryClient.cancelQueries({ queryKey: ['messages', channelId] });

      const previousMessages = queryClient.getQueryData([
        'messages',
        channelId,
      ]);

      if (previousMessages) {
        queryClient.setQueryData(
          ['messages', channelId],
          (old: MessageWithMember[]) => {
            if (old) {
              const newMessageData: Partial<MessageWithMember> = {
                content: newMessage.get('newMessage') as string,
                fileUrl: newMessage.get('file')
                  ? URL.createObjectURL(newMessage.get('file') as File)
                  : null,
                createdAt: new Date(),
                updatedAt: new Date(),
                member,
              };

              return [...old, newMessageData];
            }
            return old;
          }
        );
      }

      return { previousMessages };
    },
    onError: (err, newMessage, context) => {
      if (context) {
        queryClient.setQueryData(
          ['messages', channelId],
          context.previousMessages
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', channelId] });
    },
  });

  const editMessageMutation = useMutation({
    mutationFn: async ({
      messageId,
      channelId,
      editedContent,
    }: EditedMessage) => {
      const response = await fetch('/api/chat', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageId, channelId, editedContent }),
      });

      const editedMessage = await response.json();
      return editedMessage;
    },
    onMutate: async ({ messageId, editedContent }) => {
      await queryClient.cancelQueries({ queryKey: ['messages', channelId] });

      const previousMessages = queryClient.getQueryData([
        'messages',
        channelId,
      ]);

      if (previousMessages) {
        queryClient.setQueryData(
          ['messages', channelId],
          (old: MessageWithMember[]) => {
            if (old) {
              return old.map((message) =>
                message.id === messageId
                  ? { ...message, content: editedContent }
                  : message
              );
            }
            return old;
          }
        );
      }

      return { previousMessages };
    },
    onError: (err, newMessage, context) => {
      if (context) {
        queryClient.setQueryData(
          ['messages', channelId],
          context.previousMessages
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', channelId] });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: string) => {
      const response = await fetch(`/api/chat?id=${messageId}`, {
        method: 'DELETE',
      });

      return await response.json();
    },
    onMutate: async (messageId: string) => {
      await queryClient.cancelQueries({ queryKey: ['messages', channelId] });

      const previousMessages = queryClient.getQueryData([
        'messages',
        channelId,
      ]);

      if (previousMessages) {
        queryClient.setQueryData(
          ['messages', channelId],
          (old: MessageWithMember[]) => {
            if (old) {
              return old.filter((message) => message.id !== messageId);
            }
            return old;
          }
        );
      }

      return { previousMessages };
    },
    onError: (err, newMessage, context) => {
      if (context) {
        queryClient.setQueryData(
          ['messages', channelId],
          context.previousMessages
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', channelId] });
    },
  });

  useEffect(() => {
    if (socket) {
      socket.on(`chat:${channelId}`, (newMessage: MessageWithMember) => {
        queryClient.setQueryData(
          ['messages', channelId],
          (old: MessageWithMember[]) =>
            old ? [...old, newMessage] : [newMessage]
        );
      });
    }
  }, [queryClient, channelId]);

  return {
    messages,
    isLoading,
    error,
    sendMessageMutation,
    editMessageMutation,
    deleteMessageMutation,
  };
};
