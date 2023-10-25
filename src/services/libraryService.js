export const getLibraryByUserId = (userId) => {
    return fetch(`http://localhost:8088/userBooks?userId=${userId}`).then(
        (res) => res.json()
    )
}