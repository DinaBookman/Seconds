import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductUploadForm from './components/ProductUploadForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProductUploadForm/>
    </>
  )
}

export default App
