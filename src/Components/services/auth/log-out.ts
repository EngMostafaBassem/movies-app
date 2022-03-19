import React from 'react' 
import { getAuth, signOut } from "firebase/auth";
export const logout=async()=>{
    console.log('here will logout')
    const auth = getAuth();
    return new Promise((res,err)=>{
        signOut(auth).then(() => {
            localStorage.removeItem('access-token')
            localStorage.removeItem('current-user')
            res('Logged out successfully')
          }).catch((error) => {
            err(error)
          });
    })

}