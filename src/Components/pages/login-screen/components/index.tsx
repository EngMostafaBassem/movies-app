import React from 'react' 
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../../contexts/user-context'
import LoginForm from './login-form'
const Login=()=>{
    const context=React.useContext(UserContext)
    if(context?.currentUser) return <Navigate to='/movies'/>
    return(
        <div>
           <LoginForm/>
        </div>
    )

}
export default Login