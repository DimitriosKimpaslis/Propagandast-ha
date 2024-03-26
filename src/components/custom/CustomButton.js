import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomButton = (props) => {
    const { text, path, callback, type, size } = props
    const navigate = useNavigate()
    const handleClick = () => {
        if (callback) {
            callback()
        } else {
            navigate(path)
        }
    }
    const handleSize = () => {
        if (!size) {
            return 'text-xl px-8 py-2'
        } else if (size === 'small') {
            return 'text-base px-3 py-1'
        }
    }
    return (
        <button className={`border-4  border-pink bg-dark-gray text-light-white font-semibold sm:hover:bg-pink sm:hover:text-dark-gray transition-colors duration-200 ${handleSize()}`} onClick={handleClick} type={type ? type : 'submit'}>{text ? text : 'no text given'}</button>
    )
}

export default CustomButton