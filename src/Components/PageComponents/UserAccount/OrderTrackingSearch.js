import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const OrderTrackingSearch = () => {

    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    const [orderNumber, setOrderNumber] = useState("")

    const handleOrderTrackingSearch = () => {
        if (orderNumber != "") {
            window.location.replace(`/order/tracking/${orderNumber}`)
        }
    }

    return (
        <div className="container mx-auto pl-4 pr-4 md:pr-7">

            <div className="md:px-80">
                <p className="font-Poppins font-bold text-topBarTextColor text-4xl text-center mt-20">Order Tracking</p>

                <div className="mt-6 flex justify-center">
                    <ol className="list-reset flex text-sm font-medium font-Poppins">
                        <li><Link to="/" className="text-logobarElementBG">Home</Link></li>
                        <li><span className="mx-2 text-mutedText">/</span></li>
                        <li className="text-mutedText">Order Tracking</li>
                    </ol>
                </div>

                <p className="font-Poppins text-sliderDescription text-base mt-18">To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>

                <p className="font-Poppins text-orderTrack text-lg font-medium mt-10">Order Number <span className="text-logobarElementBG">*</span></p>

                <input type="text" placeholder="Enter your order Number" className="h-12 w-full px-7 border-2 focus:outline-none rounded mt-6" value={orderNumber} onChange={e => setOrderNumber(e.target.value)} />

                <div className="h-11 bg-logobarElementBG flex items-center justify-center px-4 mt-10 rounded cursor-pointer" onClick={handleOrderTrackingSearch}>
                    <p className="uppercase font-Poppins font-semibold text-sm text-white">Track Your Order</p>
                </div>

            </div>

        </div>
    )
}

export default OrderTrackingSearch
