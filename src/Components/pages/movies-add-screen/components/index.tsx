import React from 'react'
import Form from '../../../common/Form/Form'
import InputForm from '../../../common/Form/InputForm'
import {values} from '../values'
import {schema} from '../schema'
import GenreSelect from '../../../common/Filterbox/GenreSelect'
import MoviesServices from '../../../services/movies'
import { useNavigate } from 'react-router-dom'
const MoviesAdd=()=>{
    const navigate=useNavigate()
    const handleSubmit=async(values:any)=>{
        await MoviesServices.addMovie(values)
        navigate('/')
    }
    return(
        
             <div className='container'>
               <h1>Movie Form</h1>
               <Form 
                  values={values} 
                  schema={schema} 
                  onSubmit={handleSubmit}
                  >
                 <div className='row'>
                    <InputForm name='title' label='Title' type='text' col={12}/>
                    <GenreSelect name='genre' col={12} label="Genre"/>
                    <InputForm name='numberInStock' label='Number in Stock' type='number' col={12}/>
                    <InputForm name='dailyRentalRate' label='Rate' type='number' col={12}/>
                   
                </div>
                <button className='btn btn-primary '  type='submit'>save</button>     
            </Form>
               
        </div>
       

    )

}
export default MoviesAdd


