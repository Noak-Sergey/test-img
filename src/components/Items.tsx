import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchItemsImgTC, setCurrentPageAC } from "../redux/items-reducer"
import { RootStateType } from "../redux/store"
import { Pagination } from "./common/Pagination/Pagination"
import { CustomSelect } from "./common/Select/Select"
import { Item, ItemType } from "./Item"

export const Items = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItemsImgTC())
  }, [])

  const allItems = useSelector<RootStateType, ItemType[]>(state => state.itemsPage.items)
  const pageSize = useSelector<RootStateType, number>(state => state.itemsPage.pageSize)
  const totalItemsCount = useSelector<RootStateType, number>(state => state.itemsPage.totalItemsCount)
  const currentPage = useSelector<RootStateType, number>(state => state.itemsPage.currentPage)

  const arrAlbumId = allItems.map(i => i.albumId)
  const arrFilter = arrAlbumId.filter((item, pos) => arrAlbumId.indexOf(item) == pos)
  
   const arrToString = arrFilter.map(i => i.toString())  //при переводе этого массива чисел в строки, в useState value почему-то undefined
   
  const[value, onChangeOption] = useState<string>(arrToString[0]) //при первой загрузке value = undefined и не отображаются картинки, при выборе альбома картинки загружаются

  const onPageChanged = (pageNumber: number) => {
    dispatch(setCurrentPageAC(pageNumber))
  }

  const selectedItems = allItems.filter(i => i.albumId === +value)

  const sizeRender = pageSize * currentPage
  const renderItemsImg = selectedItems.slice(0, sizeRender)

  return <div>
      AlbumId : <CustomSelect
                    options={arrToString}
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