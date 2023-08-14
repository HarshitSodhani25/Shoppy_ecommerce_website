import React, {useState, useEffect} from "react";
import {PAGE_SIZE} from "F:\\Reactjs\\ecommerce\\client\\src\\app\\Constants.js"
import {useSelector, useDispatch} from "react-redux";
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from "../order/orderSlice";
import { EyeIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";
import Pagination from "../Common/Pagination"

const AdminOrder = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const orders = useSelector(selectOrders);
    const totalOrders = useSelector(selectTotalOrders)
    const [editableOrderId, setEditableOrderId] = useState(-1);
    const [sort, setSort] = useState({})

    useEffect(() => {
        const pagination = {_page: page, _limit: PAGE_SIZE};
        dispatch(fetchAllOrdersAsync({sort, pagination}));
    }, [dispatch, page, sort])
    
    const handleEdit = (item) => {
        setEditableOrderId(item.id);
    }
    const handleClick = () => {
        
    }
    const handleSort = (sortOption) =>{
        const sort = {_sort:sortOption.sort, _order: sortOption.order};
        setSort(sort)
    }
    const handlePage = (page) => {
        setPage(page);
      };

    const handleUpdate = (e, order)=>{
        const newOrder = {...order, status:e.target.value};
        dispatch(updateOrderAsync(newOrder))
        setEditableOrderId(-1);
    }

    const chooseColor = (status) => {
        switch(status){
            case 'pending':
                return  `bg-purple-200 text-purple-700`
            case 'accepted':
                return `bg-pink-200 text-pink-800`;
            case 'shipped':
                return `bg-yellow-200 text-yellow-800`
            case 'delivered':
                return `bg-green-200 text-green-800`
            case 'cancelled':
                return `bg-red-200 text-red-800`
            case 'dispatched':
                return `bg-orange-200 text-orange-800`
        }
    }
 
    return (
        <div className="overflow-x-auto">
            <div className="min-w-screen  flex items-center justify-center font-sans overflow">
                <div className="w-full lg:w-full">
                    <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems = {totalOrders}/>
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                 <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left cursor-pointer" onClick = {(e) => handleSort({sort:'id', order: sort?._order==='asc'?'desc':'asc'})}>
                                        Id {' '}
                                        {sort._sort==='id'&& (sort._order==='asc'?(<ArrowUpIcon className="h-4 w-4 inline"/>):(<ArrowDownIcon className="h-4 w-4 inline"/>))}
                                    </th>
                                    <th className="py-3 px-6 text-left">Orders</th>
                                    <th className="py-3 px-6 text-center">Total Amount</th>
                                    <th className="py-3 px-6 text-center">Shipping Address</th>
                                    {/* <th className="py-3 px-6 text-center">User</th> */}
                                    <th className="py-3 px-6 text-center">Status</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                            {orders.map(order=><tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center">
                                            
                                            <span className="font-medium">{order.id}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {order.items.map(item => <div className="flex items-center">
                                            <div className="mr-2">
                                                <img
                                                    className="w-6 h-6 rounded-full"
                                                    src={item.product.thumbnail}
                                                /> 
                                            </div>
                                            <span>{item.product.title} - #{item.quantity} - ${item.product.price}</span>
                                        </div>)}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex items-center justify-center">
                                            {order.totalSum}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 w-24">
                                        <div className="overflow-y-auto text-left">
                                            {`${order.address.name}, ${order.address.email}, ${order.address.phoneNumber}, ${order.address.state}, ${order.address.city},${order.address.postalCode}, ${order.address.streetAddress},`} 
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {order.id !== editableOrderId?
                                        <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                                            {order.status}
                                        </span>:
                                        <select id="status" name="status" className="block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" onChange={e=>handleUpdate(e, order)}>
                                            <option value="pending" checked={order.status==="Pending"?true:false}>Pending</option>
                                            <option value="accepted" checked={order.status==="Accepted"?true:false}>Accepted</option>
                                            <option value="shipped" checked={order.status==="Shipped"?true:false}>Shipped</option>
                                            <option value="dispatched" checked={order.status==="Dispatched"?true:false}>Dispatched</option>
                                            <option value="delivered" checked={order.status==="Delivered"?true:false}>Delivered</option>
                                            <option value="cancelled" checked={order.status==="Cancelled"?true:false}>Cancelled</option>
                                        </select> }                                   
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer" onClick={handleClick}>
                                                <EyeIcon className="h-8 w-6"/>
                                            </div>
                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer" onClick={()=>handleEdit(order)}>
                                                <PencilIcon className="h-8 w-6"/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminOrder