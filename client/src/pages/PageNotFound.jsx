import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center mt-40'>
        <h1 className='text-2xl text-black text-center'>Sorry, the page you requested did not found on our server</h1>
        <div className='flex flex-col justify-center items-center'>
            <Link to="/" className='button'>Home</Link>
            <Link to="/create-post" className='button'>Create an image</Link>
        </div>
    </div>
  )
}

export default PageNotFound