import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Menu from './Menu';
import CreateUser from "./CreateUser";
import AdminPanel from './AdminPanel';
import ShowUser from './ShowUser';

import { Route,RouterProvider,createBrowserRouter } from 'react-router-dom';
import Manageuser from './Manageuser';

const route = createBrowserRouter([
  {
    path:"/manageuser",
    element:<Manageuser/>,
  },
  {
    path:"/",
    element:<CreateUser/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  
    <RouterProvider router={route}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();