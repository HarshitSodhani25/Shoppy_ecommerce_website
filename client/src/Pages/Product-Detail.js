import React from 'react'
import ProductDetailComponent from '../features/Product-list/ProductDetail'
import Navbar from "../features/Navbar/Navbar";

const ProductDetail = () => {
  return (
    <>
      <Navbar>
        <ProductDetailComponent/>
      </Navbar>
    </>
  )
}

export default ProductDetail