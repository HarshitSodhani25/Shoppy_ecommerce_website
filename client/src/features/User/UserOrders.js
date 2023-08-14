import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchOrdersAsync, selectOrders } from './userSlice';



export default function Login() {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrdersAsync())
  }, []);
  
  return (
    <>
      {orders.map((order => (
        <div className="border-2 border-dotted border-red-500 m-2" key={order.id} >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between">
              <h1 className={"text-2xl font-semibold mt-12 "}> Order - {order.id} </h1>
              <h4 className="text-lg mt-12 font-bold text-red-600">Order Status: {order.status}</h4>
            </div>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to={`/product-detail/${item.product.id}`}>{item.product.title}</Link>
                            </h3>
                            <p className="ml-4">{item.product.price}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500 " >Qty: {item.quantity}
                          </p>
                          <div className="flex">
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$ {order.totalSum}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{order.totalQuantity}</p>
              </div>
            </div>
            <div className="flex justify-between gap-x-6 py-5 px-3 m-2 ">
              <h2 className="text-xl text-gray-900 font-medium">Shipping Address: </h2>
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{order.address.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-900 font-semibold">{order.address.phoneNumber}</p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{order.address.streetAddress}</p>
                <p className="text-sm leading-6 text-gray-900">{order.address.postalCode}</p>
                <p className="text-sm leading-6 text-gray-900">{order.address.city}, {order.address.state}</p>
                {/* <p className="text-sm leading-6 text-gray-900">{address.state}</p> */}
              </div>
            </div>
          </div>
        </div>
      )))}
    </>
  )
}
