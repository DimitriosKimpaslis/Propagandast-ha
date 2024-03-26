import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { User } from '../route/App'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AppsIcon from '@mui/icons-material/Apps';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navigation = () => {
    const { user } = useContext(User)
    const navigate = useNavigate()

    const [isNavOpen, setNavOpen] = useState(false);

    const toggleNavbar = () => {
        setNavOpen(true);
    };

    const navigation = useRef(null);
    const button = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {

            if (navigation.current && !navigation.current.contains(e.target) && !button.current.contains(e.target)) {
                // The click was outside the div; hide the div
                setNavOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className='h-20 w-full mb-10'>
            <div className=' bg-dark-gray z-10 md:flex justify-between items-center px-4 h-full hidden'>
                <div className='w-30 h-10 hover:cursor-pointer' onClick={() => { navigate('/') }}>
                    <img src={require('../media/images/logo.png')} alt='logo' className='w-full h-full' />
                </div>
                <div className='flex space-x-4'>
                    <ul className='flex items-center space-x-4 border-r-2 px-4'>
                        <li className='text-white font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/'}>Home</NavLink></li>
                        <li className='text-white font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/reviews'}>Reviews</NavLink></li>
                        <li className='text-white font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/post'}>Post A Review</NavLink></li>
                        <li className='text-white font-semibold hover:text-gray-400 transition-colors duration-400'><NavLink to={'/contact'}>Contact</NavLink></li>
                    </ul>
                    {!user &&
                        <ul className='flex space-x-4'>
                            <li className='text-red-300 font-semibold hover:text-gray-300 transition-colors duration-400'><NavLink to={'/auth/signin'}>Sign in</NavLink></li>
                            <li className='text-red-300 font-semibold hover:text-gray-300 transition-colors duration-400'><NavLink to={'/auth/signup'}>Register</NavLink></li>
                        </ul>
                    }
                    {user &&
                        <div>
                            <img src={user.image ? user.image : require('../media/images/generic-profile.jpg')} alt='profile' className='w-10 h-10 rounded-full hover:cursor-pointer' onClick={() => { navigate('/user') }} />
                        </div>
                    }
                </div>
            </div>
            <button ref={button} onClick={toggleNavbar} className='md:hidden absolute top-0 left-0 ml-5 mt-5'>
                <MenuIcon className='text-pink' fontSize='large' />
            </button>
            <aside className={`fixed z-20 top-0 h-screen w-[300px] text-2xl md:hidden transition-transform ${isNavOpen ? " " : "-translate-x-[400px]"} md:translate-x-0`} ref={navigation}>
                <div className='bg-dark-gray p-4 w-full h-full text-light-white shadow-lg shadow-pink'>
                    <CloseIcon onClick={() => setNavOpen(false)} className='mb-5 cursor-pointer text-pink' fontSize='large' />
                    <div className='flex border-b-2 mb-5 pb-2'>
                        <img src={require('../media/images/logo.png')} alt='logo' className='w-30 h-8' onClick={() => {
                            navigate('/')
                            setNavOpen(false)
                        }} />
                    </div>
                    <ul className='space-y-8'>
                        <li className='md:hover:text-gray-400 '><NavLink to={"/reviews"} onClick={() => setNavOpen(false)}><AppsIcon className='bottom-[2px] relative ' /> Reviews</NavLink></li>
                        <li className='md:hover:text-gray-400 '><NavLink to={"/post"} onClick={() => setNavOpen(false)}><AppRegistrationIcon className='bottom-[2px] relative' /> Post A Review</NavLink></li>
                        {user && <li className='md:hover:text-gray-400 '><NavLink to={"/user"} onClick={() => setNavOpen(false)}><AccountCircleIcon className='bottom-[2px] relative' /> Profile</NavLink></li>}
                        <li className='md:hover:text-gray-400 '><NavLink to={"/contact"} onClick={() => setNavOpen(false)}><ContactSupportIcon className='bottom-[2px] relative' /> Contact</NavLink></li>
                        {!user && <li className='md:hover:text-gray-400 '><NavLink to={"/auth/signin"} onClick={() => setNavOpen(false)}><LoginIcon className='bottom-[2px] relative' /> Sign in</NavLink></li>}
                        {!user && <li className='md:hover:text-gray-400 '><NavLink to={"/auth/signup"} onClick={() => setNavOpen(false)}><PersonAddAltIcon className='bottom-[2px] relative' /> Sign up</NavLink></li>}
                    </ul>
                </div>
            </aside>
        </nav>
    )
}

export default Navigation