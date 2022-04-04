import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../GlobalContexts/AuthProvider'
import LogoArea from '../LogoArea'
import SearchBar from '../SearchBar'
import ShoppingCartIcon from '../ShoppingCartIcon'
import SwitchStore from '../SwitchStore'
import UserCircle from '../UserCircle'

const Header = () => {

    const auth = useAuth()
    return (
        <div className='w-full h-20 rounded-t-2xl flex items-center top-0 left-0'>
            <div className='mx-5'>
                <LogoArea />
            </div>
            <div className='mx-10 flex space-x-5 items-center'>
                <div>
                    <SwitchStore />
                </div>
                <div>
                    <SearchBar />
                </div>
            </div>
            <div className='ml-auto flex space-x-5 mx-5 items-center'>
                <div>
                    <ShoppingCartIcon />
                </div>
                <div>
                    {
                        auth.user ?
                            <UserCircle />
                            :
                            <div className='flex items-center space-x-4 text-md font-semibold px-5'>
                                <Link to="/signin">Log In</Link>
                                <Link to="/signup" className='bg-purple-900 px-4 py-2 text-white rounded-xl'>Sign Up</Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header