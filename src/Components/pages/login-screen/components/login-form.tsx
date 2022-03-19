import React, { useEffect, useState } from 'react'
import Form from '../../../common/Form/Form'
import InputForm from '../../../common/Form/InputForm'
import {values} from '../values'
import {schema} from '../schema'
import { UserContext } from '../../../contexts/user-context'
import  AuthServices from '../../../services/auth'
import {useNavigate } from 'react-router-dom'
import Loading from '../../../common/Loading'
const LoginForm=()=>{
    const context =React.useContext(UserContext)
    const navigation=useNavigate()
    const handleLoginUser=async(data:any)=>{
         context?.setAuthLoading(true)       
         AuthServices.login(data).
          then(async(id:string)=>{
              //handle logged in user   
              context?.setAuthLoading(false)   
              context?.setCurrentUser({id})
              navigation('/movies')
          })
         .catch(err=>{
             context?.setAuthLoading(false)
             context?.setAuthError(true)
         })
 
    }
   if(context?.authLoading)  return <Loading/> 
    return(
        <div className='container'>
            <h1>Login</h1>     
            <Form values={values} schema={schema} onSubmit={handleLoginUser}>
                <div className='form-group'>
                  <InputForm label='Email' type='email' col={6} name='email'/>
                </div>
                <div className='form-group'>
                  <InputForm label='Password' type='password' col={6} name='password'/>
                </div>
                {context?.authError&&<div className='text-danger'>Email or password is incorrect</div>}
                <div className='form-group mt-2'>
                   <button className='btn btn-primary'  type='submit'>Login</button>
                </div>
                
               
                
            </Form>
        </div>
    )

}
export default LoginForm