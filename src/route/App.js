import React, { createContext, useEffect, useState } from 'react'
import supabase from './Client'
import Navigation from '../components/Navigation'
import { Outlet } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { getProfileImage } from '../functions/getProfileImage'

export const User = createContext()
export const GlobalLoading = createContext()


const App = () => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        return data.user
      }
    }
    getUser().then((res) => {
      const userObj = res

      if(!userObj) {
        setLoading(false)
        return
      }

      getProfileImage(userObj.email).then((res) => {
        setUser({ ...userObj, image: res.image })
        setLoading(false)
      })

    })
  }, [])

  return (
    <GlobalLoading.Provider value={{ loading, setLoading }}>
      <User.Provider value={{ user, setUser }}>

        {loading ?
          <div className='bg-dark-gray w-full h-screen flex justify-center items-center'>
            <CircularProgress size={80} />
          </div>

          :

          <main className='min-h-screen bg-dark-gray font-fira'>
            <Navigation />
            <Outlet />
            {/* spacer for the footer */}
            <div className='h-20'></div>
          </main>
        }
      </User.Provider>
    </GlobalLoading.Provider>
  )
}

export default App
