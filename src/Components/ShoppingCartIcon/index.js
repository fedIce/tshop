import { ShoppingBagIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../GlobalContexts/ChartContext'

const ShoppingCartIcon = () => {
    const cart = useCart()
    return (
        <Link to="/cart">
            <div className='relative'>
                <ShoppingBagIcon className='base-icon' />
                {cart.cart?.length > 0 && <span className='absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 flex justify-center items-center text-sm font-medium rounded-full'>{cart.cart?.length}</span>}
            </div>
        </Link>
    )
}

export default ShoppingCartIcon