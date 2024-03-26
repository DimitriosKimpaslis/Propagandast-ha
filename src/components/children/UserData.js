import React, { useContext, useEffect, useState } from 'react'
import { User } from './../../route/App';
import supabase from '../../route/Client';
import { CircularProgress } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CustomButton from '../custom/CustomButton';
import { userDataValidation } from '../../functions/dataValidation';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';


const UserData = () => {
    const { user } = useContext(User)
    const [userData, setUserData] = useState()
    const [loading, setLoading] = useState(true)
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        const getUserData = async () => {
            const { data } = await supabase
                .from('writers')
                .select('*')
                .eq('email', user.email)
                .single()
            return data
        }
        getUserData().then((res) => {
            setUserData(res)
            setLoading(false)
        })
    }
        , [])

    const handleChange = (e) => {
        const { id, value } = e.target
        setUserData({ ...userData, [id]: value })
    }

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
            .upload('Writers/' + user.email + '/' + file.name, file, {
                cacheControl: '3600',
                upsert: false
            })
        if (data) {
            let temp = { ...userData };
            temp.image = 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/' + data.path
            setUserData(temp)
            setImageLoading(false)



            //the duplicate error needs testing
        } else if (error.error === 'Duplicate') {
            let temp = { ...userData };
            temp.image = 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Writers/' + user.email + '/' + file.name
            setUserData(temp)
            setImageLoading(false)
        } else {
            console.log(error)
        }
    }

    const handleSave = async () => {
        setLoading(true)
        const errors = userDataValidation(userData)
        if (Object.keys(errors).length > 0) {
            setErrors(errors)
            setLoading(false)
            return
        }
        const { error } = await supabase
            .from('writers')
            .update(userData)
            .eq('email', user.email)
            .then(() => {
                setLoading(false)
                window.location.reload()
            })
        if (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full'>
            {loading ? <div className='flex justify-center items-center'><CircularProgress /></div> :
                <div className='flex flex-col space-y-4'>
                    <h1 className='text-4xl font-bold pb-2 border-b-2 text-light-white col-span-12'>Your Data</h1>

                    <div className='flex flex-col justify-center gap-2'>
                        <label className='text-light-white' htmlFor='image'>Profile Image:</label>
                        {imageLoading ? <CircularProgress /> :
                            <img src={userData.image ? userData.image : require('../../media/images/generic-profile.jpg')} alt='profile' className='w-40 h-40 rounded-full object-cover' />
                        }

                        <label htmlFor='file-input' className="custom-file-upload">
                            <span id="file-name" className='text-light-white cursor-pointer hover:text-pink'><FileUploadIcon /> No file selected</span>
                            <input type="file" id="file-input" className='hidden ' onChange={(e) => handleUploadImage(e)} />
                        </label>
                    </div>

                    <div className='flex items-center gap-2'>
                        <label className='text-light-white w-[80px]' htmlFor='name'>*Name:</label>
                        <input type='text' value={userData.name} id='name' className={`flex-grow w-20 ${loading ? 'disabled' : ''}`} onChange={(e) => handleChange(e)} placeholder='Name' />
                    </div>
                    {errors.name && <p className='text-red-500 col-span-12 text-center'><ReportGmailerrorredIcon className='mb-1'/> {errors.name}</p>}

                    <div className='flex items-center gap-2'>
                        <label className='text-light-white w-[80px]' htmlFor='surname'>Surname:</label>
                        <input type='text' value={userData.surname} id='surname' className={`flex-grow w-20 ${loading ? 'disabled' : ''}`} onChange={(e) => handleChange(e)} placeholder='Surname' />
                    </div>
                    {errors.surname && <p className='text-red-500 col-span-12 text-center'><ReportGmailerrorredIcon className='mb-1'/> {errors.surname}</p>}

                    <div className='flex items-center gap-2'>
                        <label className='text-light-white w-[80px]' htmlFor='motto'>Motto:</label>
                        <input type='text' value={userData.motto} id='motto' className={`flex-grow w-20 ${loading ? 'disabled' : ''}`} onChange={(e) => handleChange(e)} placeholder='Motto' />
                    </div>
                    {errors.motto && <p className='text-red-500 col-span-12 text-center'><ReportGmailerrorredIcon className='mb-1'/> {errors.motto}</p>}

                    <div className='flex items-center gap-2'>
                        <label className='text-light-white w-[80px]' htmlFor='facebook'>Facebook:</label>
                        <input type='text' value={userData.facebook} id='facebook' className={`flex-grow w-20 mr-2 ${loading ? 'disabled' : ''}`} onChange={(e) => handleChange(e)} placeholder='Facebook profile link' />
                        <FacebookIcon className='cursor-pointer text-blue-500 hover:text-light-white' fontSize='large' onClick={() => window.open(userData.facebook, '_blank')} />
                    </div>
                    {errors.facebook && <p className='text-red-500 col-span-12 text-center'><ReportGmailerrorredIcon className='mb-1'/> {errors.facebook}</p>}

                    <div className='flex items-center gap-2'>
                        <label className='text-light-white w-[80px]' htmlFor='instagram'>Instagram:</label>
                        <input type='text' value={userData.instagram} id='instagram' className={`flex-grow w-20 mr-2 ${loading ? 'disabled' : ''}`} onChange={(e) => handleChange(e)} placeholder='Instagram profile link' />
                        <InstagramIcon className='cursor-pointer text-pink hover:text-light-white' fontSize='large' onClick={() => window.open(userData.instagram, '_blank')} />
                    </div>
                    {errors.instagram && <p className='text-red-500 col-span-12 text-center'><ReportGmailerrorredIcon className='mb-1'/> {errors.instagram}</p>}

                    <label className='text-light-white' htmlFor='description'>Description:</label>
                    <textarea className={`${loading ? 'disabled' : ''}`} name='description' id='description' cols='30' rows='5' value={userData.description} onChange={(e) => handleChange(e)} placeholder='Some things about you...' />
                    {errors.description && <p className='text-red-500 col-span-12 text-center'><ReportGmailerrorredIcon className='mb-1'/> {errors.description}</p>}

                    <CustomButton text='Save' callback={handleSave} />

                </div>

            }
        </div>
    )
}

export default UserData