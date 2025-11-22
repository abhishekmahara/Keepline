
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Lines from './components/Lines'
import Navbar from './components/Navbar'
import ViewLines from './components/ViewLines'

const router = createBrowserRouter([
  {
    path:"/",
    element: <div>
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path:"/lines",
    element: <div>
      <Navbar/>
      <Lines/>
    </div>
  },
  {
    path:"/lines/:id",
    element: <div>
      <Navbar/>
      <ViewLines/>
    </div>
  },
])

function App() {


  return (
    <>
   <RouterProvider router={router}/>
   
    </>
  )
}

export default App
