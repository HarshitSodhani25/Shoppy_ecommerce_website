import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCartAsync, selectItems, updateCartAsync } from '../features/Cart/cartSlice';
import {useForm} from "react-hook-form"
import { addOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { updateUserAsync, selectUser } from '../features/User/userSlice';
import Navbar from '../features/Navbar/Navbar';


const Checkout = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm()
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const items = useSelector(selectItems);
    const totalSum = items.reduce((amount, item)=> item.product.price*item.quantity + amount, 0);
    const totalQuantity = items.reduce((count, item)=> item.quantity+count, 0);
    const user = useSelector(selectUser);
    const currentOrder = useSelector(selectCurrentOrder);

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [payment, setPayment] = useState("cash");
    
    

    const handleQuantity = (e, item) => {
        const newItem = {id: item.id, user: user.id, product: item.product.id, quantity: +e.target.value};
        dispatch(updateCartAsync(newItem))
    }

    const handleRemove = (e, id) => {
        dispatch(deleteItemFromCartAsync(id));
    }

    const handleAddress = (e) =>{
        setSelectedAddress(user.addresses[e.target.value]);
    }

    const handlePayment = (e) =>{
        setPayment(e.target.value)
    }

    const handleOrder = () =>{
        if(selectedAddress && payment){
            const products = [];
            for(let item of items)
                products.push(item.id);
            const order = {items, user: user.id, totalSum, totalQuantity, address:selectedAddress, payment};
            dispatch(addOrderAsync(order));
        }else
            alert("Enter address and payment method");
    }

    return (
            <Navbar>
            {!items.length && <Navigate to="/" replace={true}/>}
            {currentOrder && currentOrder.payment==="cash" && <Navigate to={`/order/${currentOrder.id}`} replace={true}/>}
            {currentOrder && currentOrder.payment==="card" && <Navigate to={`/stripe-checkout`} replace={true}/>}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                    <div className="lg:col-span-3">
                        {/* form part */}
                        <form noValidate onSubmit={handleSubmit((data)=>{
                            const updateUser = {...user, addresses:[...user.addresses, data]}
                            dispatch(updateUserAsync(updateUser))
                            reset()
                            })} >
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent email where you can get exciting offers</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("name", {required:"Name is required"})}
                                                    id="name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-500 font-semibold" >{errors.name?errors.name.message:""}</p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register("email", {required: "Email is required", pattern:{
                                                        value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                                                        message: "Email is not valid"
                                                    }})}
                                                    type="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-500 font-semibold" >{errors.email?errors.email.message:""}</p>

                                            </div>
                                        </div>

                                        

                                        <div className="col-span-full">
                                            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="tel"
                                                    {...register("phoneNumber", {required:"Phone number is required", pattern:{
                                                        value: /^((091|\+91)?|\((091|\+91)?\)|(91)?|\(91\)|0)? ?[5-9][0-9]{9}$/gm,
                                                        message: "mobile number is not valid"
                                                    }})}
                                                    id="phoneNumber"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-500 font-semibold" >{errors.phoneNumber?errors.phoneNumber.message:""}</p>

                                            </div>
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("streetAddress", {required:"Street-Address is required"})}
                                                    id="streetAddress"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-500 font-semibold" >{errors.streetAddress?errors.streetAddress.message:""}</p>

                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("city", {required:"City is required"})}
                                                    id="city"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />                                                
                                                <p className="text-red-500 font-semibold" >{errors.city?errors.city.message:""}</p>

                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("state", {required:"State is required"})}
                                                    id="state"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-500 font-semibold" >{errors.state?errors.state.message:""}</p>

                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("postalCode", {required:"Postal-code is required"})}
                                                    id="postalCode"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-500 font-semibold" >{errors.postalCode?errors.postalCode.message:""}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={e=>reset()}>
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save Address
                                </button>
                            </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Addresses</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600"> Pick your resident address</p>
                                            <ul role="list" className="divide-y divide-gray-100"  >
                                                {user.addresses.map((address, index) => (

                                                    <li key={index} className="flex justify-between gap-x-6 py-5">
                                                            <input
                                                                value = {index}
                                                                checked = {address===selectedAddress?true:false}
                                                                onChange={e=>handleAddress(e)}
                                                                id="push-email"
                                                                name="payment"
                                                                type="radio"
                                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                                <div className="flex gap-x-4">
                                                                    <div className="min-w-0 flex-auto">
                                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-900 font-semibold">{address.phoneNumber}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                                    <p className="text-sm leading-6 text-gray-900">{address.streetAddress}</p>
                                                                    <p className="text-sm leading-6 text-gray-900">{address.postalCode}</p>
                                                                    <p className="text-sm leading-6 text-gray-900">{address.city}, {address.state}</p>
                                                                    {/* <p className="text-sm leading-6 text-gray-900">{address.state}</p> */}

                                                                </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payments</legend>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="push-email"
                                                        name="payemnt"
                                                        value="cash"
                                                        checked={payment==="cash"?true:false}
                                                        onChange={e=>handlePayment(e)}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash on Delivery
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="push-nothing"
                                                        name="payemnt"
                                                        value="card"
                                                        checked={payment==="card"?true:false}
                                                        onChange={e=>{ handlePayment(e);}}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>

                            
                        </form>
                    </div>
                    <div className="lg:col-span-2 ml-4">
                        <div className="border-solid border-4 rounded-lg border-black p-4 bg-blue-200 mt-20">
                            <div className="mt-8 ">
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
                                                                onClick={(e=>handleRemove(e, item.id))}
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
                                    <p>Total Items</p>
                                    <p>{totalQuantity}</p>
                                </div>
                                <div>
                                <button onClick={handleOrder} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mt-3">
                                    Order Now
                                </button>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
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
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

export default Checkout;