'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

import { ChatContextProvider } from '@/contexts/ChatContext';
type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChatContextProvider>{children}</ChatContextProvider>
    </QueryClientProvider>
  );
};

export default Provider;
