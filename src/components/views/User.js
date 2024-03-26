import React from 'react'
import supabase from '../../route/Client'
import { Outlet } from 'react-router-dom'
import CustomButton from '../custom/CustomButton'

const User = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }
  return (
    <section className='flex justify-center'>
      <div className='container p-4'>
        <div className='grid grid-cols-5 gap-4 '>
          <div className='md:col-span-1 col-span-5 md:border-r-4 pr-2'>
            <ul className='flex flex-col space-y-2'>
              <CustomButton text='Your Data' path='/user' />
              <CustomButton text='Your Reviews' path='reviews' />
              <CustomButton text='Logout' callback={handleLogout} />
            </ul>
          </div>
          <div className='md:col-span-4 col-span-5'>
            <Outlet />
          </div>
        </div>
      </div>

    </section>
  )
}

export default User