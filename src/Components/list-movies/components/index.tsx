import React, { useCallback, useEffect, useState } from 'react'
import { Movie } from '../../../types-dictionary/Movies'
import ListGroup from '../../common/ListGroup'
import MoviesTable from './movies-table'
import _ from 'lodash'

const Movies=()=>{
  
     const [movies,setMovies]=useState<Movie[]>([
        {
          _id: "5b21ca3eeb7f6fbccd471815",
          title: "Terminator",
          genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
          numberInStock: 6,
          dailyRentalRate: 2.5,
          publishDate: "2018-01-03T19:04:28.809Z",
          liked: true,
        },
        {
          _id: "5b21ca3eeb7f6fbccd471816",
          title: "Die Hard",
          genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
          numberInStock: 5,
          dailyRentalRate: 2.5
        },
        {
          _id: "5b21ca3eeb7f6fbccd471817",
          title: "Get Out",
          genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Action" },
          numberInStock: 8,
          dailyRentalRate: 3.5
        },
        {
          _id: "5b21ca3eeb7f6fbccd471819",
          title: "Trip to Italy",
          genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
          numberInStock: 7,
          dailyRentalRate: 3.5
        },
        {
          _id: "5b21ca3eeb7f6fbccd47181a",
          title: "Airplane",
          genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
          numberInStock: 7,
          dailyRentalRate: 3.5
        },
        {
          _id: "5b21ca3eeb7f6fbccd47181b",
          title: "Wedding Crashers",
          genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
          numberInStock: 7,
          dailyRentalRate: 3.5
        },
        {
          _id: "5b21ca3eeb7f6fbccd47181e",
          title: "Gone Girl",
          genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
          numberInStock: 7,
          dailyRentalRate: 4.5
        },
        {
          _id: "5b21ca3eeb7f6fbccd47181f",
          title: "The Sixth Sense",
          genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
          numberInStock: 4,
          dailyRentalRate: 3.5
        },
        {
          _id: "5b21ca3eeb7f6fbccd471821",
          title: "The Avengers",
          genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
          numberInStock: 7,
          dailyRentalRate: 3.5
        }
      ]) 
     const [genres,setGenres]=useState<string[]>(['All Genres','Action','Comedy','Thriller'])
     const [currFilters,setCurrentFilters]=useState<any>({pageSize:3,total:movies.length,pageNum:1,genre:'All Genres'})
     const [filterdMovies,setfilterdMovies]=useState<Movie[]>([])
     
     const handlePageChange=useCallback((pageNum)=>{
      handleFetchMovies({...currFilters,pageNum})
     }
     ,[currFilters])
    
     const handleDelete=(id:string)=>setMovies(movies.filter(movie=>movie._id!=id))
     const handleLike=(id:string,isLiked:boolean)=>{
        let updatedMovies=[...movies]
        const currentMovie=updatedMovies.find(movie=>movie._id==id)
        if(currentMovie){
            currentMovie.liked=isLiked  
            setMovies(updatedMovies)
        }   
     }
    
    const handleFetchMovies=(filters:any):any=>{
      const {pageNum,pageSize,total,...rest}=filters
      let filtedData=[...movies]
      let totalFilterd=0
      if(rest?.genre){
        if(rest.genre!='All Genres')filtedData=filtedData.filter(item=>item.genre.name===rest.genre)       
      }
      
      totalFilterd=filtedData.length
      if(totalFilterd===0){
        setfilterdMovies(filtedData)
        setCurrentFilters({...filters,total:totalFilterd})
        return
      }
      filtedData=_(filtedData).slice((pageNum-1)*pageSize,totalFilterd).take(pageSize).value()
      if(!filtedData.length){
        return handleFetchMovies({total:movies.length,pageNum:1,pageSize:3,genre:'All Genres'})
      }
      setfilterdMovies(filtedData)
      setCurrentFilters({...filters,total:totalFilterd})
    }

    const handleFiltersChange=useCallback((filters)=>{  
        handleFetchMovies({...currFilters,...filters})  
    },[currFilters])
     

     useEffect(()=>{ 
        handleFetchMovies(currFilters) 
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
           <h5>Showing {filterdMovies.length} movies in the database</h5>
           <MoviesTable 
           handlePageChange={handlePageChange}
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