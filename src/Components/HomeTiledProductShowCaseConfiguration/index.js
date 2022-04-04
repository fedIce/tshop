import { ChevronRightIcon } from '@heroicons/react/outline'
import React from 'react'
import { ReactComponent as Blaze } from '../../assets/blaze.svg'
import { ReactComponent as Bil } from '../../assets/bil.svg'

const HomeTiledProductShowCaseConfiguration = () => {
    return (
        <div className='flex justify-center items-center w-full h-[25rem] '>
            <div className='w-[50%] h-full grid gap-4 grid-rows-2'>

                <div className='w-auto h-full flex justify-center items-center mr-4 bg-amber-200 rounded-2xl relative'>
                    <div className='absolute top-[40%] left-20 flex flex-col items-start '>
                        <span className='font-bold text-3xl text-gray-700'>GET UP TO 50%</span>
                        <span className='text-gray-700'>For the holiday season</span>
                    </div>
                    <Bil className='w-[110%] h-[110%] object-scale' />
                    {/* <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/B9FF/production/_117751674_satan-shoes1.jpg" className='w-full aspect-auto h-full rounded-xl'/> */}
                </div>
                <div className='w-auto h-full flex justify-center items-center mr-4 bg-sky-200 rounded-2xl'>
                    <Blaze className='w-[110%] h-[110%] object-scale' />
                    {/* <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/B9FF/production/_117751674_satan-shoes1.jpg" className='w-full aspect-auto h-full rounded-xl'/> */}
                </div>
            </div>
            <div className='w-[50%] h-full grid gap-4 grid-cols-2'>
                <div className='w-auto h-full bg-gray-200 rounded-2xl relative'>
                    <div className='w-10 h-10 rounded-full flex justify-center items-center bg-white absolute bottom-5 right-5'>
                        <ChevronRightIcon className='w-5 h-5 text-gray-500' />
                    </div>
                    {/* <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/B9FF/production/_117751674_satan-shoes1.jpg" className='w-full aspect-auto h-full rounded-xl'/> */}
                </div>
                <div className='w-auto h-full bg-gray-200 rounded-2xl relative'>
                    <div className='w-10 h-10 rounded-full flex justify-center items-center bg-white absolute bottom-5 right-5'>
                        <ChevronRightIcon className='w-5 h-5 text-gray-500' />
                    </div>
                    {/* <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/B9FF/production/_117751674_satan-shoes1.jpg" className='w-full aspect-auto h-full rounded-xl'/> */}
                </div>
            </div>
        </div>
    )
}

export default HomeTiledProductShowCaseConfiguration