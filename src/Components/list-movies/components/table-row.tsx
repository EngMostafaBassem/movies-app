import React from "react";
import { Movie } from "../../../types-dictionary/Movies";

interface TableRowProps{
    movie:Movie,
    onDelete:(id:string)=>void,
    onLike:(id:string,isLiked:boolean)=>void
}

const TableRow:React.FC<TableRowProps>=({movie,onDelete,onLike})=>{
    return(
        <tr>
         <td>{movie?.title}</td>
         <td>{movie?.genre?.name}</td>
         <td>{movie?.numberInStock}</td>
         <td>{movie?.dailyRentalRate}</td>
         <td><i role='button'  className={movie?.liked?'fa fa-heart':'fa fa-heart-o'} onClick={()=>onLike(movie?._id,!movie?.liked)}></i></td>
         <td><button className="btn btn-danger" onClick={()=>onDelete(movie?._id)}>Delete</button></td>
      </tr>
    )

}
export default TableRow