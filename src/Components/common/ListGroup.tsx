import React from 'react'

interface ListGroupProps{
    items:string[],
    onSelectItem:(item:string)=>void
}

const ListGroup:React.FC<ListGroupProps>=({items,onSelectItem})=>{
    return(
        <div>
            <div className="list-group">
                {
                 items.map((item)=><a  className="list-group-item list-group-item-action" onClick={()=>onSelectItem(item)}>{item}</a>)
                }
           
          </div>
        </div>
    )

}
export default ListGroup