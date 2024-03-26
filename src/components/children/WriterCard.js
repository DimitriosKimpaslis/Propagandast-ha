import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import supabase from '../../route/Client'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const WriterCard = (props) => {
    const { writerEmail } = props
    const [writer, setWriter] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getWriterImage = async () => {
            const { data, error } = await supabase
                .from('writers')
                .select('*')
                .eq('email', writerEmail)
                .single()
            if (error) {
                console.log(error)
            }
            return data

        }
        getWriterImage().then((res) => {
            setWriter(res)
            setLoading(false)
        })
    }, [])

    return (

        <div className='w-full flex justify-center'>
            {loading ? <div className='flex justify-center items-center'><CircularProgress /></div> :
                <div className='flex flex-col items-center justify-center text-center p-3 max-w-[500px] gap-5 border'>
                    <div className='flex justify-center'>
                        <img className='w-[200px] h-[200px] object-cover rounded-full' src={writer.image ? writer.image : require('../../media/images/generic-profile.jpg')} alt='profile' />
                    </div>
                    <p>{writer.name} {writer.surname && writer.surname}</p>
                    {writer.motto && <p className='italic text-pink'>"{writer.motto}"</p>}
                    {writer.description && <p className='font-extralight text-center'>{writer.description}</p>}
                    <div className='flex gap-2'>
                        {writer.facebook && <FacebookIcon className='col-span-1 cursor-pointer text-blue-500 hover:text-light-white' fontSize='large' onClick={() => window.open(writer.facebook, '_blank')} />}
                        {writer.instagram && <InstagramIcon className='col-span-1 cursor-pointer text-pink hover:text-light-white' fontSize='large' onClick={() => window.open(writer.instagram, '_blank')} />}
                    </div>
                </div>
            }
        </div>
    )
}

export default WriterCard