import React, { useState } from "react";
import s from "./Pagination.module.css"

type PaginationPropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (p: number) => void
}

export const Pagination = (props: PaginationPropsType) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    let pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / props.pageSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const leftPortionPageNumber = (portionNumber - 1) * props.pageSize + 1
    const rightPortionPageNumber = portionNumber * props.pageSize

    return <div className={s.pagination}>

        {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}

        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span className={props.currentPage === p ? s.selectedPage : s.pageNumber}
                    key={p}
                    onClick={() => { props.onPageChanged(p) }}>{p}</span>
            })}

        {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
    </div>
}