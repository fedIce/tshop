import React from 'react'
import {SearchIcon} from '@heroicons/react/outline'

const SearchBar = () => {
  return (
    <div>
        <div className='h-[70%] w-auto flex justify-center items-center p-2 px-5 bg-gray-100 rounded-xl'>
            <SearchIcon className='base-icon' />
            <input placeholder='search for items brands and inspiration ...' className='w-[400px] ml-5 outline-0 bg-transparent' />
        </div>
    </div>
  )
}

export default SearchBar