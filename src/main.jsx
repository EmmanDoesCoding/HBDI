import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Birthday from './Birthday.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Birthday />
  </StrictMode>,
)
