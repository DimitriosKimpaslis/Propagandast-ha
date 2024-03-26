import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import supabase from '../../route/Client';
import { GlobalLoading } from '../../route/App';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const Signup = () => {
    const { setLoading } = useContext(GlobalLoading)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({ error: false, message: '' })
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (confirmPassword !== password) {
            setError({ error: true, message: 'The passwords are different!' })
            return
        }

        if (password.length < 6) {
            setError({ error: true, message: 'The passwords must be at least 6 characters!' })
            return
        }
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        if (error) {
            setError({ error: true, message: error.message })
            return
        }
        if (data.user) {
            setLoading(true)
            supabase.from('writers').insert([{ email: email }])
            navigate('/')
            window.location.reload()
        }
    }

    return (
        <form className="shadow-lg px-8 py-4 shadow-pink space-y-10">
            <div className='space-y-1'>
                <h1 className='text-center text-pink px-10 text-3xl font-semibold mb-10'>Sign up and tell people all about your favourite films!</h1>

                <label className="block text-light-white" htmlFor="email">Email</label>
                <input className='w-full' placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} autoComplete='email' />

                <label className="block text-light-white" htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} className="w-full mb-10" id="password" type="password" placeholder="Enter your password" autoComplete="current-password" />

                <label className="block text-light-white" htmlFor="password">Confirm Password</label>
                <input onChange={(e) => setConfirmPassword(e.target.value)} className="w-full mb-10" id="password" type="password" placeholder="Enter your password" autoComplete="current-password" />


                {error.error && <p className='text-red-500 text-xs italic'><ReportGmailerrorredIcon className='mb-1' />{error.message}</p>}
            </div>

            <div className="flex items-center justify-between gap-x-10 gap-y-2 flex-wrap">
                <button onClick={handleSignUp} className="bg-pink sm:hover:bg-dark-gray text-light-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign up
                </button>
                <NavLink className="inline-block align-baseline font-bold text-sm text-pink sm:hover:text-light-white" to={'/auth/signin'}>
                    Arleady a member?
                </NavLink>
            </div>
        </form>
    )
}

export default Signup