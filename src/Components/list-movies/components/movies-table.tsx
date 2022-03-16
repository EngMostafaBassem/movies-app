import React, { useCallback, useEffect, useState } from "react";
import { Movie } from "../../../types-dictionary/Movies";
import Pagination from "../../common/Pagination";
import TableRow from "./table-row";
import _ from 'lodash'

interface MoviesTableProps{
    data:Movie[],
    filterdData:Movie[],
    handlePageChange:(pageNum:number)=>void
    pagination:{total:number,pageSize:number,pageNum:number}
    onDelete:(id:string)=>void,
    onLike:(id:string,isLiked:boolean)=>void
  }
const MoviesTable:React.FC<MoviesTableProps>=({data,filterdData,onDelete,onLike,pagination,handlePageChange})=>{
   const {pageSize,total,pageNum}=pagination
    if(data.length==0)return <p>There is no data to show</p>
    console.log('data.length',total)
    return(
       <> 
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
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
            onPageChange={handlePageChange}
           />
           )
          
         }
        
         
       
     
      </> 
    )

}

export default MoviesTable