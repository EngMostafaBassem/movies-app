import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import Form from '../../../common/Form/Form';
import InputForm from '../../../common/Form/InputForm';
import { values } from '../values';
import {schema} from '../schema'
import GenreSelect from '../../../common/Filterbox/GenreSelect';
import MoviesServices from '../../../services/movies'
import { Movie } from '../../../../types-dictionary/Movies';
const MoviesView=()=>{
    const params=useParams()
    const [movie,setMovie]=useState({})
    const navigate=useNavigate()
    const handleSubmit=async(movie:Movie)=>{   
       await MoviesServices.updateMovie(params.id as string,movie)
       navigate('/')
    } 
    const fetchMovie=async(id:string)=>{
        const data=await MoviesServices.fetchMovie(id)
        setMovie(data) 
    }
    useEffect(()=>{
        if(params.id)fetchMovie(params.id) 
    },[params.id])
    return(
        <div className='container'>
            <h1>Movie Form</h1>
            { 
          
             <Form values={{...values,...movie}} schema={schema} onSubmit={handleSubmit}>
               <div className='row'>
                 <InputForm name='title' label='Title' type='text' col={12}/>
                 <GenreSelect name='genre' col={12} label="Genre"/>
                 <InputForm name='numberInStock' label='Number in Stock' type='number' col={12}/>
                 <InputForm name='dailyRentalRate' label='Rate' type='number' col={12}/>
               </div>
               <button className='btn btn-primary '  type='submit'>save</button>     
            </Form>

            }
           
           
               
        </div>
    )
    
};
export default MoviesView