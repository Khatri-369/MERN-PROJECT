import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Toaster } from "react-hot-toast";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import Body from "./components/Body/Body.jsx";
import HomePage from "./HomePage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
    <Toaster position="top-right" reverseOrder={false} />
  </React.StrictMode>
);
reportWebVitals();