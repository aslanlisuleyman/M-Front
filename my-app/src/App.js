import "./App.css";
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Routes from './routes/Routes'
import { getData } from './redux/slices/dataSlice'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const router=createBrowserRouter(Routes)

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getData())
  },[])


  return <>  
  <RouterProvider router={router}/>
    
  
   
 
  
  
  
  
  </>
  
  
 
}

export default App;
