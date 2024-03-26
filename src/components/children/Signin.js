import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { GlobalLoading } from '../../route/App';
import supabase from '../../route/Client';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const Signin = () => {
    const { setLoading } = useContext(GlobalLoading)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorExist, setErrorExist] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        setErrorExist(false)
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            setErrorExist(true)
            setErrorMessage(error.message)
        } else {
            setLoading(true)
            navigate('/')
            window.location.reload()
        }
    }

    return (
        <form className="shadow-lg px-8 py-4 shadow-pink space-y-10">
            <div className='space-y-1'>
                <h1 className='text-center text-pink font-semibold text-3xl mb-10'>Sign in</h1>
                <label className="block text-light-white" htmlFor="email">Email</label>
                <input className='w-full' placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} autoComplete='email' />

                <label className="block text-light-white" htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} className="w-full mb-10" id="password" type="password" placeholder="Enter your password" autoComplete="current-password" />

                {errorExist ? <p className='text-red-500 text-xs italic'><ReportGmailerrorredIcon className='mb-1' />
                    {errorMessage}</p> : ''}
            </div>

            <div className="flex items-center justify-between gap-x-10 gap-y-2 flex-wrap">
                <button onClick={handleSignIn} className="bg-pink sm:hover:bg-dark-gray text-light-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign in
                </button>
                <NavLink className="inline-block align-baseline font-bold text-sm text-pink sm:hover:text-light-white" to={'/auth/signup'}>
                    Not a member yet?
                </NavLink>
            </div>
        </form>
    )
}

export default Signin