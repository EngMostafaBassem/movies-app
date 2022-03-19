import React, { useCallback, useEffect, useState } from 'react'
import { Movie } from '../../../../types-dictionary/Movies'
import ListGroup from '../../../common/ListGroup'
import MoviesTable from './movies-table'
import _ from 'lodash'
import {useNavigate} from 'react-router-dom'
import MoviesServices from '../../../services/movies'
import GenresServices from '../../../services/genres'
import { UserContext } from '../../../contexts/user-context'

const Movies=()=>{

     const [movies,setMovies]=useState<Movie[]>([]) 
     const[genres,setGenres]=useState<string[]>(['All Genres'])
     const [loading,setLodaing]=useState(false)
     const[search,setSearch]=useState('')
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
      setSearch('')
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
       setLodaing(true)
       const data=await MoviesServices.fetchMovies()
       setMovies(data)
       setLodaing(false)
     }
     const handleFetchGenres=async ()=>{
      setLodaing(true)
      let data=await GenresServices.fetchGenres()
      data=data.map((item:any)=>item.title)
      setGenres(['All Genres',...data])
      setLodaing(false)
    }
  
     useEffect(()=>{ 
      handleDataFiltering(currFilters)
    },[movies])

    useEffect(()=>{
      if(search){
       setfilterdMovies(movies.filter(movie=>movie.title.toLowerCase().includes(search.toLowerCase())))
       return
      }
       handleDataFiltering(currFilters)
     
    },[search])


    useEffect(()=>{
      handleFetchMovies()
      handleFetchGenres()
    },[])


 return(
     <div className='container'>
         <div className='row'>
          <div className='col-md-2 col-12'>
            <ListGroup 
               currentFilters={currFilters}
               items={genres}
               onSelectItem={handleFiltersChange}
               />
          </div>
          <div className='col-md-10 col-12'>
            <div className='row'>
              <div className='col-8'>
                <h5>Showing {currFilters.total} movies in the database</h5>
                <div className='col'>
                   <input type="search" className="form-control" placeholder='Search...' value={search}  onChange={(e)=>setSearch(e.target.value)} />
                </div>
              </div>
              <div className='col d-flex flex-row-reverse align-items-center'>
                <button className='btn btn-primary' onClick={()=>navigate('add')}>New Movie</button>
              </div>
            </div>
           {
             loading?
             (
               <div className='d-flex justify-content-center'>
                 <div className="spinner-border " role="status">
                   <span className="visually-hidden">Loading...</span>
                 </div>
              </div>
             )
            :(
              <MoviesTable 
              onFilterChange={handleFiltersChange}
              onPageChange={handlePageChange}
              filterdData={filterdMovies}
              data={movies} 
              onDelete={handleDelete}
              onLike={handleLike}
              pagination={{total:currFilters.total,pageSize:currFilters.pageSize,pageNum:currFilters.pageNum}}
          />
             )
           }
           
          </div>
         </div>
        
     </div>
 )
}
export default Movies