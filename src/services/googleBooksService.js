const apiKey = 'AIzaSyBvtNIDO-z9iA3HOgVgZC1bFk_suG5y_GU'

//id for C&P:
//48eNEAAAQBAJ

//example byId link:
//https://www.googleapis.com/books/v1/volumes/48eNEAAAQBAJ

//==============================================================By Title (list)====================================================================
export const getBooksByTitle = (title, listSize = 10) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&maxResults=${listSize}&key=${apiKey}`).then(
        (res) => res.json()
    )
}
//==============================================================By Id (singular)====================================================================
export const getBookById = (bookId) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`).then(
        (res) => res.json()
    )
}

//==============================================================SELFLINK====================================================================
export const getBookBySelfLink = (selfLink) => {
    return fetch(selfLink).then(
        (res) => res.json()
    )
}

//=============================================================