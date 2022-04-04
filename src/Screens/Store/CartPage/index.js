import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { Database, numberWithCommas } from '../../../databse'
import { useCart } from '../../../GlobalContexts/ChartContext'
import CheckOut from './CheckOut'


const OrderCard = ({id, title, size, color, image, prize, count}) => {
    const cart = useCart()


    return (
        <div className='flex space-x-3 p-5'>
            <div className='h-[95%] w-[35%]'>
                <img src={image} className='w-full h-full object-cover rounded-xl' />
            </div>
            <div>
                <div className='font-bold text-md mb-2 text-gray-800'>{title.length > 20? title.slice(0, 17)+'...' : title}</div>
                <div className='flex space-x-5'>
                    <div>
                        <span className='font-light text-sm text-gray-400'>Size </span>
                        <span>{size}</span>
                    </div>
                    <div>
                        <span className='font-light text-sm text-gray-400'>Color </span>
                        <span>{color}</span>
                    </div>
                </div>
                <div className='flex items-center space-x-1'>
                    <span className='font-bold text-lg text-gray-800'>₦{numberWithCommas((parseFloat(prize) * parseInt(count)).toFixed(2)) }</span>
                    <span className='font-light text-sm text-gray-400'>x</span>
                    <span className='font-light text-lg text-gray-400'> {count}</span>
                </div>
                <div className='flex items-center space-x-3'>
                    <div className='flex justify-between items-center'>
                        <div onClick={() => cart.updateCart(id,"count",count - 1) } className='p-2 bg-green-400 rounded-full'><MinusIcon className='w-3 h-3 text-white' /></div>
                        <div className='p-2 h-full w-10 flex items-center justify-center'>{count}</div>
                        <div onClick={() => cart.updateCart(id,"count",count + 1) } className='p-2 bg-green-400 rounded-full'><PlusIcon className='w-3 h-3 text-white' /></div>
                    </div>
                    <div onClick={() => cart.removeItemFromCart(id)} className='p-2 bg-red-400 rounded-full'><TrashIcon className='w-3 h-3 text-white' /></div>
                </div>
            </div>
        </div>
    )
}

const CartPage = () => {
    const cart = useCart()
    const db = new Database()

    const total = cart.getTotal()
    const delivery = db.getDeliveryCost(1)
    const discount = cart.getDiscount()
    console.log(cart.cart)
    console.log(discount)
    return (
        <div className='w-full h-full flex'>
            <div className='w-[70%] h-full'>
                <CheckOut total={total ? (total - discount).toFixed(2) : 0}  />
            </div>
            <div className='flex-1 h-full'>
                <div className='w-auto  min-h-[40%] h-[80%] overflow-hidden mx-5 border-2 border-gray-200 rounded-xl'>
                    <div className='w-auto h-20 border-b-2 border-gray-200 mx-5 mb-2 '>
                        <div className='p-5 font-semibold text-gray-600' > Your Order ({cart.cart?.length})</div>
                    </div>
                    <div className='w-full overflow-y-auto scrollbar-sm h-[60%] '>
                        <div>
                            {
                                (cart.cart && cart.cart.length > 0)?
                                cart.cart?.map((item, indx) => {
                                    return <OrderCard key={item.id} id={item.id} title={item.title} prize={item.price} image={item.image} count={item.count} color={item.color}  />
                                })
                                :
                                (
                                    <div className='flex flex-1 justify-center flex-col items-center py-5'>
                                        <img src="https://media.istockphoto.com/vectors/empty-shopping-bag-icon-online-business-vector-icon-template-vector-id861576608?k=20&m=861576608&s=612x612&w=0&h=UgHaPYlYrsPTO6BKKTzizGQqFgqEnn7eYK9EOA16uDs="
                                            className='h-40 w-40 object-cover'/>
                                            <span className='m-2 text-gray-300 text-lg font-light'>Your cart is empty</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className='w-full h-[50px]'></div>
                    </div>
                    <div className='w-auto h-[10px] mx-5 border-b-2 border-gray-200'></div>
                    <div className='mt-5'>
                        <div className='flex justify-between items-center text-xs px-5 py-2'>
                            <span>Delivery</span>
                            <span className='font-semibold '>₦{numberWithCommas(delivery)} <span className='font-light text-gray-400'>(Express)</span></span>
                        </div>
                       { (discount !== undefined  && discount >= 1) && 
                       <div className='flex justify-between items-center text-xs px-5 py-2'>
                            <span>Discount</span>
                            <span className='font-semibold '>-₦{numberWithCommas(discount)}</span>
                        </div>}
                        <div className='h-auto w-auto m-1 mx-5 border-t-2 flex py-2 px-10 text-lg font-bold  justify-between items-center'>
                            <span>Total</span>
                            <span>₦{total ? numberWithCommas((total - discount).toFixed(2)) : 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage