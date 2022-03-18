import React, { useCallback, useEffect, useState } from 'react'
import { Movie } from '../../../../types-dictionary/Movies'
import ListGroup from '../../../common/ListGroup'
import MoviesTable from './movies-table'
import _ from 'lodash'
import {useNavigate} from 'react-router-dom'
import MoviesServices from '../../../services/movies'
const Movies=()=>{
  
     const [movies,setMovies]=useState<Movie[]>([]) 
     const [genres,setGenres]=useState<string[]>(['All Genres','Action','Comedy','Thriller'])
     const [currFilters,setCurrentFilters]=useState<any>(
       {
       pageSize:3,
       total:movies.length,
       pageNum:1,
       genre:'All Genres'}
       )
     const [filterdMovies,setfilterdMovies]=useState<Movie[]>([])
     const navigate=useNavigate()
     const handlePageChange=useCallback((pageNum)=>{
      handleDataFiltering({...currFilters,pageNum})
     }
     ,[currFilters])
    
     const handleDelete=async(id:string)=>{
        await MoviesServices.deleteMovie(id)
        handleFetchMovies()
     }
     
     const handleLike=async(id:string,isLiked:boolean)=>{
       await MoviesServices.updateMovie(id,{liked:isLiked})
       handleFetchMovies() 
     }   
     const handleDataFiltering=(filters:any):any=>{
   
      const {pageNum,pageSize,total,...rest}=filters
      let filtedData=[...movies]
      let totalFilterd=0
      if(rest?.genre){
        if(rest.genre!='All Genres')filtedData=filtedData.filter(item=>item.genre===rest.genre)       
      }
      if(rest?.sort){
        filtedData=_.orderBy(filtedData,[rest?.sort as string],['asc'])
      }
      
      totalFilterd=filtedData.length
      if(totalFilterd===0){
        setfilterdMovies(filtedData)
        setCurrentFilters({...filters,total:totalFilterd})
        return
      }
      filtedData=_(filtedData).slice((pageNum-1)*pageSize,totalFilterd).take(pageSize).value()
      if(!filtedData.length){
        return handleDataFiltering({total:movies.length,pageNum:1,pageSize:3,genre:'All Genres'})
      }
      setfilterdMovies(filtedData)
      setCurrentFilters({...filters,total:totalFilterd})
    }
     const handleFiltersChange=useCallback((filters)=>{  
      handleDataFiltering({...currFilters,...filters})  
     },[currFilters])
     
     const handleFetchMovies=async ()=>{
       const data=await MoviesServices.fetchMovies()
       setMovies(data)
     }
    
    useEffect(()=>{
      handleFetchMovies()
    },[])

     useEffect(()=>{ 
      handleDataFiltering(currFilters)
    },[movies])

 return(
     <div className='container'>
         <div className='row'>
          <div className='col-2'>
            <ListGroup 
               currentFilters={currFilters}
               items={genres}
               onSelectItem={handleFiltersChange}
               />
          </div>
          <div className='col'>
            <div className='row'>
              <div className='col-8'>
                <h5>Showing {currFilters.total} movies in the database</h5>
              </div>
              <div className='col'>
                <button className='btn  btn-primary' onClick={()=>navigate('add')}>New Movie</button>
              </div>

            </div>
           
           <MoviesTable 
             onFilterChange={handleFiltersChange}
             onPageChange={handlePageChange}
             filterdData={filterdMovies}
             data={movies} 
             onDelete={handleDelete}
             onLike={handleLike}
             pagination={{total:currFilters.total,pageSize:currFilters.pageSize,pageNum:currFilters.pageNum}}
         />
          </div>
         </div>
        
     </div>
 )
}
export default Movies