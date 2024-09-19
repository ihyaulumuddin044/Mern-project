import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuntContext } from '../context/AuntProvider'
import LoadingSpiner from '../component/LoadingSpiner'

const PrivateRouter = ({children}) => {
    const {user, loading} = useContext(AuntContext)
    const location = useLocation()

    if(loading){
        return (
            <LoadingSpiner/>
        )
    } if(user) {
        return children
    }
  return <Navigate to="/login" state={{from: location}} replace ></Navigate>
}

export default PrivateRouter;