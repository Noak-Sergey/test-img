import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchItemsImgTC } from "../redux/items-reducer"
import { RootStateType } from "../redux/store"
import { Item, ItemType } from "./Item"

export const Items:React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const thunk = fetchItemsImgTC()
    dispatch(thunk)
  },[])

  const itemsImg = useSelector<RootStateType, ItemType[]>( state => state.itemsPage)
    
    return <div>
        <div>
            {itemsImg.map(item => <Item key={item.id} item={{
                albumId: item.albumId,
                id: item.id,
                title: item.title,
                url: item.url,
                thumbnailUrl: item.thumbnailUrl
            }}/>)}
        </div>
    </div>
}