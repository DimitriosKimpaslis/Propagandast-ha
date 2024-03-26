import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import supabase from '../../route/Client';
import { CircularProgress } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useNavigate } from 'react-router-dom';
import { sortReviews } from '../../functions/sort';
import { searchReviews } from './../../functions/search';

const Reviews = () => {
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [sort, setSort] = useState('')
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    const [searchView, setSearchView] = useState(false)

    const searchBar = useRef(null);
    const searchInput = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {

            if (searchBar.current && !searchBar.current.contains(e.target) && searchInput.current && !searchInput.current.contains(e.target)) {
                // The click was outside the div; hide the div
                setSearchView(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const navigate = useNavigate()
    useEffect(() => {
        const getReviews = async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
            if (error) {
                console.log(error)
            }
            return data
        }
        getReviews().then((res) => {
            setReviews(res)
            setLoading(false)
        })
    }
        , [])

    useEffect(() => {
        const temp = [...reviews]
        const sortedReviews = sortReviews(temp, sort)
        setReviews(sortedReviews)
    }
        , [sort])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchView(true)
            const searchResults = searchReviews(reviews, search)
            setSearchResults(searchResults)

        }, 800)
        return () => clearTimeout(timer)
    }
        , [search])

    return (
        <section className='flex justify-center'>
            {loading ? <div className='bg-dark-gray w-full h-screen flex justify-center items-center'><CircularProgress /></div> :
                <div className='container p-4'>
                    <div className='text-light-white space-y-5'>
                        <h2 className='text-4xl font-bold pb-2 border-b-2'>Reviews</h2>
                        <div className='flex justify-between gap-4 flex-wrap'>
                            <div className='flex items-center space-x-2 relative flex-grow'>
                                <SearchIcon fontSize='large' />
                                <input ref={searchInput} type='text' placeholder='Search for a movie' className='w-full h-10 px-4 rounded-md text-black' onChange={(e) => { setSearch(e.target.value) }} />
                                <ul ref={searchBar} className={`absolute top-12 left-4 w-full bg-white rounded-md text-dark-gray max-h-[300px] overflow-y-auto ${searchView ? 'block' : 'hidden'}`}>
                                    {searchResults.map((result, index) => {
                                        return (
                                            <li key={index} className='hover:bg-gray-200 px-4 py-2 hover:cursor-pointer' onClick={() => {
                                                if (!result.id) return
                                                navigate(`/reviews/${result.id}`)
                                            }}>{result.title}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <SortIcon fontSize='large' />
                                <select className='w-40 h-10 px-4 rounded-md text-black bg-light-white cursor-pointer' value={sort} onChange={(e) => setSort(e.target.value)}>
                                    <option value='default'>Sort by...</option>
                                    <option value='recent'>Recently Added</option>
                                    <option value='a-z'>Alphabetical Order</option>
                                    <option value='z-a'>Reverse Alphabetical Order</option>
                                    <option value='year-newest-first'>Release Date - Newest First</option>
                                    <option value='year-oldest-first'>Release Date - Oldest First</option>
                                    <option value='rating-highest-first'>Rating - Highest First</option>
                                    <option value='rating-lowest-first'>Rating - Lowest First</option>
                                </select>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
                            {reviews.map((review) => {
                                return (
                                    <div className='flex flex-col gap-y-2' key={review.id}>
                                        <div className={`bg-dark-gray w-full xl:h-[600px] lg:h-[500px] md:h-[400px] sm:h-[300px] h-[250px] overflow-hidden`}>
                                            <img src={review.poster} alt='movie poster' className='w-full h-full object-cover hover:cursor-pointer' onClick={() => { navigate('/reviews/' + review.id) }} />
                                        </div>
                                        <p className='text-3xl hover:text-gray-400 hover:cursor-pointer' onClick={() => { navigate('/reviews/' + review.id) }}>{review.title}</p>
                                        <div className='flex items-center gap-1'>
                                            <p className='text-3xl text-center'>{review.rating}/10</p>
                                            <StarRateIcon />
                                        </div>
                                        <p className='text-lg hyphens-auto text-pink'>{review.introduction.slice(0, 150)}...</p>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            }
        </section>
    )
}

export default Reviews