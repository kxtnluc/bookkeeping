export const getReviewsWithKeep = () => {
    return fetch(`http://localhost:8088/reviews?_expand=user&_expand=thekeep`).then(
        (res) => res.json()
    )
}

export const getReviewById = (reviewId) => {
    return fetch(`http://localhost:8088/reviews?_expand=user&_expand=thekeep&id=${reviewId}`).then(
        (res) => res.json()
    )
}

export const createReview = (reviewObj) => {
    return fetch("http://localhost:8088/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewObj)
    })
}