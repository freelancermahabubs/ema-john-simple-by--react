import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Home from './components/LayOut/Home';
import Shop from './components/Shop/Shop';
import Orders from './components/Orders/Orders';
import cartProductsLoader from './loaders/cartProductsLoader';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [{
      path: '/',
      element: <Shop/>,
    },
    {
      path: 'order',
      element: <Orders/>,
      loader: cartProductsLoader,
    }
  ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
