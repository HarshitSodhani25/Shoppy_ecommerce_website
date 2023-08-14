import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, Navigate} from "react-router-dom"
import { selectSignUpError, createCredentialAsync, selectLoginCredential } from './authSlice';
import {useForm} from "react-hook-form"

export default function Signup() {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors }} = useForm();
    const user = useSelector(selectLoginCredential)
    const error = useSelector(selectSignUpError)

    return (
        <>
            {user && <Navigate to="/"/>}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate className="space-y-6" onSubmit={handleSubmit( (data) => {
                        dispatch(createCredentialAsync({email:data.email, password: data.password, addresses: [], role: 'user'})); 
                        
                        })}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register("email", {required: "user email is required", pattern:{
                                        value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                                        message: "email is not valid"
                                    }})}
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className="text-red-500">{errors.email?errors.email.message:""}</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password" 
                                    {...register("password", {required: "password is required", pattern: {
                                        value: /^(?=(?:.*[A-Z]){2,})(?=(?:.*[a-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){2,})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{12,20})$/,
                                        message: `must contain 2 upper case letter, 2 lower case letters, 2 digits, 2 special characters. \n Allowed length is 12-20`
                                    } })}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className="text-red-500">{errors.password?errors.password.message:""}</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirm-password"
                                    {...register("confirmPassword", {required: "confirm-password is required", validate: (value, formValues)=> value === formValues.password || 'password and confirm-password not matches' })}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className="text-red-500">{errors.confirmPassword?errors.confirmPassword.message:""}</p>
                            </div>
                        </div>
                        {error && <p className="text-red-500 font-semibold">{error.message}</p>}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have a account{' '}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                    
                </div>
            </div>
        </>
    );
}
