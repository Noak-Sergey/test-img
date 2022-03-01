import React from "react";
import s from "./Modal.module.css"

type ModalPropsType = {
    show: boolean
    onClose: () => void
    url: string
}

export const Modal: React.FC<ModalPropsType> = (props) => {

    if (!props.show) {
        return null
    }

    const stopOnClick = (e: any) => e.stopPropagation() //Спросить типизацию?

    return (
        //Привязал событие onClick за пределами модального окна
        <div className={s.modal} onClick={props.onClose}>   
            <div className={s.modal_content} onClick={stopOnClick}>
                <img alt="waiting" src={props.url} />
                <div className={s.modal_footer}>
                    <button onClick={props.onClose} className={s.button}>Close</button>
                </div>
            </div>
        </div>
    )
}