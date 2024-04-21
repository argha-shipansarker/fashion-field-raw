import React, { useState, useRef, useEffect } from 'react'

import { BiMinus, BiPlus } from "react-icons/bi"

const WomenFiltering = props => {
    const { openWomen, setOpenWomen } = props
    const womenFiltering = useRef()
    const [womenSectionHeight, setWomenSectionHeight] = useState(0)

    useEffect(() => {
        setWomenSectionHeight(womenFiltering.current.clientHeight)
    }, [openWomen])

    return (
        <div className="women mb-7.5">
            <div className="flex justify-between items-center mb-2.75">
                <p className="font-Poppins font-semibold text-base text-topBarTextColor">Women</p>
                <div onClick={() => setOpenWomen(prevState => !prevState)}>
                    {
                        openWomen ? <BiMinus className="text-filteringIcon text-xl cursor-pointer" /> : <BiPlus className="text-filteringIcon text-xl cursor-pointer" />
                    }
                </div>
            </div>
            <hr className="border-t-2" />
            <div className="collapse-pannel" style={openWomen ? { height: womenSectionHeight } : { height: 0 }}>
                <div ref={womenFiltering} className="pt-3.25 pb-3.25">
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Women's Clothing</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Women's Footware</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Women's Watches</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Women's Accessories</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Women's Jwellery</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription"><span>Women's Beauty & Care</span></p>
                </div>
            </div>
        </div>
    )
}

export default WomenFiltering
