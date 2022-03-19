import React, {ComponentType, useEffect,ReactChildren } from 'react'
import { UserContext } from '../contexts/user-context'
import { Navigate } from 'react-router-dom';



const PrivateRoute:React.FC<any>=(props)=>{

  const context=React.useContext(UserContext)  
  if(!context?.currentUser?.id&&!localStorage.getItem('access-token'))  return <Navigate to="/login"/>
  return props.children
}
export default PrivateRoute


