import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { signOutAsync} from './authSlice';
import {Navigate} from "react-router-dom"

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(signOutAsync());
  },[dispatch])
  return (
    <>
      <Navigate to ='/' replace={true}/>
    </>
  )
}

export default Logout