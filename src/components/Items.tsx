import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchItemsImgTC, setCurrentPageAC } from "../redux/items-reducer"
import { RootStateType } from "../redux/store"
import { Pagination } from "./common/Pagination/Pagination"
import { Item, ItemType } from "./Item"

export const Items: React.FC = () => {
  const dispatch = useDispatch()

  const itemsImg = useSelector<RootStateType, ItemType[]>(state => state.itemsPage.items)
  const pageSize = useSelector<RootStateType, number>(state => state.itemsPage.pageSize)
  const totalItemsCount = useSelector<RootStateType, number>(state => state.itemsPage.totalItemsCount)
  const currentPage = useSelector<RootStateType, number>(state => state.itemsPage.currentPage)

  useEffect(() => {
    const thunk = fetchItemsImgTC()
    dispatch(thunk)
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(setCurrentPageAC(pageNumber))
  }

  const sizeRender = pageSize * currentPage
  const renderItemsImg = itemsImg.slice(0, sizeRender)


  return <div>

    <div>
      {renderItemsImg.map(item => <Item key={item.id} item={{
        albumId: item.albumId,
        id: item.id,
        title: item.title,
        url: item.url,
        thumbnailUrl: item.thumbnailUrl
      }} />)}
    </div>

    <Pagination currentPage={currentPage} pageSize={pageSize}
      onPageChanged={onPageChanged} totalItemsCount={totalItemsCount} />

  </div>
}