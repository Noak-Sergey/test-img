import { Dispatch } from "redux"
import { itemsAPI } from "../api/api"
import { ItemType } from "../components/Item"

const SETITEMS = "ITEMS/SET_ITEMS"

const initialState:ItemType[] = []
    
export const itemsReducer = (state:ItemType[] = initialState, action:ActionsType) => {
    switch (action.type) {
        case SETITEMS:
            return action.items.map(i =>({...i}))   //{...state, items: action.items}
            default:
                return state
    }
}

//actions
export const setItemsAC = (items:ItemType[]) => ({type:SETITEMS, items} as const)

//thunks
export const fetchItemsImgTC = () => {
    return async (dispatch:Dispatch<ActionsType>) => {
        let res = await itemsAPI.getImg()
        dispatch(setItemsAC(res.data))            
    }
}

//types
export type SetItemsActionType = ReturnType<typeof setItemsAC>
export type ActionsType = SetItemsActionType