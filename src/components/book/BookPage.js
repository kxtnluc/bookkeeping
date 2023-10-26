import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getBookById } from "../../services/googleBooksService"
import { Box, Button, InputLabel, MenuItem, Rating, Select, Stack, StyledEngineProvider, Typography } from "@mui/material"
import { createUserBook, deleteUserBook, getUserBookByUserAndBookId, updateUserBook } from "../../services/userBookService"
import "./BookPage.css"
import { addToKeep, getKeep } from "../../services/theKeepService"
import { ReviewList } from "./ReviewList"
import { getReviewsWithKeep } from "../../services/reviewService"

export const BookPage = ({ currentUser }) => {

    const { bookId } = useParams()
    const navigate = useNavigate()

    const [book, setBook] = useState({})
    const [userBook, setUserBook] = useState({})
    const [status, setStatus] = useState("")

    const [reviews, setReviews] = useState([])
    const [userReview, setUserReview] = useState({})

    useEffect(() => {
        getReviewsWithKeep().then((rArray) => {
            // console.log(book.id + "\n" + JSON.stringify(rArray[0].id))
            const filteredArray = rArray.filter((r) => r.thekeepId === book.id)
            // console.log(filteredArray)
            setReviews(filteredArray)

            const userRevObj = filteredArray.find(r => r.userId === currentUser.id)
            setUserReview(userRevObj)
        })
    }, [book.id, currentUser])

    // useEffect(() => {
    //     async function fetchReviews() {
    //       try {
    //         const rArray = await getReviewsWithKeep();
    //         const filteredArray = rArray.filter((r) => r.thekeepId === book.id);
    //         setReviews(filteredArray);
    //       } catch (error) {
    //         console.error('Error fetching reviews:', error);
    //       }
    //     }

    //     fetchReviews();

    //     if (reviews.some(r => r.userId !== currentUser.id)) {
    //         console.log("there is a review by this user")
    //     } else {
    //         console.log("no review by this user" + JSON.stringify(reviews) + "---" + currentUser.id)
    //     }
    //   }, [book.id]);

    const getAndSetUserBook = () => {
        getUserBookByUserAndBookId(book.bookId, currentUser.id).then((ubArray => {
            const userBookObj = ubArray[0]
            console.log(userBookObj)
            setUserBook(userBookObj)
            setStatus(userBookObj?.percentRead)
        }))
    }

    const addBookToKeep = (gbookObj) => {
        const bookObj = {
            bookName: gbookObj.volumeInfo.title,
            bookId: gbookObj.id,
            bookImg: gbookObj.volumeInfo?.imageLinks?.thumbnail,
            bookAuthor: gbookObj.volumeInfo.authors[0],
            bookDescription: gbookObj.volumeInfo.description
        }
        if (bookObj.bookId !== undefined) {
            addToKeep(bookObj)
        }
    }

    const getAndSetBook = () => {
        getKeep().then((kArray) => {
            if (kArray.some(k => k.bookId === bookId)) {
                const keepBook = kArray.find(k => k.bookId === bookId)
                // console.log("match!" + keepBook)
                setBook(keepBook)
            } else {
                console.log("no match!\nadding to the keep. . ")
                getBookById(bookId).then((bObj) => {
                    addBookToKeep(bObj)
                    setBook(bObj)

                })

            }
        })

    }

    useEffect(() => {
        getAndSetBook()
        getAndSetUserBook()

    }, [book.id])


    const handleChange = (e) => {

        setStatus(e.target.value)
        const statusValue = e.target.value

        if (userBook) { //if the user already has a relationship with the book
            if (statusValue === -1) { //when NONE is selected on dropdown
                console.log("deleting user book")
                deleteUserBook(userBook.id).then(() => { //removes that relationship
                    getAndSetUserBook()
                })
            } else { //when Readlist or Read is selected on the dropdown
                const bookObj = {
                    id: userBook.id,
                    userId: currentUser.id,
                    bookId: book.bookId,
                    percentRead: statusValue
                }
                console.log("updating user book")
                updateUserBook(bookObj).then(() => { //updates already existing relationship
                    getAndSetUserBook()
                })

            }
        } else { //if the user DOES NOT HAVE a relationship with the book
            if (statusValue === -1) {
                console.log("do nothing!") //when none is pressed.
            } else {
                const bookObj = {
                    userId: currentUser.id,
                    bookId: book.bookId,
                    percentRead: statusValue
                }
                console.log("creating user book")
                createUserBook(bookObj).then(() => { //creates that userBook relationship
                    getAndSetUserBook()
                })

            }
        }

    }

    const handleClick = (e) => {
        navigate(`/thekeep/review/writeReview/${book.id}`)
    }

    return (
        <>
            <main className="bp-whole">
                <section className="bp-top">
                    <article className="bp-cover-rating-container">
                        <div className="bp-cover">
                            <img
                                className="bp-cover-img"
                                width={320}
                                height={480}
                                alt=""
                                src={book.bookImg}
                            />
                        </div>
                        {/* {userReview ? ( //this isnt working how i wish it would
                            <div className="bp-rating">
                            <StyledEngineProvider injectFirst>
                                <Stack spacing={1}>
                                    <Rating className="bp-rating-2" name="half-rating-read" size="large" value={userReview.rating} precision={0.5} readOnly />
                                </Stack>
                            </StyledEngineProvider>
                        </div>
                        ): (
                            <div className="bp-rating">
                            <StyledEngineProvider injectFirst>
                                <Stack spacing={1}>
                                    <Rating disabled className="bp-rating-2" name="half-rating-read" size="large" defaultValue={0} precision={0.5} readOnly />
                                </Stack>
                            </StyledEngineProvider>
                        </div>
                        )} */}

                        
                    </article>
                    <article className="bp-title-status-desc-container">
                        <div className="bp-title-author-status">
                            <Typography className="bp-title" variant="h3">
                                {book.bookName}
                            </Typography>
                            <div className="bp-status">
                                <Box>
                                    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={status}
                                        onChange={handleChange}
                                        label="Status"
                                        sx={{ width: 120, height: 40 }}
                                    >
                                        <MenuItem value={-1}>
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={0}>Readlist</MenuItem>
                                        <MenuItem value={1}>Reading</MenuItem>
                                        <MenuItem value={100}>Read</MenuItem>
                                    </Select>
                                </Box>
                            </div>
                            <Typography className="bp-author" variant="h5">
                                {book.bookAuthor}
                            </Typography>
                        </div>

                        <div className="bp-desc">
                            {book.bookDescription}
                        </div>
                    </article>
                </section>

                <section className="bp-bottom">

                    <article className="bp-reviews">

                        <div className="bp-r-header">
                            Reviews
                            {userBook?.percentRead === 100 && !userReview ? (
                                <div className="bp-write">
                                    <StyledEngineProvider injectFirst>
                                        <Button onClick={handleClick} className="bp-write-btn" type="button" variant="contained">Write Review</Button>
                                    </StyledEngineProvider>
                                </div>
                            ) : ("")}
                        </div>

                        <div className="r-list-div">
                            <ReviewList reviews={reviews} />
                        </div>

                    </article>
                </section>
            </main>
        </>
    )
}