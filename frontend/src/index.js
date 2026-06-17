import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Toaster } from "react-hot-toast";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import { ShowCart } from "./layouts/ShowCart.jsx";

//SIGN UP AND LOGIN
import SignUpUser from './SignUpUser.jsx';
import UserLogin from './UserLogin.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import VerifyOTP from './VerifyOTP.jsx';
import ResetPassword from './ResetPassword.jsx';

//PROFILE PAGE
import UserProfile from './components/profile/UserProfile.jsx';

import axios from "axios";
axios.defaults.withCredentials = true;

const route = createBrowserRouter([
  {
    path: "/",
    element: <UserLogin />
  },
  {
    path: "/homepage",
    element: <UserLayout />,
  },
  {
    path: "/signupuser",
    element: <SignUpUser />
  },
  {
    path: "/loginuser",
    element: <UserLogin />
  },
  {
    path: "/showcart",
    element: <ShowCart />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />
  },
  {
    path: "/verifyotp",
    element: <VerifyOTP />
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />
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