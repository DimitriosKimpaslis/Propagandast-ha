import React, { useState } from 'react'
import CustomButton from '../custom/CustomButton'
import { CircularProgress, Tooltip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import classicMovies from '../data/classics';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [classicMoviesIndex, setClassicMoviesIndex] = useState(0)
  const [randomImageLoading, setRandomImageLoading] = useState(false)

  const navigate = useNavigate()

  const changeRandomImage = () => {
    setRandomImageLoading(true)
    if (classicMoviesIndex !== classicMovies.length - 1) {
      setClassicMoviesIndex(classicMoviesIndex + 1)
    } else {
      setClassicMoviesIndex(0)
    }
  }

  return (
    <section className='flex justify-center'>
      <div className='container space-y-10'>
        <div className='relative flex justify-center items-center'>
          <img src={require('../../media/images/home_movies.jpg')} className='sm:opacity-100 opacity-0' alt='main' />
          <div className='absolute text-center bg-light-white py-10 px-4 border-2 border-pink shadow-xl shadow-pink'>
            <h1 className='text-4xl font-bold border-b-2 border-black pb-4 '>Welcome to <span className='text-red-300'>Propagandast</span></h1>
            <p className='text-xl font-semibold'>Your local over-inflated movie reviews site!</p>
          </div>
        </div>
        <div className='text-light-white space-y-4 p-4'>
          <h2 className='text-4xl font-bold pb-2 border-b-2'>About</h2>
          <p className='text-xl'>Our team is made up of people who share a deep love for cinema. Despite our young age, we bring a high level of professionalism and knowledge to our reviews. Our love for the art of filmmaking is reflected in our intelligent analysis of films, and we are dedicated to providing a comprehensive review for every film we review. While we may have a playful side to us, we take our work seriously, aiming to provide our readers with informed and thoughtful reviews of every movie we watch.</p>
          <p className='text-2xl text-red-300'>Now is your turn to tell us all about your favourite films!</p>
          <CustomButton text='Post A Review' path='/post' />
        </div>
        <div className='bg-red-300 p-4 space-y-2'>
          <h2 className='sm:text-4xl text-xl font-bold pb-2 border-b-2'>What classic to watch today...</h2>
          <div className='flex flex-col justify-center items-center'>
            <div className='grid grid-cols-5 gap-3'>
              {randomImageLoading && <div className='sm:col-span-2 col-span-5 flex justify-center items-center h-[500px]'><CircularProgress /></div>}
              <img className={`sm:col-span-2 col-span-5 sm:h-[500px] h-[300px] w-full object-contain ${randomImageLoading ? 'hidden' : ''}`} onLoad={() => setRandomImageLoading(false)} src={classicMovies[classicMoviesIndex].image} alt={classicMovies[classicMoviesIndex].title} />
              <div className='sm:col-span-3 col-span-5 flex flex-col justify-center items-center text-center sm:gap-2 '>
                <h3 className='sm:text-4xl text-xl font-bold mb-2'>{classicMovies[classicMoviesIndex].title}</h3>
                <p className='sm:text-2xl text-lg font-semibold'>{classicMovies[classicMoviesIndex].genre.join(', ')}</p>
                <p className='sm:text-2xl text-lg font-semibold'>{classicMovies[classicMoviesIndex].rating} rated</p>
                <p className='sm:text-2xl text-lg font-semibold'>{classicMovies[classicMoviesIndex].duration} minutes</p>
                <p className='sm:text-2xl text-lg sm:mb-20 mb-10'>{classicMovies[classicMoviesIndex].description}</p>
                <CustomButton text='Get Another Movie' callback={changeRandomImage} />
              </div>
            </div>
          </div>
        </div>
        <div className='text-light-white space-y-4 p-4'>
          <h2 className='text-4xl font-bold pb-2 border-b-2'>Review Awards</h2>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
            <div className='flex flex-col gap-1'>
              <div className={`relative flex justify-center items-center bg-dark-gray border-[#C0C0C0]  border-8 p-4 lg:h-[500px] md:h-[300px] h-[400px]`}>
                <img src={require('../../media/images/awards/silver.png')} alt='silver award' className='w-14 h-20 absolute top-1 right-1 z-10' />
                <img src={require('../../media/images/your_honor.jfif')} alt='bronze award' className='w-auto h-full object-cover' />
              </div>
              <Tooltip title={<p className='text-base'>This award was given for the best analytical ability displayed in a review.</p>}>
                <p className='text-xl text-center'>Best Analysis <InfoIcon className='relative' /></p>
              </Tooltip>
                <p className='text-lg text-center'><span className='text-pink hover:text-light-white cursor-pointer' onClick={() => navigate('/reviews/6')}>Your Honor </span>by Anastasios Sotiriadis</p>
            </div>
            <div className='flex flex-col gap-1'>
              <div className={`relative flex justify-center items-center bg-dark-gray border-[#FFD700]  border-8 p-4 lg:h-[600px] md:h-[400px] h-[500px]`}>
                <img src={require('../../media/images/awards/gold.png')} alt='gold award' className='w-20 h-28 absolute top-1 right-1 z-10' />
                <img src={require('../../media/images/the_whale.jfif')} alt='gold award' className='w-auto h-full object-cover' />
              </div>
              <Tooltip title={<p className='text-base'>Very well written all around. Exceptional work!</p>}>
                <p className='text-xl text-center'>Best Overall <InfoIcon className='relative' /></p>
              </Tooltip>
              <p className='text-lg text-center'><span className='text-pink hover:text-light-white cursor-pointer' onClick={() => navigate('/reviews/5')}>The Whale </span>by Anastasios Sotiriadis</p>

            </div>
            <div className='flex flex-col gap-1'>
              <div className={`relative flex justify-center items-center bg-dark-gray border-[#CD7F32] border-8 p-4 lg:h-[500px] md:h-[300px] h-[500px]`}>
                <img src={require('../../media/images/awards/bronze.png')} alt='bronze award' className='w-14 h-20 absolute top-1 right-1 z-10' />
                <img src={require('../../media/images/calibre.jpg')} alt='bronze award' className='w-auto h-full object-cover' />
              </div>
              <Tooltip title={<p className='text-base'>This award was given for the most personality given to a review. It might not have been the most serious but it deserves an award of its own.</p>}>
                <p className='text-xl text-center'>Most Personality <InfoIcon className='relative' /></p>
              </Tooltip>
              <p className='text-lg text-center'><span className='text-pink hover:text-light-white cursor-pointer' onClick={() => navigate('/reviews/4')}>Calibre </span>by Anastasios Sotiriadis</p>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home