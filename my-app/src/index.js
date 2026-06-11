import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import "./css/index.css";
import "./i18n";

import axios from "axios";

import Menu from './Menu';

// USER
import CreateUser from "./CreateUser";
import ManageUser from './ManageUser';
import EditUser from './EditUser';
import SearchUser from './SearchUser';
import ShowUser from './ShowUser';

// PRODUCT
import CreateProduct from './CreateProduct';
import ManageProduct from './ManageProduct';
import EditProduct from './EditProduct';
import ShowProduct from './ShowProduct';
import SearchProduct from './SearchProduct';

// ADMIN
import CreateAdmin from './CreateAdmin';
import ManageAdmin from './ManageAdmin';
import EditAdmin from './EditAdmin';
import ShowAdmin from './ShowAdmin';
import SearchAdmin from './SearchAdmin';
import SignUpAdmin from './SignUpAdmin';
import AdminLogin from './AdminLogin';
import AdminProfile from './AdminProfile';

// CART
import CreateCart from './CreateCart';
import ShowCart from './ShowCart';
import EditCart from './EditCart';
import CartDetail from './CartDetail';
import ManageCart from "./ManageCart";
import SearchCart from "./SearchCart";

// VENDOR
import CreateVendor from './CreateVendor';
import ShowVendor from './ShowVendor';
import ManageVendor from './ManageVendor';
import UpdateVendor from './UpdateVendor';
import SearchVendor from './SearchVendor';
import ShowVendorById from './ShowVendorById';

// ORDER
import CreateOrder from './CreateOrder';
import ShowOrder from './ShowOrder';
import ManageOrder from './ManageOrder';
import UpdateOrder from './UpdateOrder';
import SearchOrder from './SearchOrder';

// CATEGORY
import CreateCategory from './CreateCategory';
import ManageCategory from './ManageCategory';
import EditCategory from './EditCategory';
import ShowCategory from './ShowCategory';
import SearchCategory from './SearchCategory';

//STATUS PAGES
import StatusUser from './StatusUser';
import StatusAdmin from './StatusAdmin';

//USER LOGIN & SIGNUP PAGES
import UserLogin from './UserLogin';
import SignUpUser from './SignUpUser';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import VerifyOTP from './VerifyOTP';

//USER PANEL
import UserLayout from './layouts/Userlayout';

//DEFAULT CREDENTIAL IS TRUE
axios.defaults.withCredentials = true;

const route = createBrowserRouter([
  {
    path: "/",
    element: <AdminLogin />
  },
  {
    path: "/adminpanel",
    element: <Menu />,
    children: [

      // ================= USER ROUTES =================
      {
        path: "createuser",
        element: <CreateUser />
      },
      {
        path: "manageuser",
        element: <ManageUser />
      },
      {
        path: "showuser",
        element: <ShowUser />
      },
      {
        path: "edituser/:id",
        element: <EditUser />
      },
      {
        path: "searchuser",
        element: <SearchUser />
      },
      // ================= PRODUCT ROUTES =================
      {
        path: "createproduct",
        element: <CreateProduct />
      },
      {
        path: "manageproduct",
        element: <ManageProduct />
      },
      {
        path: "editproduct/:id",
        element: <EditProduct />
      },
      {
        path: "showproduct",
        element: <ShowProduct />
      },
      {
        path: "searchproduct",
        element: <SearchProduct />
      },

      // ================= ADMIN ROUTES =================
      {
        path: "createadmin",
        element: <CreateAdmin />
      },
      {
        path: "manageadmin",
        element: <ManageAdmin />
      },
      {
        path: "showadmin",
        element: <ShowAdmin />
      },
      {
        path: "editadmin/:id",
        element: <EditAdmin />
      },
      {
        path: "searchadmin",
        element: <SearchAdmin />
      },
      {
        path: "adminprofile/:id",
        element: <AdminProfile />
      },

      // ================= CART ROUTES =================
      {
        path: "createcart",
        element: <CreateCart />
      },
      {
        path: "showcart",
        element: <ShowCart />
      },
      {
        path: "editcart/:id",
        element: <EditCart />
      },
      {
        path: "cartdetail/:id",
        element: <CartDetail />
      },
      {
        path: "managecart",
        element: <ManageCart />
      },
      {
        path: "searchcart",
        element: <SearchCart />
      },

      // ================= VENDOR ROUTES =================
      {
        path: "createvendor",
        element: <CreateVendor />
      },
      {
        path: "showvendor",
        element: <ShowVendor />
      },
      {
        path: "managevendor",
        element: <ManageVendor />
      },
      {
        path: "updatevendor/:id",
        element: <UpdateVendor />
      },
      {
        path: "searchvendor",
        element: <SearchVendor />
      },
      {
        path: "showvendorbyid/:id",
        element: <ShowVendorById />
      },

      // ================= ORDER ROUTES =================
      {
        path: "createorder",
        element: <CreateOrder />
      },
      {
        path: "showorder",
        element: <ShowOrder />
      },
      {
        path: "manageorder",
        element: <ManageOrder />
      },
      {
        path: "updateorder/:id",
        element: <UpdateOrder />
      },
      {
        path: "searchorder",
        element: <SearchOrder />
      },

      // ================= CATEGORY ROUTES =================
      {
        path: "createcategory",
        element: <CreateCategory />
      },
      {
        path: "managecategory",
        element: <ManageCategory />
      },
      {
        path: "showcategory",
        element: <ShowCategory />
      },
      {
        path: "editcategory/:id",
        element: <EditCategory />
      },
      {
        path: "searchcategory",
        element: <SearchCategory />
      },

      // ================= STATUS PAGES =================
      {
        path: "statususer",
        element: <StatusUser />
      },
      {
        path: "statusadmin",
        element: <StatusAdmin />
      },
    ]
  },
  // ================= SIGNUP PAGES =================
  {
    path: "signupadmin",
    element: <SignUpAdmin />
  },
  {
    path: "loginadmin",
    element: <AdminLogin />
  },
  {
    path: "forgotpassword",
    element: <ForgotPassword />
  },
  {//IMPORT KARVU
    path: "verifyotp",
    element: <VerifyOTP />
  },
  {
    path: "forgotpassword",
    element: <ForgotPassword />
  },
  {
    path: "resetpassword",
    element: <ResetPassword />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
    <Toaster position="top-right" reverseOrder={false} />
  </React.StrictMode>
);

reportWebVitals();