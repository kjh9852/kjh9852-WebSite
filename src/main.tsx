import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createRoot } from 'react-dom/client';

import './index.scss';

import App from './App.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const asyncPersister = createAsyncStoragePersister({
  storage: localStorage,
});

createRoot(document.getElementById('root')!).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister: asyncPersister,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => {
          return (
            query.queryKey[0] === 'currentUser' &&
            query.state.status === 'success' &&
            query.state.data !== null
          );
        },
      },
    }}
  >
    <App />
  </PersistQueryClientProvider>
);
