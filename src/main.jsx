import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SettingsProvider } from './store/SettingsContext'
import { ProgressProvider } from './store/ProgressContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <ProgressProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProgressProvider>
    </SettingsProvider>
  </StrictMode>,
)
