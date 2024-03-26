export const sortReviews = (reviews, sort) => {
    let results = []
    switch (sort) {
        case 'recent':
            results = reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            break
        case 'z-a':
            results = reviews.sort((a, b) => b.title.localeCompare(a.title))
            break
        case 'a-z':
            results = reviews.sort((a, b) => a.title.localeCompare(b.title))
            break
        case 'year-oldest-first':
            results = reviews.sort((a, b) => a.year - b.year)
            break
        case 'year-newest-first':
            results = reviews.sort((a, b) => b.year - a.year)
            break
        case 'rating-highest-first':
            results = reviews.sort((a, b) => b.rating - a.rating)
            break
        case 'rating-lowest-first':
            results = reviews.sort((a, b) => a.rating - b.rating)
            break
        case 'default':
            results = reviews
            break
        default:
            results = reviews
            break
    }
    return results
}
