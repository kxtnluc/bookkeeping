import { useEffect, useState } from "react"
import { getKeep } from "../../services/theKeepService"
import "./TheKeep.css"
import { Link } from "react-router-dom"

export const KeepList = () => {

    const [books, setbooks] = useState([])

    const getAndSetKeep = () => {
        getKeep().then((kArray) => {
            setbooks(kArray) //DISPLAY BOOK IMAGES FOR THE KEEP PAGHAUHSEUIGAYSEGYUASGEYUAGWYUDGASYUDGUYIASGDUYASGDUYGDYUAS
        })
    }

    useEffect(() => {
        getAndSetKeep()
    }, [])

    return (
        <>
            <ul className="kb-list">
                {books.map((b) => {
                    return (
                        <li key={b.id} className="kb-list-item">
                            <Link className="kb-link" to={`/thekeep/book/${b.bookId}`}>

                                <div className="kb-list-item-img">
                                    <img src={b.bookImg} alt="no-cover-found" width="185" height="280" />
                                </div>

                                <div className="kb-list-item-title">
                                    {b.bookName}
                                </div>

                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}