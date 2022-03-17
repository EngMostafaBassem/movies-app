import React from 'react'

import { useParams,useNavigate } from 'react-router-dom';
const MoviesView=()=>{
    const {id}=useParams()
    const navigate=useNavigate()
    return(
        <div>
            <h1> Movie Form {id}</h1>
            <button className='btn btn-primary btn-sm' onClick={()=>navigate('/')}>save</button>        
        </div>
    )
    
};
export default MoviesView