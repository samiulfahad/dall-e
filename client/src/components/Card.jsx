import React from 'react'
import { download } from '../assets'
import { downloadImage } from '../utils'

const Card = (props) => {
  const opacity = "opacity-0 group-hover:opacity-100 duration-300"
  return (
    <>
      <div className="relative group">
        <img src={props.imageUrl} alt='image' className='w-full h-auto rounded-lg object-cover' />
        <div className='bg-gray-600 absolute bottom-0 flex flex-wrap max-h-[60%] w-full bg-opacity-0 group-hover:bg-opacity-80 duration-300'>
          <p className={opacity + " text-left text-white text-[15px] font-bold px-2"}>{props.description}</p>
          <div className='flex justify-between w-full px-2 pb-2 items-center'>
            <div className='flex justify-start items-center space-x-2'>
              <p className={opacity + " bg-green-500 h-6 w-6 rounded-full text-center text-white"}>{props.name[0].toUpperCase()}</p>
              <p className={opacity + " text-white font-bold"}>{props.name}</p>

            </div>
            <button>
              <img src={download} onClick={() => { downloadImage(props._id, props.imageUrl) }} className={opacity + " h-6 w-6 invert bg-transparent"} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card