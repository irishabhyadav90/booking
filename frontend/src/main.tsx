import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppContextProvider } from './context/AppContext.js';
import App from './App.js'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
       <App/>
     </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
