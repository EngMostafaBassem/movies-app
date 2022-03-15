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
     const [currentPage,setCurrentPage]=useState<number>(1)
     const [filterdMovies,setfilterdMovies]=useState<Movie[]>([])
     const pagintation={
       pageSize:3,
       total:movies.length
     }
     const handlePageChange=useCallback((pageNum)=>setCurrentPage(pageNum),[currentPage])   
     const handleDelete=(id:string)=>setMovies(movies.filter(movie=>movie._id!=id))
     const handleLike=(id:string,isLiked:boolean)=>{
        let updatedMovies=[...movies]
        const currentMovie=updatedMovies.find(movie=>movie._id==id)
        if(currentMovie){
            currentMovie.liked=isLiked  
            setMovies(updatedMovies)
        }   
     }
     const handleMovieGenre=(label:string)=>{ 
     
       if(label!='All Genres'){
        setfilterdMovies(movies.filter(movie=>movie.genre.name===label))
       }
       else{
        handlePagination()
       }
 
     }
    const handlePagination=()=>{
      const filtedData=_(movies).slice((currentPage-1)*pagintation.pageSize,pagintation.total).take(pagintation.pageSize).value()
      if(!filtedData.length)setCurrentPage(1)
      setfilterdMovies(filtedData)
    }
     useEffect(()=>{
      handlePagination()
    },[currentPage,movies])
 return(
     <div className='container'>
         <div className='row'>
          <div className='col-2'>
            <ListGroup 
               items={genres}
               onSelectItem={handleMovieGenre}
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
           pagination={{...pagintation,currentPage}}
         />
          </div>
         </div>
        
     </div>
 )
}
export default Movies