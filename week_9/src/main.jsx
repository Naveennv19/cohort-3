import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import cnt from './count.jsx'


createRoot(document.getElementById('root')).render(

    <App />,
    <cnt />
)
