
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import router from './router';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        defaultNotFoundComponent={() => <div>404: Page Not Found</div>}
        defaultErrorComponent={({ error }) => (
          <div style={{ color: 'red' }}>
            <h2>Router Error</h2>
            <pre>{error.message}</pre>
          </div>
        )}
      />
    </QueryClientProvider>
  </React.StrictMode>
);
