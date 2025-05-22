// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import MsalProviderWrapper from './auth/MsalProviderWrapper'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MsalProviderWrapper />
  </React.StrictMode>,
)
