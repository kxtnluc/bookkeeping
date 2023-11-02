import { Box, Button, StyledEngineProvider, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import "./SearchPage.css"
import { getBookByQuerry } from "../../services/googleBooksService"
import { Link } from "react-router-dom"
import { getKeep } from "../../services/theKeepService"

export const SearchPage = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publisher, setPublisher] = useState('')
    const [isbn, setIsbn] = useState(0)

    const [foundItems, setFoundItems] = useState([])

    const [keep, setKeep] = useState([])

    const [foundKeeps, setFoundKeeps] = useState([])


    useEffect(() => {
        getKeep().then((kArray) => {
            setKeep(kArray)
            // console.log(kArray)
            let arrayOfKeepsToKeep = []
            for (const k of kArray) {
                const keepToKeep = foundItems.find((fi) => fi.id === k.bookId)
                if (keepToKeep) {
                    arrayOfKeepsToKeep.push(keepToKeep)
                }
            }
            console.log(arrayOfKeepsToKeep)
            setFoundKeeps(arrayOfKeepsToKeep)
        })
    }, [foundItems])


    const handleTitleChange = (e) => {
        const input = e.target.value
        setTitle(input)
    }

    const handleAuthorChange = (e) => {
        const input = e.target.value
        setAuthor(input)
    }

    const handlePublisherChange = (e) => {
        const input = e.target.value
        setPublisher(input)
    }

    const handleISBNChange = (e) => {
        const input = e.target.value
        setIsbn(input)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let querry = 'q='

        if (title) {
            const alteredInput = title.replace(/\s/g, "+")
            querry += `+intitle:${alteredInput}`
        }
        if (author) {
            const alteredInput = author.replace(/\s/g, "+")
            querry += `+inauthor:${alteredInput}`
        }
        if (publisher) {
            const alteredInput = publisher.replace(/\s/g, "+")
            querry += `+inpublisher:${alteredInput}`
        }
        if (isbn) {
            querry += `+isbn:${isbn}`
        }



        if (querry !== 'q=') {
            getBookByQuerry(querry).then((bArray) => {
                // console.log(bArray.items)
                setFoundItems(bArray.items)
            })
        } else {

        }


    }

    return (
        <form onSubmit={handleSubmit} className="lb-whole">
            <StyledEngineProvider injectFirst>
                <Typography className="lb-header" variant="h1">
                    SEARCH
                </Typography>
            </StyledEngineProvider>

            <section className="sp-input-section">
                <article className="sp-title">
                    <TextField
                        name="setTitle"
                        className="sp-title-input"
                        variant="standard"
                        label='Title'
                        color="success"
                        onChange={handleTitleChange}
                        sx={
                            {
                                width: 300,
                            }
                        }
                    />
                </article>
                <article className="sp-author">
                    <TextField
                        name="author"
                        className="sp-author-input"
                        variant="standard"
                        label='Author'
                        color="success"
                        onChange={handleAuthorChange}
                        sx={
                            {
                                width: 300,
                            }
                        }
                    />
                </article>
                <article className="sp-publisher">
                    <TextField
                        name="publisher"
                        className="sp-publisher-input"
                        variant="standard"
                        label='Publisher'
                        color="success"
                        onChange={handlePublisherChange}
                        sx={
                            {
                                width: 300,
                            }
                        }
                    />
                </article>
                <article className="sp-isbn">
                    <TextField
                        name="isbn"
                        className="sp-isbn-input"
                        type="number"
                        variant="filled"
                        label='ISBN'
                        color="success"
                        onChange={handleISBNChange}
                        sx={
                            {
                                width: 200,
                            }
                        }
                    />
                </article>
                <article>
                    <Box className="sp-btn-box">
                        <Button
                            variant="outlined"
                            className="sp-search-btn"
                            type="submit"
                            color="success"
                        >
                            Search
                        </Button>
                    </Box>
                </article>
            </section>
            <section className="sp-display-section">
                <div className="sp-list-header">
                    RESULTS
                </div>
                <ul className="sp-list">
                    {foundKeeps.map((fk) => {
                        return (
                            <Link key={fk.id} className="link" to={`/thekeep/book/${fk.id}`}>
                                <li className='sp-list-item-k'>
                                    <div className='sp-li-id-k'>
                                        {fk.id}
                                        <div className='sp-li-keep-k'>
                                            IN KEEP!
                                        </div>
                                    </div>
                                    <div className='sp-li-title-k'>
                                        {fk.volumeInfo?.title}
                                    </div>
                                    <div className='sp-li-authors-k'>
                                        {fk.volumeInfo?.authors}
                                    </div>
                                </li>
                            </Link>
                        )
                    })}
                    {foundItems.map((fi) => {
                        return (
                            <Link key={fi.id} className="link" to={`/thekeep/book/${fi.id}`}>
                                <li className='sp-list-item'>
                                    <div className='sp-li-id'>
                                        {fi.id}
                                    </div>
                                    <div className='sp-li-title'>
                                        {fi.volumeInfo?.title}
                                    </div>
                                    <div className='sp-li-authors'>
                                        {fi.volumeInfo?.authors}
                                    </div>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </section>
        </form>
    )
}