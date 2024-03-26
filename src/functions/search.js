export const searchReviews = (reviews, query) => {
    if(!query) return []
    const results = reviews.filter((review) => {
        const title = review.title.toLowerCase()
        const searchQuery = query.toLowerCase()
        return title.includes(searchQuery) 
    })
    let resultsTitles = []
    results.map((review) => 
        resultsTitles.push({id: review.id, title: review.title + ' (' + review.year + ')'})
    )
    if (resultsTitles.length === 0) {
        resultsTitles.push({title:'No results found'})
    }
    return resultsTitles
}