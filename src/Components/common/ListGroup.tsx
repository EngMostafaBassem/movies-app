import React from 'react'

interface ListGroupProps{
    currentFilters:any,
    items:string[],
    onSelectItem:(filters:any)=>void
}

const ListGroup:React.FC<ListGroupProps>=({items,onSelectItem,currentFilters})=>{
    return(
        <div>
            <div className="list-group">
                {
                 items.map((item)=><a key={item}  className={`list-group-item list-group-item-action ${currentFilters.genre===item?'active':''}`} onClick={()=>onSelectItem({genre:item,pageNum:1})}>{item}</a>)
                }
           
          </div>
        </div>
    )

}
export default ListGroup