import { Box, Button, InputLabel, MenuItem, Rating, Select, StyledEngineProvider, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { createReview } from "../../services/reviewService"
import { getGenres } from "../../services/genreService"


export const WriteReview = ({currentUser}) => {

    const { keepId } = useParams()
    const navigate = useNavigate()

    const [genreList, setGenreList] = useState([])


    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [rating, setRating] = useState(0)
    const [genre, setGenre] = useState(0)


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

    const handleGenreChange = (e) => {
        console.log(e.target.value)
        setGenre(e.target.value)
    }

    const handleSubmitBtn = () => {
        const reviewObj = {
            thekeepId: parseInt(keepId),
            userId: currentUser.id,
            title: title,
            body: body,
            genreId: genre,
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
                        <Rating precision={0.5} onClick={handleRatingClick}/>
                    </div>
                </div>

                <section className="wrp-submit">
                {rating !== 0 ? (
                        <StyledEngineProvider injectFirst>
                            <Button onClick={handleSubmitBtn} type="button" className="wrp-submit-btn" variant="contained">Submit</Button>
                        </StyledEngineProvider>
                    ):(
                        <StyledEngineProvider injectFirst>
                            <Button disabled onClick={handleSubmitBtn} type="button" className="wrp-submit-btn" variant="contained">Submit</Button>
                        </StyledEngineProvider>
                    )}
                </section>

            </form>

        </>
    )
}