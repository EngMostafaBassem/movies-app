import React, { useEffect, useState } from 'react'
import {useFormikContext} from 'formik'
import GenresServices from '../../services/genres'

interface GenreSelectProps{
    label:string,
    name:string,
    col:number
}
const GenreSelect:React.FC<GenreSelectProps>=({name,col,label})=>{
    const [genres,setGenres]=useState([])
    const fetchGenres=async()=>{
        const data=await GenresServices.fetchGenres()
        setGenres(data)
    }
    useEffect(()=>{
        fetchGenres()
       
    },[])
    const {values,handleChange,handleBlur,errors,touched}=useFormikContext<any>()
    return(
        <div className={`col-${col}`}>
         <label  className="form-label">{label}</label>
          <select className="form-select form-select-lg mb-3"  name={name} value={values[name]} onChange={handleChange} onBlur={handleBlur}>
              <option defaultValue="0">Select Genre</option>
              {
                  !!genres.length&&genres.map((item:any)=><option value={item?.title} key={item?._id}>{item?.title}</option>)
              }
             
           </select>
           {touched[name]&&errors[name]&&(<div className="text-danger">{errors[name]} </div>)}          
        </div>
    )
}
export default GenreSelect