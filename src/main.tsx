import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import { StickersProvider } from './contexts/StickersContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StickersProvider>
      <App />
    </StickersProvider>
  </StrictMode>,
)
