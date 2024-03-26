import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <section className='flex justify-center'>
    <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <Outlet />
            <div className='h-screen md:block hidden'>
                <img className='w-full h-full' src={require('../../media/images/pngtree-creative-dollar-watching-movie-promotion-poster-picture-image_1015962.png')} alt='signin' />
            </div>
        </div>
    </div>
</section>
  )
}

export default Auth