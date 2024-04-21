import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';

import { openingCartSideBar } from "../ReduxStore/CartSystem/CartStore"
import Draggable from 'react-draggable';
import UseWindowDimensionsHook from '../Components/ReuseableComponents/UseWindowDimensionsHook';

const CartButton = props => {
    const { setCartSideBar } = props

    const { height, width } = UseWindowDimensionsHook();

    const history = useHistory()

    useEffect(() => {
        console.log(width)
    }, [width])

    const dispatch = useDispatch()

    const { cartItem } = useSelector(state => state.testCart)

    const test = data => {
        console.log(data.x)
        console.log(data.y)
    }

    return (
        // <Draggable onDrag={(e, data) => test(data)}>
        <div
            className="w-12.5 h-12.5 flex justify-center bg-white items-center fixed bottom-30 right-8 rounded-3xl cursor-pointer cart z-20"
            // onClick={() => setCartSideBar(prevState => !prevState)}
            onClick={() => width > 640 ? dispatch(openingCartSideBar()) : history.push("/cart")}
            style={{ boxShadow: "0px 0px 25px -10px #000000" }}
        >
            <div className="relative h-full w-full flex justify-center items-center">
                <i className="far fa-shopping-bag" style={{ fontSize: 20 }}></i>

                <div className="absolute w-6 h-6 bg-logobarElementBG flex justify-center items-center -top-2 -right-2" style={{ borderRadius: "50%" }}>
                    <p className="text-white font-Poppins font-bold text-xs">{cartItem}</p>
                </div>
            </div>
        </div>
        // </Draggable>
    )
}

export default CartButton
