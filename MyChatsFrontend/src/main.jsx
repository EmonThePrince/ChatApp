import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signin from './components/Signin.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'login',
        element:<Login />
      },
      {
        path:'signin',
        element:<Signin />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ThemeProvider>

    <RouterProvider router={router} />
  </ThemeProvider>
  </React.StrictMode>
)

