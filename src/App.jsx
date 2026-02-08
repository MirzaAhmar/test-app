import './App.css'
import { RouterProvider } from 'react-router'
import { Routers } from './Routers'
import { CounterProvider } from './utils/CounterContext'

function App() {

  return (
    <>
      <CounterProvider>
        <RouterProvider router={Routers} />
      </CounterProvider>
    </>
  )
}

export default App
