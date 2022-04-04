import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from '../../../Components/Header'
import HomeTiledProductShowCaseConfiguration from '../../../Components/HomeTiledProductShowCaseConfiguration'
import NewIn from '../../../Components/NewIn/Index'
import SideNav from '../../../Components/SideNav'

const Home = () => {
    const location = useLocation()
    const atHome = location.pathname === '/'
    return (
        <div className='relative w-full h-full flex justify-center items-center inset-0 overflow-hidden bg-purple-800'>
            {atHome && <Navigate to="/home" />}
            <div className='w-[95%] h-[95%] rounded-2xl bg-white overflow-hidden'>
                <Header />
                <div className='flex h-full w-full mt-5'>
                    <div className='w-[15%] h-full mt-10'>
                        <SideNav />
                    </div>
                    <div className='flex-1 h-full px-5 overflow-auto scrollbar'>
                        <Outlet />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home