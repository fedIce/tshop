import React from 'react'

const TopSellers = () => {
    return (
        <div className='mt-5'>
            <div className='flex justify-between py-5'>
                <span className='text-md font-medium'>Top Selling Products</span>
                <span className='text-sm font-medium'>see all</span>
            </div>
            <div className='mt-5 space-y-5'>
                <TSItem />
                <TSItem />
                <TSItem />
                <TSItem />
            </div>
        </div>
    )
}

const TSItem = () => {
    return (
        <div className='flex space-x-4 items-center text-gray-600'>
            <span>1.</span>
            <div className='w-14 h-16'>
                <img src="https://thumbs.dreamstime.com/z/fashion-model-girl-casul-hipster-cloth-high-look-glamor-stylish-beautiful-young-woman-red-lips-black-cap-blowing-bubblegum-49246316.jpg" className='w-full h-full object-cover' />
            </div>
            <div className='flex flex-col '>
                <span>Glamour Et Viol </span>
                <span>$34.00</span>
            </div>
        </div>
    )
}

export default TopSellers