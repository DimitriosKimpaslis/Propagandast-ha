import { CircularProgress } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { User } from '../../route/App'
import supabase from '../../route/Client'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../custom/CustomButton';
import WarningIcon from '@mui/icons-material/Warning';

const UserReviews = () => {
    const { user } = useContext(User)
    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    const [deleteVisibility, setDeleteVisibility] = useState(false)
    const [deleteReview, setDeleteReview] = useState({})

    const navigate = useNavigate()

    const deleteBlock = useRef(null);

    const handleScrollEvent = () => {
        deleteBlock.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: "start" });
    };

    useEffect(() => {
        const getReviews = async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('id,title,poster,year')
            .eq('writer_email', user.email)
            if (error) {
                console.log(error)
            }
            return data
        }
        getReviews().then((res) => {
            setReviews(res)
            setLoading(false)
        })
    }, [])

    const handleDelete = async (id) => {
        setLoading(true)
        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', id)
        if (error) {
            console.log(error)
        }
        setLoading(false)
        window.location.reload()
    }

    const beginEdit = async (id) => {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('id', id)
            .single()
        if (error) {
            console.log(error)
        }
        data.edit = true
        localStorage.setItem('movieData', JSON.stringify(data))
        navigate('/post')
    }


    useEffect(() => {
        if (deleteVisibility) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }, [deleteVisibility])

    return (
        <div>
            {loading ? <div className='flex justify-center items-center'><CircularProgress /></div> :
                <div className={`flex flex-col space-y-4 relative overflow-y-hidden ${deleteVisibility ? 'overflow-hidden' : ''}`} ref={deleteBlock}>
                    <div className={`absolute w-full h-full bg-black bg-opacity-80 justify-center items-center ${deleteVisibility ? 'flex' : 'hidden'}`}>
                        <div className='flex flex-col justify-center items-center gap-5 p-2 bg-dark-gray w-full h-full border border-light-white' >
                            <WarningIcon className='text-red-500' fontSize='large' />
                            <p className='text-light-white text-center'>Are you sure you want to delete <span className='font-bold border-b'>{deleteReview.title + ' (' + deleteReview.year + ')'}</span> ? This action can't be undone!</p>
                            <div className='flex justify-between flex-wrap gap-2'>
                                <CustomButton text='Cancel' callback={() => setDeleteVisibility(false)} />
                                <CustomButton text='Delete' callback={() => {
                                    handleDelete(deleteReview.id)
                                    setDeleteVisibility(false)
                                }} />
                            </div>
                        </div>

                    </div>
                    <h1 className='text-4xl font-bold pb-2 border-b-2 text-light-white col-span-12'>Your Reviews</h1>
                    {reviews.length === 0 ?
                        <div>
                            <h1 className='text-light-white text-3xl font-bold'>No Reviews</h1>
                        </div>
                        :
                        <div className='grid sm:grid-cols-3 gap-3' >
                            {reviews.map((review, index) => {
                                return (
                                    <div className='' key={index}>
                                        <div className='text-center space-y-1'>
                                            <img src={review.poster} alt={review.title} className='lg:h-[500px] md:h-[300px] h-[400px] w-full object-cover' />
                                            <h1 className='text-light-white text-xl font-bold'>{review.title}</h1>
                                            <div className='grid grid-cols-3 gap-5 border-b-4 border-t-4 py-1'>
                                                <p className='text-light-white cursor-pointer hover:text-pink ' onClick={() => { navigate('/reviews/' + review.id) }}><VisibilityIcon /> View </p>
                                                <p className='text-light-white cursor-pointer hover:text-pink ' onClick={() => beginEdit(review.id)}><EditIcon /> Edit </p>
                                                <p className='text-light-white cursor-pointer hover:text-red-500 ' onClick={() => {
                                                    setDeleteVisibility(true)
                                                    setDeleteReview({ id: review.id, title: review.title, year: review.year })
                                                    handleScrollEvent()
                                                }}><DeleteIcon /> Delete </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default UserReviews