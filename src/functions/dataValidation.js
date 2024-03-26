export const movieDataValidation = (data) => {
    let errors = {}

    let dataRating = parseInt(data.rating)
    let dataYear = parseInt(data.year)

    if (!data.title) {
        errors.title = 'Title is required'
    } else if
        (data.title.length < 3 && data.title.length > 0) {
        errors.title = 'Title must be at least 3 characters'
    } else if
        (data.title.length > 50) {
        errors.title = 'Title must be less than 50 characters'
    }



    if (!dataYear) {
        errors.year = 'Year is required'
    }
    else if (dataYear < 1800 || dataYear > 2024) {
        errors.year = 'Please provide a valid year'
    }


    if (!dataRating) {
        errors.rating = 'Rating is required'
    }
    else if (dataRating < 0 || dataRating > 10) {
        errors.rating = 'Rating must be between 0 and 10'
    }


    if (!data.review_title) {
        errors.review = 'Review title is required'
    }
    else if (data.review_title.length < 15) {
        errors.review = 'Review title must be at least 15 characters'
    }
    else if (data.review_title.length > 70) {
        errors.review = 'Review title must be less than 70 characters'
    }

    if (!data.trailer) {
        errors.trailer = 'Trailer link is required'
    }
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/|youtu\.be\/)/

    if (data.trailer) {
        if (regex.test(data.trailer) === false) {
            errors.trailer = 'Trailer link is invalid'
        }
    }

    if (!data.image) {
        errors.image = 'Movie poster is required'
    }
    return errors
}

export const userDataValidation = (data) => {

    const fbRegex = /^https:\/\/www\.facebook\.com\//;
    const instaRegex = /^https:\/\/www\.instagram\.com\//;

    let errors = {}

    if (!data.name) {
        errors.name = 'Name is required'
    }
    if (data.name.length > 30) {
        errors.name = 'Name must be less than 30 characters'
    }
    if (data.name.length < 3 && data.name.length > 0) {
        errors.name = 'Name must be at least 3 characters'
    }
    if (data.surname.length > 30) {
        errors.surname = 'Surname must be less than 30 characters'
    }
    if (data.surname.length < 3) {
        errors.surname = 'Surname must be at least 3 characters'
    }
    if (data.motto.length > 100) {
        errors.motto = 'Motto must be less than 100 characters'
    }
    if (data.motto.length < 10) {
        errors.motto = 'Motto must be at least 10 characters'
    }
    if (fbRegex.test(data.facebook) === false) {
        errors.facebook = 'Facebook link is invalid'
    }
    if (instaRegex.test(data.instagram) === false) {
        errors.instagram = 'Instagram link is invalid'
    }
    if (data.description.length > 650) {
        errors.description = 'Description must be less than 650 characters'
    }
    if (data.description.length < 10) {
        errors.description = 'Description must be at least 10 characters'
    }
    return errors
}

export const movieBodyValidation = (data) => {
    let errors = {}
    let errorsExist = false
    data.forEach((paragraph, index) => {
        errors[index] = {}
        if (!paragraph.subtitle) {
            errors[index].subtitle = 'Subtitle is required'
            errorsExist = true
        }
        if (paragraph.subtitle.length > 50) {
            errors[index].subtitle = 'Subtitle must be less than 50 characters'
            errorsExist = true
        }
        if (paragraph.subtitle.length < 3 && paragraph.subtitle.length > 0) {
            errors[index].subtitle = 'Subtitle must be at least 3 characters'
            errorsExist = true
        }
        if (!paragraph.paragraph) {
            errors[index].paragraph = 'Paragraph is required'
            errorsExist = true
        }
        if (paragraph.paragraph.length < 10 && paragraph.paragraph.length > 0) {
            errors[index].paragraph = 'Paragraph must be at least 10 characters'
            errorsExist = true
        }
        if (paragraph.paragraph.length > 1200) {
            errors[index].paragraph = 'Paragraph must be less than 1200 characters'
            errorsExist = true
        }
    })
    
    return { errors, errorsExist }
}