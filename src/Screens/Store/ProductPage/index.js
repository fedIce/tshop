import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, ChevronLeftIcon, HeartIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Database, numberWithCommas } from '../../../databse';
import { useCart } from '../../../GlobalContexts/ChartContext';

const ProductPage = () => {
    const [item, setItem] = useState(null)
    const [colors, setColors] = useState(null)
    const [color, setColor] = useState(null)
    const [count, setCount] = useState(1)

    const navigate = useNavigate()
    const cart = useCart()
    let { id } = useParams();
    const database = new Database()
    const [product, setProducts] = useState(null)
    const [cartProduct, setCartProduct] = useState(null)



    let inCart = cart.cart.some(i => i.id === product?.id)

    useEffect(() => {
        (async () => await database.fetchProductById(id).then((res) => {
            setProducts(res)
        }))();
    }, [])

    useEffect(() => {
        (async () => {
            if(product){
                setCartProduct({
                    id: product?.id,
                    title: product?.title,
                    price: product?.price,
                    count: parseInt(count),
                    color: color,
                    size: colors?.size,
                    image: product?.image
                })
            }
        })().then(() => {
            if (cartProduct) {
                if (product?.discount_price) {
                    setCartProduct({ ...cartProduct, discount: product.discount_price })
                }

                setColors(product?.sizes[0])
                setColor(product?.sizes[0].colors[0])
            }
        })
    }, [product])

    const addProductToCart = () => {
        setItem(true)
        cart.addItemToCart(cartProduct)
    }

    const selectColor = async (item) => {
        setColors(item)
        setNewColor(item.colors[0])
        cart.updateCart(product.id, 'size', item.size)

    }

    const setNewColor = async (value) => {
        setColor(value)
        cart.updateCart(product.id, 'color', value)

    }

    const setNewCount = async (value) => {
        if (value <= 0) {
            cart.removeItemFromCart(product.id)
            inCart = false
            setItem(false)

            return
        }
        setCount(value)
        cart.updateCart(product.id, 'count', value)

    }


    return product ? (
        <div className='flex h-[80%] justify-center items-center relative'>
            <div onClick={() => navigate(-1)} className='ease_transition absolute top-[5%] left-5 cursor-pointer hover:scale-90'>
                <ChevronLeftIcon className='w-10 h-10 stroke-slate-400' />
            </div>
            <div className='w-[60%] flex'>
                <div className='flex flex-col justify-center items-center space-y-6 w-[20%] m-5'>
                    <div>
                        <ChevronDoubleUpIcon className='w-10 h-10 text-gray-400' />
                    </div>
                    <div>
                        <img src={product.image} className="w-24 h-24 aspect-square rounded-full object-cover" />
                    </div>
                    <div>
                        <img src={product.image} className="w-24 h-24 aspect-square rounded-full object-cover" />
                    </div>
                    <div>
                        <img src={product.image} className="w-24 h-24 aspect-square rounded-full object-cover" />
                    </div>
                    <div>
                        <ChevronDoubleDownIcon className='w-10 h-10 text-gray-400' />
                    </div>
                </div>
                <div className='h-full w-[80%]'>
                    <img src={product.image} className="w-full h-full object-contain" />
                </div>
            </div>
            <div className='px-5 flex flex-col items-start justify-start h-[80%] space-y-5'>
                <div className=' flex space-x-4 items-center'>
                    <span className='px-5 py-3 bg-white shadow-md text-sm rounded-full'>axios design</span>
                    <span className='px-5 py-3 bg-white shadow-md text-sm rounded-full'>over sized style</span>
                    <span className='px-5 py-3 bg-white shadow-md text-sm rounded-full'>shirt</span>
                </div>
                <div className='px-5 text-3xl max-w-[80%]'>
                    {product.title}
                </div>
                <div className='px-5 flex space-x-5 font-semibold text-gray-800 text-lg'>
                    {product?.discount_price && <div className='text-gray-400 line-through'>₦{numberWithCommas(parseFloat(product.discount_price + product.price).toFixed(2))}</div>}
                    <div>
                        ₦{numberWithCommas(product.price)}
                    </div>
                </div>
                <div className='flex items-center space-x-4 px-5'>
                    <span>color: </span>
                    {
                        colors?.colors?.map((_color, indx) => {
                            return <span onClick={() => setNewColor(_color)} key={indx} className={`h-5 w-5 rounded-full bg-[${_color}] ${_color === color && ' border-4 border-gray-300'} `}></span>
                        })
                    }

                </div>
                <div className='flex items-center space-x-4 px-5'>
                    <span className='h-5 py-5 flex justify-center items-center'>size: </span>
                    {
                        product.sizes?.map((size, indx) => {
                            return <span onClick={() => selectColor(size)} key={indx} className={`h-5  p-3 rounded-2xl border-gray-200 border-2 flex justify-center uppercase items-center ${colors?.size === size.size && 'bg-gray-300 text-white'}`}> {size.size} </span>
                        })
                    }

                </div>
                <div className='flex items-center space-x-4 px-5 '>
                    {(!item && !inCart) && <div onClick={() => addProductToCart()} className='ease_transition px-5 py-3 rounded-full bg-green-400 hover:bg-green-300 hover:cursor-pointer hover:scale-105 text-white text-md font-semibold'>ADD TO BAG </div>}
                    {(item || inCart) &&
                        <div className='flex items-center h-fit rounded-full'>
                            <div onClick={() => setNewCount(count - 1)} className='h-10 w-10 bg-green-400 flex justify-center items-center rounded-full cursor-pointer '>{count <= 1 ? <TrashIcon className='w-5 text-white h-5' /> : <MinusIcon className='w-5 text-white h-5' />}</div>
                            <div className='w-20 h-10 flex justify-center items-center text-gray-400 '>{count}</div>
                            <div onClick={() => setNewCount(count + 1)} className='h-10 w-10 bg-green-400 flex justify-center items-center rounded-full cursor-pointer '><PlusIcon className='w-5 text-white h-5' /></div>
                        </div>}
                    <div className='rounded-full p-3 bg-gray-200 justify-center items-center'><HeartIcon className='w-5 h-5' /> </div>
                </div>
            </div>
        </div>
    ) : (
        <div className='w-full h-full flex justify-center items-center'>
            <span>Loading...</span>
        </div>
    )
}

export default ProductPage