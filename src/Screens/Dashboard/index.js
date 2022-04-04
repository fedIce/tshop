import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../GlobalContexts/AuthProvider'
import DashboardHeader from './DashboardComponents/DashboardHeader'
import SideBar from './DashboardComponents/SideBar'

const Dashboard = () => {
    const location = useLocation()
    const auth = useAuth()
    const atDashboard = location.pathname === "/dashboard"
    return (
        <div className='relative w-full h-full px-5 flex justify-center items-center inset-0 overflow-hidden bg-purple-800'>
            {atDashboard && <Navigate to="main" />}
            <div className='w-[15%] h-full mt-10'>
                <SideBar />
            </div>
            <div className='flex-1 h-[95%] rounded-3xl bg-white overflow-hidden'>
                <div className='flex h-full w-full mt-5'>

                    <div className='flex-1 h-full px-5 overflow-hidden relative'>
                        <DashboardHeader user={auth.user_data} />
                        <Outlet />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard