import React from "react";
import s from "./Item.module.css"

export type ItemType = {
    "albumId": number
    "id": number
    "title": string
    "url": string
    "thumbnailUrl": string
}

type ItemPropsType = {
    item: ItemType
}

export const Item = (props:ItemPropsType) => {
    return <div>        
        <img alt="error load image" src={props.item.thumbnailUrl} className={s.itemImg}/>
    </div>
}