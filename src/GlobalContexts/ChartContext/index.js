import React, { createContext, useContext, useState } from 'react'

const cart = {
    addItemToCart: (data) => null,
    removeItemFromCart: (id) => null,
    getCartItems:(id) => null,
    updateCart: (id, key, value) => null,
    getTotal: () => null,
    getDiscount: () => null
}

const CartContext = createContext(cart)

const Cart = ({children}) => {
    const [cart, setCart] = useState([])

    const addItemToCart = (data) => {
        setCart([...cart, data].sort((a, b) => a.id > b.id ? 1 : -1))
    }

    const removeItemFromCart = (id) => {
        const data = cart.filter(d => d.id !== id)
        setCart(data)
    }   

    const getCartItems =(id) => {
        const data = cart.filter(d => d.id === id)
        return data[0]
    }

    const getTotal = () => {
        let total = 0
        cart.forEach(item => {
            total += parseFloat(item.price) * parseInt(item.count)
        })
        return total
    }

    const getDiscount = () => {
        let total = 0
        cart.forEach(item => {
            if(item.discount){
                total += parseFloat(item.discount) * parseInt(item.count)
            }
        })
        return total.toFixed(2)
    }

    const updateCart = (id, key, value) => {
        if(!cart.some(i => i.id === id)) return
        console.log(id,key, value)
        let data = cart.filter(d => d.id !== id)
        let _obj = cart.filter(d => d.id === id)[0]
        _obj[key] = value
        setCart([...data, _obj].sort((a, b) => a.id > b.id ? 1 : -1))
    }

    const value = {addItemToCart, removeItemFromCart, getCartItems, updateCart, getTotal, getDiscount, cart}
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

export default Cart