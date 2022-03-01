import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchItemsImgTC, setCurrentPageAC } from "../redux/items-reducer"
import { RootStateType } from "../redux/store"
import { Pagination } from "./common/Pagination/Pagination"
import { CustomSelect } from "./common/Select/Select"
import { Item, ItemType } from "./Item"

export const Items = () => {

  const arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  const[value, onChangeOption] = useState(arr[0])

  const dispatch = useDispatch()

  const allItems = useSelector<RootStateType, ItemType[]>(state => state.itemsPage.items)
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

  const selectedItems = allItems.filter(i => i.albumId === +value)

  const sizeRender = pageSize * currentPage
  const renderItemsImg = selectedItems.slice(0, sizeRender)

debugger
  return <div>
      <CustomSelect
                    options={arr}
                    value={value}
                    onChangeOption={onChangeOption}
                />
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