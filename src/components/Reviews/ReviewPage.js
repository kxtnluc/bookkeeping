import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getReviewById } from "../../services/reviewService"
import "./ReviewPage.css"


export const ReviewPage = () => {

    const { reviewId } = useParams()

    const [review, setReview] = useState({})

    useEffect(() => {
        getReviewById(reviewId).then((rArray) => {
            setReview(rArray[0])
        })
    }, [])

    return (
        <>
            <main className="rp-whole">
                <section className="rp-title-rating-container">
                    <Typography className="rp-title" variant="h2">
                        {review.title}
                    </Typography>
                    <div className="rp-rating">
                        {review.rating}
                    </div>
                </section>

                <section className="rp-body">
                    {review.body}
                </section>
            </main>
        </>
    )
}