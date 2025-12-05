import { useState } from 'react'
import './App.css'

import { Home } from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  // Get the backend URL environment variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <>
      <h1>Grey Matter Technical Assignment</h1>
      <Home backendUrl={backendUrl} />
    </>
  )
}

export default App
