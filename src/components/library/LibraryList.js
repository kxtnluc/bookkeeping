import { Link } from "react-router-dom"
import "./Library.css"

export const LibraryList = ({ books }) => {
    return (
        <>
            <ul className="lb-list">
                {books.map((b) => {
                    console.log(b)
                    return (
                        <li key={b.id} className="lb-list-item">
                            <Link className="lb-link" to={`/thekeep/book/${b.bookId}`}>

                                <div className="lb-list-item-img">
                                    <img src={b.bookImg} alt="no-cover-found" width="185" height="280" />
                                </div>

                                <div className="lb-list-item-title">
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

// export const LibraryList = ({ book }) => {
//     return (
//         <>
//             <li key={book.id}>
//                 {book.volumeInfo?.title}

//             </li>
            
//         </>
//     )
// }