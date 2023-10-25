export const getUserBooks = () => {
    return fetch(`http://localhost:8088/userBooks`).then(
        (res) => res.json()
    )
}



export const getUserBookByUserAndBookId = (bookId, userId) => {
    return fetch(`http://localhost:8088/userBooks?userId=${userId}&bookId=${bookId}`).then(
        (res) => res.json()
    ) //example link: http://localhost:8088/userBooks?userId=1&bookId=48eNEAAAQBAJ
}

export const createUserBook = (userBookObj) => {
    return fetch (`http://localhost:8088/userBooks/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userBookObj)
    })
}

export const updateUserBook = (userBookObj) => {
    return fetch (`http://localhost:8088/userBooks/${userBookObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userBookObj)
    })
}

export const deleteUserBook = (userBookId) => {
    return fetch (`http://localhost:8088/userBooks/${userBookId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}