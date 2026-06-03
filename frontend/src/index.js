import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import HomePage from "./HomePage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true, //This is the default child route. It will be rendered when the parent route is matched and no other child routes are matched.
        element: <HomePage />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
reportWebVitals();