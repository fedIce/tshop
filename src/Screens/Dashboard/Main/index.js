import { ViewListIcon } from '@heroicons/react/outline'
import React from 'react'
import TopSellers from '../DashboardComponents/TopSellers'

const Main = () => {
  return (
    <div className='flex h-full overflow-auto px-5'>
        <div className='w-[70%] h-full'>
            <div className='w-full flex space-x-10'>
                <div className='bg-teal-100 w-auto justify-end h-28 rounded-tl-3xl rounded-br-3xl flex px-7 items-center'>
                    <div className='h-14 w-12 bg-white flex justify-center items-center rounded-tl-xl rounded-br-xl'>
                        <ViewListIcon className='w-5 h-5' />
                    </div>
                    <div className='p-5 text-purple-900 flex flex-col items-start'>
                        <span className='text-2xl font-semibold'>23,000</span>
                        <span className='font-medium'>orders</span>
                    </div>
                    <div className='h-6 w-auto py-4 px-2 text-white text-sm font-medium bg-purple-900 flex justify-center items-center rounded-tl-xl rounded-br-xl'>
                        + 20
                    </div>
                </div>
                <div className='bg-pink-300 w-auto justify-end h-28 rounded-tl-3xl rounded-br-3xl flex px-7 items-center'>
                    <div className='h-14 w-12 bg-white flex justify-center items-center rounded-tl-xl rounded-br-xl'>
                        <ViewListIcon className='w-5 h-5' />
                    </div>
                    <div className='p-5 text-purple-900 flex flex-col items-start'>
                        <span className='text-2xl font-semibold'>₦23,000</span>
                        <span className='font-medium'>sales</span>
                    </div>
                    <div className='h-6 w-auto py-4 px-2 text-white text-sm font-medium bg-purple-900 flex justify-center items-center rounded-tl-xl rounded-br-xl'>
                        + ₦ 230,000
                    </div>
                </div>
                
            </div>
            <div></div>
        </div>
        <div className='w-[30%] h-full'>
            <div>
                <TopSellers />
            </div>
        </div>
    </div>
  )
}

export default Main