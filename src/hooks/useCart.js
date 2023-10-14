import AppContext from "../context"
import React from 'react'


export const useCart = ()=>{
    const {setCart, cart} = React.useContext(AppContext)
    const totalPrice = cart.reduce((sum, obj) => Number(obj.price) + sum, 0);
    return {setCart, cart, totalPrice}
}