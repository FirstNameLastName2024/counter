import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Counter from './counter/counter.jsx'
import "./main.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Counter />
  </StrictMode>,
)
