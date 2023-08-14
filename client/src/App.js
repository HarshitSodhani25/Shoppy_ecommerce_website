import React, {useEffect} from 'react';
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Cart from "./Pages/Cart"
import Checkout from "./Pages/Checkout"
import ProductDetail from "./Pages/Product-Detail"
import Protected from './features/Auth/Protected';
import { createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import Logout from "./features/Auth/Logout";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage"
import {useSelector, useDispatch} from "react-redux";
import {fetchItemsByUserIdAsync} from "./features/Cart/cartSlice"
import PageNotFound from './Pages/PageNotFound';
import OrderSuccess from "./Pages/OrderSuccess";
import {checkAuthAsync, selectLoginCredential} from "./features/Auth/authSlice"
import UserProfilePage from "./Pages/UserProfilePage"
import UserOrderPage from "./Pages/UserOrderPage";
import { fetchLoggedInUserAsync } from './features/User/userSlice';
import AdminProductdetailPage from './Pages/AdminProductdetailPage';
import AdminProductlistPage from './Pages/AdminProductlistPage';
import ProtectedAdmin from "./features/Auth/ProtectedAdmin";
import AdminFormPage from "./Pages/AdminFormPage";
import AdminOrderPage from "./Pages/AdminOrderPage";
import StripeCheckout from './Pages/PaymentGateway/StripeCheckout';


const router = createBrowserRouter([
    {path: "/", element: <Protected><Home/></Protected> },
    {path: "/home", element: <Protected><Home/></Protected> },
    {path: "/login", element: <Login/>},
    {path: "/forgot-password", element: <ForgotPasswordPage/>},
    {path: "/signup", element: <Signup/>},
    {path: "/sign-out", element: <Protected><Logout/></Protected>},
    {path: "/cart", element: <Protected><Cart/></Protected>},
    {path: "/checkout", element: <Protected><Checkout/></Protected>},
    {path: "/product-detail/:id", element: <Protected><ProductDetail/></Protected>},
    {path: "/order/:id", element: <Protected><OrderSuccess/></Protected>},
    {path: "/user", element: <Protected><UserProfilePage/></Protected>},
    {path: "/user-order", element: <Protected><UserOrderPage/></Protected>},
    {path: "/stripe-checkout", element: <Protected><StripeCheckout/></Protected>},

    {path: "/admin", element: <ProtectedAdmin><AdminProductlistPage/></ProtectedAdmin>},
    {path: "/admin/product-detail/:id", element: <ProtectedAdmin><AdminProductdetailPage/></ProtectedAdmin>},
    {path: "/admin/add-product", element:<ProtectedAdmin><AdminFormPage/></ProtectedAdmin>},
    {path: "/admin/edit-product/:id", element:<ProtectedAdmin><AdminFormPage/></ProtectedAdmin>},
    {path: "/admin/order", element:<ProtectedAdmin><AdminOrderPage/></ProtectedAdmin>},

    {path: "/*", element: <Protected><PageNotFound/></Protected>},
])




const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoginCredential);

  useEffect(()=>{
    dispatch(checkAuthAsync());
  }, [dispatch])

  useEffect(()=>{
    if(user){
      dispatch(fetchLoggedInUserAsync());
      //now, we don't need the user.id as it is already present in the backend
      dispatch(fetchItemsByUserIdAsync());
    }
 }, [dispatch, user])
  
  return(
    <>
      <RouterProvider router={router}/>

    </>
  )
}

export default App;
