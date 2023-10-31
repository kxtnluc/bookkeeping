import { Button, StyledEngineProvider, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import { getUserById, updateUserProfile } from "../../services/userService"
import "./Profile.css"

export const Profile = ({currentUser}) => {

    const {userId} = useParams()

    const [user, setUser] = useState({})
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        getUserById(userId).then((userObj) => {
            setUser(userObj)
        })
        console.log(userId,currentUser.id)
    }, [])

    const handleEditBtn = () => {
        setEditMode(!editMode)
    }

    const handleSaveBtn = () => {
        updateUserProfile(user)
        setEditMode(!editMode)
    }

    const handleInputChange = (e) => {
        const stateCopy = {...user}
        stateCopy[e.target.name] = e.target.value
        setUser(stateCopy)
    }

    return (
        <>  {editMode ? (
            <div className="pp-whole">
                
                <StyledEngineProvider injectFirst>
                    <div className="pp-username-edit-container">
                        <input name="username" onChange={handleInputChange} value={user.username} className="pp-username-edit"/>
                    </div>
                </StyledEngineProvider>

                <Typography className="pp-email" variant="h3">
                    {user.email}
                </Typography>
                {currentUser.id === parseInt(userId) ? (
                    <StyledEngineProvider injectFirst>
                        <Button className="pp-save-btn" variant="outlined" onClick={handleSaveBtn}>
                            Save
                        </Button>
                    </StyledEngineProvider>
                ):("")}
            </div>
        ):(
            <div className="pp-whole">
                <Typography className="pp-username" variant="h1">
                    {user.username}
                </Typography>
                <Typography className="pp-email" variant="h3">
                    {user.email}
                </Typography>
                {currentUser.id === parseInt(userId) ? (
                    <StyledEngineProvider injectFirst>
                        <Button className="pp-edit-btn" variant="outlined" onClick={handleEditBtn}>
                            Edit
                        </Button>
                    </StyledEngineProvider>
                ):("")}
            </div>
        )}
            
        </>
    )
}