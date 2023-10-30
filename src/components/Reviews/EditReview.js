import { Box, Button, InputLabel, Menu, MenuItem, Rating, Select, StyledEngineProvider, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { updateReview, getReviewById } from "../../services/reviewService"
import { getGenres } from "../../services/genreService"


export const EditReview = ({ currentUser }) => {

    const { reviewId } = useParams()
    const navigate = useNavigate()

    const [review, setReview] = useState({})
    const [genreList, setGenreList] = useState([])

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [rating, setRating] = useState(0)
    const [genre, setGenre] = useState(0)

    useEffect(() => {
        getReviewById(reviewId).then((rArray) => {
            setReview(rArray[0])

            setTitle(rArray[0].title)
            setBody(rArray[0].body)
            setRating(rArray[0].rating)
        })


    }, [reviewId])

    useEffect(() => {
        getGenres().then((gArray) => {
            setGenreList(gArray)
        })
    }, [])


    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }

    const handleRatingClick = (e) => {
        setRating(parseFloat(e.target.value))
    }

    const handleSubmitEditBtn = () => {
        const reviewObj = {
            id: parseInt(reviewId),
            thekeepId: review.thekeepId,
            userId: currentUser.id,
            title: title,
            body: body,
            genreId: genre,
            rating: rating
        }
        console.log(reviewObj)
        updateReview(reviewObj)
        navigate("/thekeep")
    }

    const handleGenreChange = (e) => {
        console.log(e.target.value)
        setGenre(e.target.value)
    }

    return (
        <>

            <form className="wrp-whole">
                <section className="wrp-header">
                    Edit Your Review
                </section>

                <div className="wrp-inputs">
                    <div className="wrp-title">
                        <StyledEngineProvider injectFirst>
                            <TextField value={title} variant="standard" onChange={handleTitleChange} inputProps={{ maxLength: 50 }} className="wrp-title-input" placeholder="Title..." />
                        </StyledEngineProvider>
                    </div>
                    <div className="wrp-body">
                        <StyledEngineProvider injectFirst>
                            <TextField value={body} onChange={handleBodyChange} className="wrp-body-input" multiline rows={20} maxRows={20} placeholder="Body..." />
                        </StyledEngineProvider>
                    </div>
                    <div className="wrp-genre">
                        <Box>
                            <InputLabel id="genre-label">Genre</InputLabel>
                            <Select
                                labelId="genre-label"
                                id="genre-select"
                                value={genre}
                                onChange={handleGenreChange}
                                label="Status"
                                sx={{ width: 120, height: 40 }}
                            >
                                    <MenuItem value={-1}>
                                        <em>None</em>
                                    </MenuItem>
                                    {genreList.map((g) => {
                                        return (
                                                <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
                                                )
                                        })}
                            </Select>
                        </Box>
                    </div>
                    <div className="wrp-rating">
                        <Rating value={rating} precision={0.5} onClick={handleRatingClick} />
                    </div>
                </div>

                <section className="wrp-submit">
                    {rating !== 0 ? (
                        <StyledEngineProvider injectFirst>
                            <Button onClick={handleSubmitEditBtn} type="button" className="wrp-submit-btn" variant="contained">Submit</Button>
                        </StyledEngineProvider>
                    ) : (
                        <StyledEngineProvider injectFirst>
                            <Button disabled onClick={handleSubmitEditBtn} type="button" className="wrp-submit-btn" variant="contained">Submit</Button>
                        </StyledEngineProvider>
                    )}

                </section>

            </form>

        </>
    )
}