import { Button, Rating, StyledEngineProvider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { deleteReview, getReviewById } from "../../services/reviewService"
import "./ReviewPage.css"


export const ReviewPage = ({ currentUser }) => {

    const { reviewId } = useParams()
    const navigate = useNavigate()

    const [review, setReview] = useState({})

    useEffect(() => {
        getReviewById(reviewId).then((rArray) => {
            setReview(rArray[0])
        })
    }, [])

    const handleEditClick = () => {
        navigate(`/thekeep/review/editReview/${review.id}`)
    }

    const handleDeleteClick = () => {
        deleteReview(reviewId)
        navigate(`/thekeep`)
    }

    return (
        <>
            <main className="rp-whole">
                <section className="rp-title-rating-container">
                    <Typography className="rp-title" variant="h2">
                        {review.title}
                    </Typography>
                    <div className="rp-rating">
                        {review.rating}
                        {/* <Rating readOnly value={review.rating} /> */}
                    </div>
                    <div className="rp-genre">
                        {review.genre?.name}
                        {/* <Rating readOnly value={review.rating} /> */}
                    </div>
                </section>

                <section className="rp-body">
                    {review.body}
                </section>
                {review.userId === currentUser.id ? (
                    <section className="rp-edit">

                        <StyledEngineProvider injectFirst>
                            <Button onClick={handleEditClick} className="rp-edit-btn" variant="contained" type="button">Edit</Button>
                        </StyledEngineProvider>

                        <StyledEngineProvider injectFirst>
                            <Button onClick={handleDeleteClick} className="rp-delete-btn" variant="contained" type="button">Delete</Button>
                        </StyledEngineProvider>
                    </section>
                ) : ("")}

            </main>
        </>
    )
}