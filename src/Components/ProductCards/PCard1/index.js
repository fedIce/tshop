import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../../databse'

const PCard1 = ({ id, image, title, price, discount_price=null}) => {
  return (
    <Link to={`/product/${id}`} className={`ease_transition w-[14rem] h-auto flex flex-col hover:scale-105 cursor-pointer`}>
        <div className='w-full'>
            <img src={image}
                className='w-full h-72 rounded-2xl rounded-b-none object-cover' />
        </div>
        <div className='flex flex-col'>
            <div className='font-semibold text-md'>{title}</div>
            <div className='font-bold text-lg flex items-center space-x-3'>
                {(discount_price && typeof discount_price === 'number') && <div className='text-gray-400 line-through'>₦{parseFloat(discount_price + price).toFixed(2)}</div>}
                <div>₦{numberWithCommas(price)}</div>
            </div>
        </div>
    </Link>
  )
}

export default PCard1