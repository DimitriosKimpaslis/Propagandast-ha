import React from 'react'

const Contact = () => {
    return (
        <section className='flex justify-center'>
            <div className='container border border-pink shadow-lg shadow-pink space-y-2 pt-4'>
                <div className='flex justify-center px-1'>
                    <h1 className='sm:text-5xl text-2xl font-semibold text-pink'>Contact Us</h1>
                </div>
                <div className='flex justify-center  px-1'>
                    <p className='sm:text-2xl text-base text-light-white text-center'>Have any questions? Feel free to contact us!</p>
                </div>
                <div className='flex flex-col items-center  px-1'>
                    <ul className='text-center'>
                        <li className='sm:text-2xl text-base text-light-white'>Email: <span className='text-pink hover:text-light-white cursor-pointer' onClick={() => window.location.href = 'mailto:dimitrioskimpaslis@gmail.com'}>dimitrioskimpaslis@gmail.com</span></li> 
                        <li className='sm:text-2xl text-base text-light-white'>Github: <span className='text-pink hover:text-light-white cursor-pointer' onClick={() => window.open('https://github.com/DimitriosKimpaslis', '_blank')}>https://github.com/DimitriosKimpaslis</span></li>
                    </ul>
                </div>
                <img src={require('../../media/images/funny-call-center-guy-colorful-phones-26607249.jpg')} alt='Contact Us' className='sm:w-1/2 w-full mx-auto' />
            </div>
        </section>
    )
}

export default Contact