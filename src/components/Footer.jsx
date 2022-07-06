import React from 'react'
import  {FaTwitterSquare, FaFacebookSquare, FaDiscord} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='w-full flex justify-between md:justify-around items-center bg-sky-900'>
      <div className='font-extrabold text-yellow-100'>
        Join us!
      </div>
      <div className='flex justify-around items-center'>
        <FaTwitterSquare size={'30'} className='mx-2 my-2 bg-white rounded-md'/>
        <FaFacebookSquare size={'30'} className='mx-2 my-2 bg-white rounded-md'/>
        <FaDiscord size={'30'} className='mx-2 my-2 bg-white rounded-md'/>
      </div>
    </footer>
  )
}

export default Footer
