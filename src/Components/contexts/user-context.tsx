import React, { useEffect, useState } from 'react'
import { isExpired, decodeToken } from "react-jwt";
type User={
    id:string,
    name:string,
    email:string
}
type UserContext={   
 currentUser:User|null,
 setCurrentUser: React.Dispatch<React.SetStateAction<User |null>>;
 authLoading:boolean
 setAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
 authError:boolean;
 setAuthError:React.Dispatch<React.SetStateAction<boolean>>;

}
export const UserContext=React.createContext<UserContext|null>(null)

const UserContextProvider:React.FC<any>=({children})=>{
    const [currentUser,setCurrentUser]=useState<User|null>(JSON.parse(localStorage.getItem('current-user') as any)||null)
    const [authLoading,setAuthLoading]=useState(false)
    const [authError,setAuthError]=useState(false)
 
    const handleCheckLogin=()=>{
        //here will be logic for check login
        const token=localStorage.getItem('access-token')   
        if(token){
            const isMyTokenExpired = isExpired(token);
            if(isMyTokenExpired===true){
                localStorage.removeItem('access-token')
                localStorage.removeItem('current-user')
                setCurrentUser(null)
                setAuthError(false)       
            } 
        }
        else{
          setCurrentUser(null)
        }
    }

    useEffect(()=>{ 
        handleCheckLogin()   
    },[])
    const state={
        currentUser,
        setCurrentUser,
        authLoading,
        setAuthLoading,
        authError,
        setAuthError,
    }

  
    return(
        <UserContext.Provider value={state}>
           {children}
        </UserContext.Provider>
    )

}
export default UserContextProvider