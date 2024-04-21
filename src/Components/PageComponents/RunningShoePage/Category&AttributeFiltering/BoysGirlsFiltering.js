import React, { useState, useEffect, useRef } from 'react'

import { BiMinus, BiPlus } from "react-icons/bi"

const BoysGirlsFiltering = props => {
    const { openBoysGirls, setOpenBoysGirls } = props
    const boysGirlsFiltering = useRef()
    const [boysGirlsHeight, setBoysGirlsHeight] = useState(0)

    useEffect(() => {
        setBoysGirlsHeight(boysGirlsFiltering.current.clientHeight)
    }, [openBoysGirls])

    return (
        <div className="boysGirls mb-7.5">
            <div className="flex justify-between items-center mb-2.75">
                <p className="font-Poppins font-semibold text-base text-topBarTextColor">Boys & Girls</p>
                <div onClick={() => setOpenBoysGirls(prevState => !prevState)}>
                    {
                        openBoysGirls ? <BiMinus className="text-filteringIcon text-xl cursor-pointer" /> : <BiPlus className="text-filteringIcon text-xl cursor-pointer" />
                    }
                </div>
            </div>
            <hr className="border-t-2" />
            <div className="collapse-pannel" style={openBoysGirls ? { height: boysGirlsHeight } : { height: 0 }}>
                <div ref={boysGirlsFiltering} className="pt-3.25">
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Boy's Clothing</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Girl's Clothing</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Kids Footwear</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Accessories</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription"><span>Toys</span></p>
                </div>
            </div>
        </div>
    )
}

export default BoysGirlsFiltering
