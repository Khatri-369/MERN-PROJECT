import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Toaster } from "react-hot-toast";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import { ShowCart } from "./layouts/ShowCart.jsx";

import Body from "./components/Body/Body.jsx";
import HomePage from "./HomePage";

//SIGN UP AND LOGIN
import SignUpUser from './SignUpUser.jsx';
import UserLogin from './UserLogin.jsx';

import axios from "axios";
axios.defaults.withCredentials = true;

const route = createBrowserRouter([
  {
    path: "/homepage",
    element: <UserLayout />,
  },
  {
    path :  "/signupuser",
    element : <SignUpUser/>
  },
  {
    path :  "/loginuser",
    element : <UserLogin/>
  },
  {
    path: "/showcart",
    element: <ShowCart />,
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