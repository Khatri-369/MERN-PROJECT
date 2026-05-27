import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

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

// ORDER
import CreateOrder from './CreateOrder';
import ShowOrder from './ShowOrder';
import ManageOrder from './ManageOrder';
import UpdateOrder from './UpdateOrder';
import SearchOrder from './SearchOrder';

const route = createBrowserRouter([
  {
    path: "/",
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