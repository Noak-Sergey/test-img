import { Dispatch } from "redux"
import { itemsAPI } from "../api/api"
import { ItemType } from "../components/Item"

const SET_ITEMS = "ITEMS/SET_ITEMS"
const SET_TOTAL_ITEMS_COUNT = "ITEMS/SET_TOTAL_ITEMS_COUNT"
const SET_CURRENT_PAGE = "ITEMS/SET_CURRENT_PAGE"

const initialState = {
    items: [],
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
};

type ItemsStateType = {
    items: ItemType[]
    pageSize: number
    totalItemsCount: number
    currentPage: number
}

export const itemsReducer = (state: ItemsStateType = initialState, action: ActionsType): ItemsStateType => {
    switch (action.type) {
        case SET_ITEMS:
            return { ...state, items: action.items }
        case SET_TOTAL_ITEMS_COUNT:
            return { ...state, totalItemsCount: action.totalCount }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        default:
            return state
    }
}

//actions
export const setItemsAC = (items: ItemType[]) => ({ type: SET_ITEMS, items } as const)
export const setTotalItemsCountAC = (totalCount: number) => ({ type: SET_TOTAL_ITEMS_COUNT, totalCount } as const)
export const setCurrentPageAC = (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const)

//thunks
export const fetchItemsImgTC = () => {
    return async (dispatch: Dispatch<ActionsType>) => {
        let res = await itemsAPI.getImg()
        dispatch(setItemsAC(res.data))
        dispatch(setTotalItemsCountAC(res.data.length))
    }
}

//types
export type SetItemsActionType = ReturnType<typeof setItemsAC>
export type SetTotalItemsCountActionType = ReturnType<typeof setTotalItemsCountAC>
export type setCurrentPageActionType = ReturnType<typeof setCurrentPageAC>

export type ActionsType = SetItemsActionType | SetTotalItemsCountActionType | setCurrentPageActionType