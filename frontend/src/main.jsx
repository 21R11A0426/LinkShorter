import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // 1. Import

// 2. Create a Client
const queryClient = new QueryClient();

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
      <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  </QueryClientProvider>
)
