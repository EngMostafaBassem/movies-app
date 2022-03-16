import React, { useMemo}  from "react";
import _ from 'lodash'
interface PaginationProps{
    itemsCount:number,
    pageSize:number,
    currentPage:number,
    onPageChange:(pageNum:number)=>void
}
const Pagination:React.FC<PaginationProps>=({itemsCount,pageSize,currentPage,onPageChange})=>{
    console.log('items count',itemsCount)
    console.log('page size',pageSize)
    const computePageCount=(itemsCount:number,pageSize:number)=> _.range(1,Math.ceil(itemsCount/pageSize)+1)  
    const pagesCount=useMemo(()=>computePageCount(itemsCount,pageSize),[itemsCount,pageSize])
    return(
         <nav aria-label="...">
          <ul className="pagination pagination-sm">
              {
                  pagesCount.map(page=>(
                    <li key={page} className= {page===currentPage?"page-item active":"page-item"} ><a className="page-link" onClick={()=>onPageChange(page)}>{page}</a></li>
                  ))
              }
         </ul>
       </nav>
    )

}
export default Pagination