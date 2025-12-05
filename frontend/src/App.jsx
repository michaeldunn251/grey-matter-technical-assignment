import { use, useState } from 'react'
import './App.css'

import { Home } from './pages/Home'

function App() {
  // Save the recently searched URLs in a useState array
  const [recentlySearched, setRecentlySearched] = useState([]);

  // Save the recently recieved results in an array for display within the table
  const [recentResults, setRecentResults] = useState([]);

  // Get the backend URL environment variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <>
      <Home 
        backendUrl={backendUrl} 
        recentlySearched={recentlySearched} 
        setRecentlySearched={setRecentlySearched} 
        recentResults={recentResults}
        setRecentResults={setRecentResults}
      />
    </>
  )
}

export default App
