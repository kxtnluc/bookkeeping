import { Button, Rating, StyledEngineProvider, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { createReview } from "../../services/reviewService"


export const WriteReview = ({currentUser}) => {

    const { keepId } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [rating, setRating] = useState(0)


    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }

    const handleRatingClick = (e) => {
        setRating(parseFloat(e.target.value))
    }

    const handleSubmitBtn = () => {
        const reviewObj = {
            thekeepId: parseInt(keepId),
            userId: currentUser.id,
            title: title,
            body: body,
            rating: rating
        }
        createReview(reviewObj)
        navigate("/thekeep")
    }

    return (
        <>

            <form className="wrp-whole">
                <section className="wrp-header">
                    Write Your Review
                </section>

                <div className="wrp-inputs">
                    <div className="wrp-title">
                        <StyledEngineProvider injectFirst>
                            <TextField variant="standard" onChange={handleTitleChange} inputProps={{ maxLength: 50}} className="wrp-title-input" label="Title..." />
                        </StyledEngineProvider>
                    </div>
                    <div className="wrp-body">
                        <StyledEngineProvider injectFirst>
                            <TextField onChange={handleBodyChange} className="wrp-body-input" multiline rows={20} maxRows={20} placeholder="Body..." />
                        </StyledEngineProvider>
                    </div>
                    <div className="wrp-rating">
                        <Rating precision={0.5} onClick={handleRatingClick}/>
                    </div>
                </div>

                <section className="wrp-submit">
                    <StyledEngineProvider injectFirst>
                        <Button onClick={handleSubmitBtn} type="button" className="wrp-submit-btn" variant="contained">Submit</Button>
                    </StyledEngineProvider>
                </section>

            </form>

        </>
    )
}