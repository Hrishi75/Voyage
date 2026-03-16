'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#2D2D2D',
            color: '#FAF7F2',
            fontFamily: 'Inter, sans-serif',
          },
        }}
      />
    </SessionProvider>
  );
}
