import axios from "axios";
import { ItemType } from "../components/Item";


const instance = axios.create({
    baseURL: "http://jsonplaceholder.typicode.com"
})

export const itemsAPI = {
    getImg() {
        return instance.get<ItemType[]>(`/photos`)    
    }, 
}