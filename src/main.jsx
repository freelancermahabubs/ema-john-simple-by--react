import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./components/LayOut/Home";
import Shop from "./components/Shop/Shop";
import Orders from "./components/Orders/Orders";
import cartProductsLoader from "./loaders/cartProductsLoader";
import CheckOut from "./components/CheckOut/CheckOut";
import Inventory from "./components/Inventory/Inventory";
import Login from "./components/Login/Login";
import SingUp from "./components/SingUp/SingUp";
import AuthProvider from "./components/providers/AuthProvider";
import PrivateRoutes from "./routes/PrivateRoutes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Shop />,
        loader: () => fetch("http://localhost:5000/totalProducts"),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <CheckOut />
          </PrivateRoutes>
        ),
      },
      {
        path: "/order",
        element: <Orders />,
        loader: cartProductsLoader,
      },
      {
        path: "/inventory",
        element: (
          <PrivateRoutes>
            <Inventory />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/singup",
        element: <SingUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
