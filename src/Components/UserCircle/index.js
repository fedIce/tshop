import { LogoutIcon, TemplateIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../GlobalContexts/AuthProvider'

const UserCircle = () => {
    const auth = useAuth()
    const [open, setOpen] = useState(false)
    return (
        <div className='dropdown relative'>
            <div onClick={() => setOpen(!open)} className='w-12 h-12 dropdown-toggle relative cursor-pointer'>
                <img src="https://cdnb.artstation.com/p/assets/images/images/034/457/389/large/shin-min-jeong-.jpg?1612345145" className='w-full h-full rounded-full aspect-square' />
            </div>
            <ul className={`dropdown-menu ${open ? 'block' : 'hidden'} min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none -translate-x-28`}
                aria-labelledby="dropdownMenuButton2" >
                <li>
                    <Link to="/dashboard" className=" rounded-t-lg dropdown-item text-sm py-2 px-4 flex  font-normal space-x-4 w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                        <span><TemplateIcon className='w-5 h-5' /></span>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li>
                    <div onClick={() => auth.signout()} className=" dropdown-item cursor-pointer text-sm border-t-2 flex space-x-4 py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                        <span><LogoutIcon className='w-5 h-5' /></span>
                        <span>Log Out</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default UserCircle