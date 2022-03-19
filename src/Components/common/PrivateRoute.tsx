import React, {ComponentType, useEffect } from 'react'
import { UserContext } from '../contexts/user-context'
import { Navigate } from 'react-router-dom';
import { isExpired } from 'react-jwt';

interface  PrivateRouteProps{
    Component:ComponentType
}
const PrivateRoute:React.FC<PrivateRouteProps>=({Component})=>{
  const context=React.useContext(UserContext)  
  if(!context?.currentUser) return <Navigate to="/login"/>
  return <Component/>
}
export default PrivateRoute


