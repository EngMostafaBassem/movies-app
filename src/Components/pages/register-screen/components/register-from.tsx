import React from 'react'
import Form from '../../../common/Form/Form'
import InputForm from '../../../common/Form/InputForm'
import {values} from '../values'
import {schema} from '../schema'
import AuthServices from '../../../services/auth'
import { UserContext } from '../../../contexts/user-context'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../common/Loading'
const RegisterForm=()=>{
  const context=React.useContext(UserContext) 
  const navigate=useNavigate()

  const handleRegisteration=async(values:any)=>{
   context?.setAuthLoading(true) 
   await AuthServices.register(values)
   context?.setAuthLoading(false) 
   navigate('/login')
  }
    if(context?.authLoading)  return <Loading/> 
    return(
        
        <div className='container'>
            <h1>Register</h1>
            <Form values={values} schema={schema} onSubmit={handleRegisteration}>
                <div className='form-group'>
                  <InputForm label='Name' type='text' col={6} name='name'/>
                </div>
                <div className='form-group'>
                  <InputForm label='Email' type='email' col={6} name='email'/>
                </div>
                <div className='form-group'>
                  <InputForm label='Password' type='password' col={6} name='password'/>
                </div>
                <button className='btn btn-primary'  type='submit'>Register</button>
                
            </Form>
        </div>
    )

}
export default RegisterForm