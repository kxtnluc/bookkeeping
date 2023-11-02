import { Link } from "react-router-dom"
import "./Library.css"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Slider } from "@mui/material"
import { forwardRef, useEffect, useState } from "react"
import { updateUserBook } from "../../services/userBookService"

export const LibraryList = ({ books }) => {
    return (
        <>
            <ul className="lb-list">
                {books.map((b) => {
                    // console.log(b)
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

// export const LibraryReadingList = ({ reading }) => {

//     const handleSlider = (e) => {
//         console.log(e.target.value)
//     }

//     return (
//         <>
//             <ul className="lrl-list">
//                 {reading.map((r) => {
//                     // console.log(r)
//                     return (
//                         <li key={r.id} className="lrl-list-item">
//                             <Link className="lrl-link" to={`/thekeep/book/${r.bookId}`}>

//                                 <div className="lrl-list-item-img">
//                                     <img src={r.bookImg} alt="no-cover-found" width="185" height="280" />
//                                 </div>

//                                 <div className="lrl-list-item-title">
//                                     {r.bookName}
//                                 </div>

//                             </Link>

//                             <div className="lrl-progress">
//                                 <div>
//                                     <Slider onChange={handleSlider} color="success" className="lrl-slider" />
//                                 </div>
//                                 <div className="lrl-progress-number">
//                                     {r.percentRead}
//                                 </div>
//                             </div>
//                         </li>
//                     )
//                 })}
//             </ul>
//         </>
//     )
// }

export const LibraryReadingListItem = ({ book, userBooks }) => {

    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const [sliderValue, setSliderValue] = useState(0)
    const [userBook, setUserBook] = useState({})

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        setSliderValue(book.percentRead)
        // console.log(book)
        // console.log(userBooks)
        const foundUserBook = userBooks.find((ubs) => ubs.bookId === book.bookId)
        setUserBook(foundUserBook)
    }, [])

    const handleOpen = () => {
        setOpenModal(true);
    }

    const handleClose =  () => {
        setSliderValue(50)
        setOpenModal(false);
    }

    const handleSlider = (e) => {
        const value = e.target.value
        setSliderValue(value)
    }

    const handleSliderStop = (e) => {
        console.log(sliderValue)

        if (sliderValue > 0 && sliderValue < 100) {
            const updatedUserBookObj = {
                id: userBook.id,
                userId: userBook.userId,
                bookId: userBook.bookId,
                percentRead: sliderValue
            }
            // console.log(updatedUserBookObj)
            updateUserBook(updatedUserBookObj)

        } else if (sliderValue === 0) {
            setOpenModal(true);
        } else if (sliderValue === 100) {
            console.log('open!')
            setOpenModal(true);
        }


    }

    return (
        <>
            <li key={book.id} className="lrl-list-item">
                <Link className="lrl-link" to={`/thekeep/book/${book.bookId}`}>

                    <div className="lrl-list-item-img">
                        <img src={book.bookImg} alt="no-cover-found" width="185" height="280" />
                        <div className="lrl-list-item-title">
                            {book.bookName}
                        </div>
                    </div>


                </Link>

                <div className="lrl-progress">
                    <div>
                        <Slider value={sliderValue} onChangeCommitted={handleSliderStop} onChange={handleSlider} color="success" className="lrl-slider" />
                    </div>
                    <div className="lrl-progress-number">
                        {sliderValue}%
                    </div>
                    <Dialog
                        open={openModal}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{`Add "${book.bookName}" to your Read library?`}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button variant='contained' color='success' onClick={()=>console.log('yay')}>Add +</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </li>


        </>
    )
}