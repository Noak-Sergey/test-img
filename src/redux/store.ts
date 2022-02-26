import { applyMiddleware, combineReducers, createStore } from "redux";
import  thunkMiddleware from 'redux-thunk';
import { itemsReducer } from "./items-reducer";


let reducers = combineReducers({
    itemsPage: itemsReducer,
})

export type RootStateType = ReturnType<typeof reducers>

export let store = createStore(reducers, applyMiddleware(thunkMiddleware))