import React, { useState } from "react";
import { Modal } from "./common/Modal/Modal";
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

export const Item = (props: ItemPropsType) => {

    const [show, setShow] = useState(false)

    
    return <div>
        <div>
            <img alt="error load image" src={props.item.thumbnailUrl} className={s.itemImg} />
        </div>
        <Modal onClose={()=> setShow(false)} show={show} url={props.item.url}/>
        <button onClick={()=> setShow(true)}>DELETE</button>
    </div>
}