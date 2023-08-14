import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import {selectLoginCredential} from "./authSlice"

const Protected = ({children}) => {
    const user = useSelector(selectLoginCredential)
    if(!user){
        return <Navigate to="/login" replace={true}></Navigate>
    }else
        return children
}

export default Protected