import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { BASE_URL } from '@/constants/envs';

let socket: Socket | null = null;

type UseSocketQueryProps<TData> = {
  queryKey: unknown[];
  queryFn: () => Promise<TData>;
  socketEvent: string;
  socketJoinEvent?: string;
  socketLeaveEvent?: string;
  joinPayload?: Record<string, unknown>;
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>;
};

export const useSocketQuery = <TData>({
  queryKey,
  queryFn,
  socketEvent,
  socketJoinEvent,
  socketLeaveEvent,
  joinPayload,
  options,
}: UseSocketQueryProps<TData>) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey,
    queryFn,
    ...options,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  useEffect(() => {
    if (!socket) {
      socket = io(BASE_URL, { transports: ['websocket'] });
    }

    if (socketJoinEvent) {
      socket.emit(socketJoinEvent, joinPayload);
    }

    socket.on(socketEvent, (data: TData) => {
      queryClient.setQueryData(queryKey, data);
    });

    return () => {
      socket?.off(socketEvent);
      if (socketLeaveEvent) {
        socket?.emit(socketLeaveEvent);
      }
    };
  }, [
    socketEvent,
    socketJoinEvent,
    socketLeaveEvent,
    queryClient,
    queryKey,
    joinPayload,
  ]);

  return query;
};
