import { Box, Button, StyledEngineProvider, TextField } from "@mui/material"
import "./SearchBar.css"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { getBookBySelfLink, getBooksByTitle } from "../../../services/googleBooksService"

export const SearchBar = () => {

    const navigate = useNavigate()

    const [searchInput, setSearchInput] = useState("")

    const handleSearchChange = (e) => {
        const input = (e.target.value)
        setSearchInput(input)
    }

    const handleSearchClick = (e) => {
        e.preventDefault()
        if(searchInput !== ""){
            const inputAltered = searchInput.replace(/\s/g, "+")
            getBooksByTitle(inputAltered, 1).then((bArray) => {
    
                const bookItem = bArray.items[0]
    
                getBookBySelfLink(bookItem.selfLink).then((bookObj) => {
                    const navigateURL = `/thekeep/book/${bookObj.id}`
                    navigate(navigateURL)
                }) 
            })
        } else {
            window.alert("please put a search term in first!")
        }
    }

    return (
        <form onSubmit={handleSearchClick}>
            <StyledEngineProvider injectFirst>
                <Box className="btn-bar-container">
                    <Box className="btn-container">
                        <Button 
                            variant="outlined" 
                            className="keep-search-btn"
                            type="submit"
                        >
                            Search
                        </Button>
                    </Box>
                    <Box>
                        <TextField 
                            sx={{ input: { color: 'green', fontWeight: 600 } }} 
                            variant="standard" 
                            className="keep-search" 
                            label="Quick Search. . ." 
                            onChange={handleSearchChange}
                            helperText="Please enter a full book title"
                        />
                    </Box>
                </Box>
            </StyledEngineProvider>
            </form>
    )
}