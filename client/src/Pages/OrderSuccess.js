import React, {useEffect} from "react";
import {Link, useParams, Navigate} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux';
import {resetCartAsync} from "../features/Cart/cartSlice";
import {resetOrder} from "../features/order/orderSlice"
import Navbar from '../features/Navbar/Navbar';


const OrderSuccessfull = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    //erase the current order
    dispatch(resetOrder());
    //empty the cart
    dispatch(resetCartAsync());;
}, [dispatch])
    return (
      <Navbar>  
      {!params.id && <Navigate to="/" replace={true}/>}
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Your order has been placed successfull</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Order id: {params.id}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</Link>
            <Link to="/user-order" className="text-sm font-semibold text-gray-900">Go to Order history Page for details<span aria-hidden="true">&rarr;</span></Link>
          </div>
        </div>
        </main>
      </Navbar>
    )
}
export default OrderSuccessfull