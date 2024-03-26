import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../../route/Client'
import { CircularProgress } from '@mui/material'
import CustomButton from '../custom/CustomButton'
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { movieBodyValidation } from '../../functions/dataValidation'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';



const PostReviewBody = () => {
  const [movieData, setMovieData] = useState({})
  const [introduction, setIntroduction] = useState('')
  const [movieBody, setMovieBody] = useState([{ subtitle: '', image: '', paragraph: '' }])
  const [error, setError] = useState({})

  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => {
    const movieData = JSON.parse(localStorage.getItem('movieData'))

    if (!movieData){navigate('/post')}

    if(movieData) setMovieData(movieData)

    if (movieData.introduction) setIntroduction(movieData.introduction)

    if(movieData.body) {
      setMovieBody(movieData.body)
      delete movieData.body 
    }

    if (movieData.movieBody) setMovieBody(movieData.movieBody)
    
    setLoading(false)
  }, [])

  const navigate = useNavigate()


  const uploadImage = async (e, index) => {
    setImageLoading(true)
    let file = e.target.files[0];
    const movieName = movieData.title
    const { data, error } = await supabase
      .storage
      .from('Images')
      .upload('Reviews/' + movieName + '/' + file.name, file, {
        cacheControl: '3600',
        upsert: false
      })
    if (data) {
      let temp = [...movieBody];
      temp[index].image = 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/' + data.path
      setMovieBody(temp)

    } else if (error.error === 'Duplicate') {
      let temp = [...movieBody];
      temp[index].image = 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Reviews/' + movieName + '/' + file.name
      setMovieBody(temp)
    } else {
      console.log('error', error)
    }
    setImageLoading(false)
  }

  const handleFormChange = (event, index) => {
    let data = [...movieBody];
    data[index][event.target.name] = event.target.value;
    setMovieBody(data)
  }

  const handlePositionChange = (value, index) => {
    let data = [...movieBody];
    data[index].position = value
    setMovieBody(data)
  }

  const addFields = () => {
    const newParagraph = {
      subtitle: '',
      paragraph: '',
      image: '',
      position: 'object-center'
    }
    setMovieBody([...movieBody, newParagraph])

  }

  const removeFields = (index) => {
    let data = [...movieBody];
    data.splice(index, 1)
    setMovieBody(data)
  }

  const handleContinue = (e) => {
    e.preventDefault()
    if(movieBody.length === 0) return setError({introduction: 'You need at least one paragraph'})
    const { errors, errorsExist } = movieBodyValidation(movieBody)
    if (errorsExist) {
      setError(errors)
      return
    }
    let completedMovieData = { ...movieData }
    completedMovieData.introduction = introduction
    completedMovieData.movieBody = movieBody
    localStorage.setItem('movieData', JSON.stringify(completedMovieData))
    navigate('/post/preview')
  }


  return (
    <section className='flex justify-center text-light-white'>
      {loading ? <div className='flex justify-center items-center h-screen'><CircularProgress /></div> :
        <div className='container sm:p-4'>

          <button className='border-4 mb-6 sm:text-xl text-base border-pink bg-dark-gray text-light-white font-semibold sm:px-8 sm:py-2 px-3 py-1 sm:hover:bg-pink sm:hover:text-dark-gray transition-colors duration-200' onClick={() => navigate('/post')}><ArrowBackIcon className='mb-1' /> Back</button>

          <form className='flex flex-col gap-2' onSubmit={(e) => handleContinue(e)}>
            <label htmlFor='introduction'>Introduction:</label>
            <textarea
              name='introduction'
              placeholder='Write an introduction for your review'
              onChange={event => setIntroduction(event.target.value)}
              value={introduction}
              rows={10}
              className='text-dark-gray mb-10'
            />
            {error.introduction && <p className='text-red-500'><ReportGmailerrorredIcon className='mb-1'/> {error.introduction}</p>}  
            {movieBody.map((obj, index) => {
              return (
                <div key={index} className='flex flex-col gap-y-2 relative border sm:p-6 p-1 rounded-md group-hover:border-red-500'>
                  <DeleteIcon className='absolute top-2 right-2 text-red-500 cursor-pointer hover:text-light-white group' onClick={() => removeFields(index)} fontSize='large' />
                  <label htmlFor='subtitle' className='mt-5'>Subtitle:</label>
                  <input
                    name='subtitle'
                    placeholder='Write a subtitle for your paragraph'
                    onChange={event => handleFormChange(event, index)}
                    value={obj.subtitle}
                    className='text-dark-gray'
                  />
                  {error[index] && error[index].subtitle && <p className='text-red-500'><ReportGmailerrorredIcon className='mb-1'/> {error[index].subtitle}</p>}
                  <div className='flex justify-center'>
                    {/* well this got kinda freaky, sorry future self. It works though */}
                    {((obj.image && imageLoading) || (!obj.image && imageLoading)) ? <CircularProgress /> : (!obj.image && !imageLoading) ? null : <img className={`w-full h-[700px] object-cover ${obj.position}`} src={obj.image} alt='movie scene' />}
                  </div>
                  {obj.image && <div className='flex-col flex gap-2 justify-center items-center'>
                    <p className='text-lg'>Image positioning</p>
                    <div className='flex gap-2'>
                      <NorthIcon className='text-pink cursor-pointer hover:text-light-white' onClick={() => handlePositionChange('object-top', index)} fontSize='large' />
                      <CenterFocusStrongIcon className='text-pink cursor-pointer hover:text-light-white' onClick={() => handlePositionChange('object-center', index)} fontSize='large' />
                      <SouthIcon className='text-pink cursor-pointer hover:text-light-white' onClick={() => handlePositionChange('object-bottom', index)} fontSize='large' />
                    </div>
                    {/* just for the user to understand that his change has been made */}
                    <CustomButton text={'Save'} type={'button'} />
                  </div>
                  }
                  <label htmlFor="file_input">Upload a picture:</label>
                  <input type='file' className='bg-pink border-dark-gray text-dark-gray' onChange={(e) => uploadImage(e, index)} name='image' id='file_input' />

                  <label htmlFor='paragraph'>Paragraph:</label>
                  <textarea
                    name='paragraph'
                    placeholder='This is your paragraph'
                    onChange={event => handleFormChange(event, index)}
                    value={obj.paragraph}
                    rows={10}
                    className='text-dark-gray'
                  />
                  {error[index] && error[index].paragraph && <p className='text-red-500'><ReportGmailerrorredIcon className='mb-1'/> {error[index].paragraph}</p>}
                </div>
              )
            }

            )}
            <div className='w-full flex justify-center my-4'>
              <CustomButton text={'Add Paragraph'} callback={addFields} size={'small'} type={'button'} />
            </div>
            <div className='w-full flex justify-end'>
              <button className={`border-4 sm:text-xl text-base border-pink bg-dark-gray text-light-white font-semibold sm:px-8 sm:py-2 px-3 py-1 sm:hover:bg-pink sm:hover:text-dark-gray transition-colors duration-200 disabled:border-gray-500 disabled:bg-gray-500`} disabled={imageLoading}>Preview <ArrowForwardIcon /></button>
            </div>
          </form>
        </div>
      }
    </section>
  )
}

export default PostReviewBody