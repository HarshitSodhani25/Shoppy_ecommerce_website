import React from 'react'
import CartComponent from "../features/Cart/Cart";
import Navbar from '../features/Navbar/Navbar';

const Cart = () => {
  return (
    <Navbar>
      <CartComponent/>
    </Navbar>
  )
}

export default Cart