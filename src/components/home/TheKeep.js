import { StyledEngineProvider, Typography } from "@mui/material"
import { SearchBar } from "./filters/SearchBar"
import "./TheKeep.css"
import { KeepList } from "./KeepList"

export const TheKeep = () => {

    return (
        <>  
            <StyledEngineProvider injectFirst>
                <Typography variant="h1" className="keep-header">
                    THE KEEP
                </Typography>
            </StyledEngineProvider>

            <div className="filter-container">
                <SearchBar />
            </div>

            <div>
                <KeepList />
            </div>

        </>
    )
}