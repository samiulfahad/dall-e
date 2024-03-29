import React from 'react'

const FormField = ({ label, type, name, placeholder, value, handleChange, example, handleExample }) => {
  return (
    <div className='flex flex-col w-full md:w-2/3 space-y-2 justify-center items-start mx-auto'>
      <div className='flex items-center text-[14px] text-left text-gray-600'>
        <label htmlFor={name}>{label}</label>
        {example &&
          <button type='button' onClick={handleExample} className='px-2 mx-4 py-1 bg-gray-300 text-indigo-500 font-bold text-[10px]'>Example</button>}
      </div>
      <input id={name} name={name} type={type} value={value} placeholder={placeholder} onChange={handleChange} required
        className='bg-gray-50 w-full border py-[3px] border-gray-300 outline-none rounded-lg pl-2 text-sm'
      />
    </div>
  )
}

export default FormField