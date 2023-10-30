export const getKeep = () => {
    return fetch(`http://localhost:8088/thekeeps`).then(
        (res) => res.json()
    )
}

export const getKeepByBookId = (bookId) => {
    return fetch(`http://localhost:8088/thekeeps?bookId=${bookId}`).then(
        (res) => res.json()
    )
}

export const addToKeep = (bookObj) => {
    return fetch(`http://localhost:8088/thekeeps`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookObj)
    })
}

export const updateKeepEntry = (bookObj) => {
    return fetch(`http://localhost:8088/thekeeps/${bookObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookObj)
    })
}

export const removeFromKeep = (bookId) => {
    return fetch(`http://localhost:8088/thekeeps/${bookId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}