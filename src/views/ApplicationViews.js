import { UserView } from './UserView';
import { useEffect, useState } from 'react';


export const ApplicationViews = () => {

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {

        const localBookUser=  localStorage.getItem("bookkeep_user")
        const bookUserObj = JSON.parse(localBookUser)

        setCurrentUser(bookUserObj)


    }, [])

    return <UserView currentUser={currentUser} /> 
}