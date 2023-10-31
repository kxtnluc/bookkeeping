import { Link } from "react-router-dom"

export const ReviewList = ({reviews}) => {

    

    return (
        <>
            <ul className="r-list">
                {reviews.map((r) => {
                    if(r.title !== ""){
                        return (
                            
                            <li key={r.id} className="r-list-item">
                                <Link to={`/profile/${r.user.id}`} className="r-username">
                                    {r.user.username}
                                </Link>
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
                    } else {
                        return ""
                    }
                })}
            </ul>
        </>
    )
}