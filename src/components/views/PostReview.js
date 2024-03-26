import { Outlet, useNavigate } from "react-router-dom"
import CancelIcon from '@mui/icons-material/Cancel';


const PostReview = () => {
    const movieData = JSON.parse(localStorage.getItem('movieData'))
    const isItEditing = () => {
        if (!movieData) return false
        if (movieData.edit) {
            return true
        } else {
            return false
        }
    }

    const navigate = useNavigate()

    const endEdit = () => {
        navigate('/post')
        localStorage.removeItem('movieData')
        window.location.reload()
    }
    return (
        <section className='flex justify-center'>
            <div className='container space-y-2 p-4'>
                <h1 className='text-4xl font-bold pb-2 border-b-2 text-light-white'>Post a review</h1>
                {isItEditing() ?
                    <div className='w-full relative bg-pink h-8 flex items-center justify-center text-light-white font-semibold'>
                        <h1 className='text-center text-2xl'>Edit Mode</h1>
                        <div className='absolute right-0 top-0 flex items-center h-8 bg-dark-gray hover:bg-pink transition-colors duration-200'>
                            <p className='text-base text-light-white font-semibold px-2 cursor-pointer' onClick={endEdit}><CancelIcon className="mb-1" /> Cancel Edit</p>
                        </div>

                    </div> : ''}
                <Outlet />
            </div>
        </section>
    )
}

export default PostReview