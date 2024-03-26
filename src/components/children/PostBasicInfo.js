import React, { useEffect, useState } from 'react'
import CustomButton from '../custom/CustomButton'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import supabase from '../../route/Client';
import { CircularProgress } from '@mui/material';
import { movieDataValidation } from '../../functions/dataValidation';
import { useNavigate } from 'react-router-dom';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const PostBasicInfo = () => {
    const [imageLoading, setImageLoading] = useState(false)
    const [movieData, setMovieData] = useState({})
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const movieData = JSON.parse(localStorage.getItem('movieData'))
        if (movieData) {
            //for the edit mode
            if(movieData.poster) movieData.image = movieData.poster
            setMovieData(movieData)
        }
    }, [])

    const handleUploadImage = async (e) => {
        setImageLoading(true)
        let file = e.target.files[0];
        const fileName = document.getElementById('file-name');
        if (file) {
            fileName.textContent = file.name;
        } else {
            fileName.textContent = 'No file selected';
        }
        const { data, error } = await supabase
            .storage
            .from('Images')
            .upload('Reviews/' + file.name, file, {
                cacheControl: '3600',
                upsert: false
            })
        if (data) {
            let temp = { ...movieData };
            temp.image = 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/' + data.path
            setMovieData(temp)
            setImageLoading(false)


            //Looks like it works
        } else if (error.error === 'Duplicate') {
            let temp = { ...movieData };
            temp.image = 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Reviews/' + file.name
            setMovieData(temp)
            setImageLoading(false)
        } else {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setMovieData({ ...movieData, [id]: value })
    }

    const handleContinue = (e) => {
        console.log(movieData)
        e.preventDefault()
        console.log(movieData)
        const errors = movieDataValidation(movieData)
        if (Object.keys(errors).length > 0) {
            setErrors(errors)
            return
        }
        setErrors({})
        localStorage.setItem('movieData', JSON.stringify(movieData))
        navigate('/post/review-body')    
    }
    return (
        <div>
            <form className='flex flex-col space-y-2' onSubmit={(e) => handleContinue(e)}>

                <div className='grid grid-cols-3 gap-3'>
                    <div className='flex flex-col gap-2 sm:col-span-1 col-span-3'>
                        <label className='text-light-white font-semibold'>Title</label>
                        <input type='text' placeholder='Enter the movie title...' id='title' onChange={(e) => handleChange(e)} value={movieData.title}/>
                        {errors.title && <p className='text-red-500 col-span-12 text-center'><ReportGmailerrorredIcon className='mb-1'/> {errors.title}</p>}

                    </div>
                    <div className='flex flex-col gap-2 sm:col-span-1 col-span-3'>
                        <label className='text-light-white font-semibold'>Release Year</label>
                        <input type='text' placeholder='Enter the release year...' id='year' onChange={(e) => handleChange(e)} value={movieData.year}/>
                        {errors.year && <p className='text-red-500 col-span-12 text-center'><ReportGmailerrorredIcon className='mb-1'/> {errors.year}</p>}
                    </div>
                    <div className='flex flex-col gap-2 sm:col-span-1 col-span-3'>
                        <label className='text-light-white font-semibold'>Rating</label>
                        <input type='text' placeholder='Enter the movie rating...' id='rating' onChange={(e) => handleChange(e)} value={movieData.rating}/>
                        {errors.rating && <p className='text-red-500 col-span-12 text-center'><ReportGmailerrorredIcon className='mb-1'/> {errors.rating}</p>}
                    </div>
                </div>

                <label className='text-light-white font-semibold'>Review Title</label>
                <input type='text' placeholder='Enter your review title...' id='review_title' onChange={(e) => handleChange(e)} value={movieData.review_title}/>
                {errors.review && <p className='text-red-500 col-span-12 text-center'><ReportGmailerrorredIcon className='mb-1'/> {errors.review}</p>}

                <label className='text-light-white font-semibold'>Trailer</label>
                <input type='text' placeholder='Enter the movie trailer link...' id='trailer' onChange={(e) => handleChange(e)} value={movieData.trailer}/>
                {errors.trailer && <p className='text-red-500 col-span-12 text-center'><ReportGmailerrorredIcon className='mb-1'/> {errors.trailer}</p>}

                <div className='space-y-2'>
                    <label className='text-light-white font-semibold'>Movie Poster</label>
                    {imageLoading ? <CircularProgress /> :
                        <img src={movieData.image ? movieData.image : require('../../media/images/placeholder.jpg')} className='h-[300px] w-[250px] object-cover' alt='movie poster' />
                    }
                    <label htmlFor='file-input'>
                        <span id="file-name" className='text-light-white cursor-pointer hover:text-pink'><FileUploadIcon />{movieData.image ? movieData.image : 'No file selected'} </span>
                        <input type="file" id="file-input" className='hidden ' onChange={(e) => handleUploadImage(e)}/>
                    </label>
                    {errors.image && <p className='text-red-500 col-span-12'><ReportGmailerrorredIcon className='mb-1'/> {errors.image}</p>}
                </div>

                <CustomButton text={'Continue'} />
            </form>
        </div>
    )
}

export default PostBasicInfo