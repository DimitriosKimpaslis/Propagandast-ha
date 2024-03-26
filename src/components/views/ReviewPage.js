import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../../route/Client'
import { CircularProgress } from '@mui/material'
import StarRateIcon from '@mui/icons-material/StarRate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WriterCard from '../children/WriterCard';



const ReviewPage = () => {
  const [review, setReview] = useState({})
  const [loading, setLoading] = useState(true)
  const [views, setViews] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    const getReview = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', id)
        .single()
      if (error) {
        console.log(error)
      }
      return data
    }
    const getViews = async () => {
      const { data, error } = await supabase
        .from('views')
        .select('id')
        .eq('review_id', id)
      if (error) {
        console.log(error)
      }
      return data
    }


    getReview().then((res) => {
      res.trailer = res.trailer.replace('watch?v=','embed/')

      const inputDate = new Date(res.created_at);
      const day = inputDate.getUTCDate();
      const month = inputDate.getUTCMonth() + 1; // Months are zero-based, so add 1
      const year = inputDate.getUTCFullYear();
      const formattedDate = month + '/' + day + '/' + year;
      res.created_at = formattedDate

      setReview(res)
      getViews().then((res) => {
        setViews(res.length)
      })
      setLoading(false)
    })

    const addView = async () => {
      const { error } = await supabase
        .from('views')
        .insert([
          { review_id: id }
        ])
      if (error) {
        console.log(error)
      }
    }
    addView()
  }, [])

  return (
    <section className='flex justify-center text-light-white'>
      {loading ? <div className='bg-dark-gray w-full h-screen flex justify-center items-center'><CircularProgress /></div> :
        <div className='container space-y-5 sm:mx-0 mx-2 sm:p-16 p-1'>
          <h1 className=' text-3xl  font-semibold'>{review.title}({review.year}): <span className='text-pink'>"{review.review_title}"</span></h1>
          <div className='flex gap-2 justify-between'>
            <p className="text-gray-400 text-lg italic ">{review.created_at}</p>
            <p className="text-gray-400 text-lg italic "><VisibilityIcon /> {views} views</p>
          </div>

          <div className='max-w-full relative h-0 overflow-hidden pb-[56.25%]'>
            <iframe width="560" height="315" src={review.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className='absolute top-0 left-0 w-full h-full'></iframe>
          </div>
          <div className='flex items-center gap-1'>
            <h2 className='font-semibold sm:text-5xl text-2xl'>{review.rating}/10</h2>
            <StarRateIcon className='text-pink' fontSize='large' />
          </div>
          <p className='sm:text-xl text-lg font-light'>{review.introduction}</p>
          { review.body.map((paragraph, index) => {
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
          <WriterCard writerEmail={review.writer_email} />
        </div>
      }
    </section>
  )
}

export default ReviewPage