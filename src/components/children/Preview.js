import React, { useContext, useEffect, useState } from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from '../custom/CustomButton';
import supabase from '../../route/Client';
import { User } from '../../route/App';
import WriterCard from './WriterCard';


const Preview = () => {
    const navigate = useNavigate()
    const { user } = useContext(User)
    const [embedTrailer, setEmbedTrailer] = useState('')

    const review = JSON.parse(localStorage.getItem('movieData'))

    useEffect(() => {
        if(review.edit){
            setEmbedTrailer(review.trailer)
            return
        }
        const pattern = /https:\/\/www\.youtube\.com\/watch\?v=([^&]+)/;
        const match = review.trailer.match(pattern);
        console.log(review.trailer)
        setEmbedTrailer(match[0].replace('watch?v=', 'embed/'))
    }, [])

    const date = new Date().toLocaleDateString()

    const handleUpload = async () => {
        if (review.edit) {
            const { data, error } = await supabase
                .from('reviews')
                .update({
                    title: review.title,
                    year: review.year,
                    trailer: embedTrailer,
                    rating: review.rating,
                    review_title: review.review_title,
                    introduction: review.introduction,
                    body: review.movieBody,
                    poster: review.image,
                    writer_email: user.email
                })
                .eq('id', review.id)
            if (error) {
                console.log(error)
            } else {
                console.log(data)
            }
            localStorage.removeItem('movieData')
            navigate('/')
            return
        }
        const { data, error } = await supabase
            .from('reviews')
            .insert([
                {
                    title: review.title,
                    year: review.year,
                    trailer: embedTrailer,
                    rating: review.rating,
                    review_title: review.review_title,
                    introduction: review.introduction,
                    body: review.movieBody,
                    poster: review.image,
                    writer_email: user.email
                }
            ])
        if (error) {
            console.log(error)
        } else {
            console.log(data)
        }
        localStorage.removeItem('movieData')
        navigate('/')
    }
    return (
        <section className='flex justify-center text-light-white'>
            <div className='container space-y-5 sm:mx-0 mx-2 sm:p-16 p-1'>

                <button className='border-4 sm:text-xl text-base border-pink bg-dark-gray text-light-white font-semibold sm:px-8 sm:py-2 px-3 py-1 sm:hover:bg-pink sm:hover:text-dark-gray transition-colors duration-200' onClick={() => navigate('/post/review-body')}><ArrowBackIcon className='mb-1' /> Back</button>

                <div className='w-full bg-pink text-light-white font-semibold'>
                    <h1 className='text-center text-2xl'>Preview Mode</h1>
                </div>
                <h1 className=' text-3xl  font-semibold'>{review.title}({review.year}): <span className='text-pink'>"{review.review_title}"</span></h1>
                <div className='flex gap-2 justify-between'>
                    <p className="text-gray-400 text-lg italic ">{date}</p>
                    <p className="text-gray-400 text-lg italic "><VisibilityIcon /> 369 views</p>
                </div>

                <div className='max-w-full relative h-0 overflow-hidden pb-[56.25%]'>
                    <iframe width="560" height="315" src={embedTrailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className='absolute top-0 left-0 w-full h-full'></iframe>
                </div>

                <div className='flex gap-1 items-center'>
                    <h2 className='font-semibold sm:text-5xl text-2xl'>{review.rating}/10</h2>
                    <StarRateIcon className='text-pink' fontSize='large' />
                </div>
                <p className='sm:text-xl text-lg font-light'>{review.introduction}</p>
                {review.movieBody && review.movieBody.map((paragraph, index) => {
                    return (
                        <div key={index} className='space-y-5'>
                            <div className='flex justify-center'>
                                {paragraph.image &&
                                    <img className={`w-full sm:h-[700px] h-[300px] object-cover ${paragraph.position}`} src={paragraph.image} alt='movie scene' />}
                            </div>
                            <h3 className='sm:text-2xl text-xl border-b-2'>{paragraph.subtitle}</h3>
                            <p className='sm:text-lg text-base font-extralight'>{paragraph.paragraph}</p>
                        </div>
                    )
                })}
                <WriterCard writerEmail={user.email} />

                <div className='flex justify-center'>
                    <CustomButton text={review.edit ? 'Update' : 'Publish'} callback={handleUpload} />
                </div>
            </div>
        </section>
    )
}

export default Preview