import React from 'react' 
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../../contexts/user-context'
import RegisterForm from './register-from'
const Register=()=>{
    const context=React.useContext(UserContext)
    if(context?.currentUser) return <Navigate to='/movies'/>
    return(
        <div>
             <RegisterForm/>
        </div>
    )

}
export default Register