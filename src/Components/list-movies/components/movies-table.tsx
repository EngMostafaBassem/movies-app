import React, { useCallback, useEffect, useState } from "react";
import { Movie } from "../../../types-dictionary/Movies";
import Pagination from "../../common/Pagination";
import TableRow from "./table-row";
import _ from 'lodash'

interface MoviesTableProps{
    data:Movie[],
    filterdData:Movie[],
    onPageChange:(pageNum:number)=>void
    onFilterChange:(filters:any)=>void
    pagination:{total:number,pageSize:number,pageNum:number}
    onDelete:(id:string)=>void,
    onLike:(id:string,isLiked:boolean)=>void
  }
const MoviesTable:React.FC<MoviesTableProps>=({data,filterdData,onDelete,onLike,pagination,onPageChange,onFilterChange})=>{
   const {pageSize,total,pageNum}=pagination
    if(data.length==0)return <p>There is no data to show</p>
    return(
       <> 
        <table className="table">
        <thead>
          <tr>
            <th scope="col"  role='button' onClick={()=>onFilterChange({sort:'title'})} >Title</th>
            <th scope="col"  role='button' onClick={()=>onFilterChange({sort:'genre'})}>Genre</th>
            <th scope="col"  role='button' onClick={()=>onFilterChange({sort:'numberInStock'})}>Stock</th>
            <th scope="col"  role='button' onClick={()=>onFilterChange({sort:'dailyRentalRate'})}>Rate</th>
          </tr>
        </thead>
        <tbody>
          {filterdData.map((item)=><TableRow key={item._id} movie={item} onDelete={onDelete} onLike={onLike} />)}
        </tbody>
       </table>
          
         {
            filterdData.length!=0&&(
            <Pagination
            itemsCount={total}
            pageSize={pageSize}
            currentPage={pageNum}
            onPageChange={onPageChange}
           />
           )
          
         }
        
         
       
     
      </> 
    )

}

export default MoviesTable