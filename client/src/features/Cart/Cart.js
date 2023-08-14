import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCartAsync, selectItems, updateCartAsync } from './cartSlice';
import {Link} from "react-router-dom"
import { fetchItemsByUserIdAsync } from './cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItems);
  const totalSum = items.reduce((amount, item)=> item.product.price*item.quantity + amount, 0)
  const totalQuantity = items.reduce((count, item)=> item.quantity+count, 0)

  useEffect(()=>{
    dispatch(fetchItemsByUserIdAsync())
  }, [dispatch, selectItems])
  
  const handleQuantity = (e, item) => {
      dispatch(updateCartAsync({id: item.id, user: item.user, product: item.product.id, quantity: +e.target.value}))
    }

    const handleRemove = (e, id) => {
      dispatch(deleteItemFromCartAsync(id));
    }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className={"text-2xl font-semibold mt-12 text-center"}> Cart </h1>
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
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
                      <p className="text-gray-500 " >Qty: 
                        <select className="m-2 text-xs" onChange={(e)=>{handleQuantity(e, item)}} value={item.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                      </p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={e=>handleRemove(e, item.id)}
                        >
                          Remove
                        </button>
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
            <p>${totalSum}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalQuantity}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or &nbsp;
              <Link to="/home">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>

  );
}
