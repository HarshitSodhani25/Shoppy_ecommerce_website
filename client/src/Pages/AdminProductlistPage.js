import React from 'react'
import AdminProductList from "../features/Admin/AdminProductList"
import Navbar from '../features/Navbar/Navbar'

const AdminProductlistPage = () => {
  return (
      <Navbar>
          <AdminProductList/>
      </Navbar>
  )
}

export default AdminProductlistPage