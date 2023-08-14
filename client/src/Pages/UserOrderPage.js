import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserOrders from "../features/User/UserOrders"

const UserOrderPage = () => {
  return (
    <Navbar>
      <UserOrders/>
    </Navbar>
  )
}

export default UserOrderPage