import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AppContextProvider } from './AppContext'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </QueryClientProvider>
);