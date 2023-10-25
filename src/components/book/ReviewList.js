import { Link } from "react-router-dom"

export const ReviewList = ({reviews}) => {

    

    return (
        <>
            <ul className="r-list">
                {reviews.map((r) => {
                    return (
                        <li key={r.id} className="r-list-item">
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
                    )
                })}
            </ul>
        </>
    )
}