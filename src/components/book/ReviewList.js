import { useEffect, useState } from "react"
import { getReviewsWithKeep } from "../../services/reviewService"
import { Link } from "react-router-dom"

export const ReviewList = ({keepId}) => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getReviewsWithKeep().then((rArray) => {
            console.log(keepId + "\n" + JSON.stringify(rArray[0].id))
            const filteredArray = rArray.filter((r) => r.thekeepId === keepId)
            console.log(filteredArray)
            setReviews(filteredArray)
        })
    }, [keepId])

    return (
        <>
            <ul className="r-list">
                {reviews.map((r) => {
                    return (
                        <>
                        <li className="r-list-item">
                            <div className="r-username">
                                {r.user.username}
                            </div>
                            <Link to={`/thekeep/review/${r.id}`}>
                                <div className="r-inside">
                                    <div className="r-title">
                                        {r.title}
                                    </div>
                                    <div className="r-rating">
                                        {r.rating}
                                    </div>
                                </div>

                            </Link>
                        </li>
                        </>
                    )
                })}
            </ul>
        </>
    )
}