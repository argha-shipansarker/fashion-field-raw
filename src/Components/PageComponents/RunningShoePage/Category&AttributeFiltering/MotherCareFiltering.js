import React, { useState, useEffect, useRef } from 'react'

import { BiMinus, BiPlus } from "react-icons/bi"

const MotherCareFiltering = props => {
    const { openMotherCare, setOpenMotherCare } = props
    const motherFiltering = useRef()
    const [motherHeight, setMotherHeight] = useState(0)

    useEffect(() => {
        setMotherHeight(motherFiltering.current.clientHeight)
    }, [openMotherCare])

    return (
        <div className="motherCare mb-7.5">
            <div className="flex justify-between items-center mb-2.75">
                <p className="font-Poppins font-semibold text-base text-topBarTextColor">Mother Care</p>
                <div onClick={() => setOpenMotherCare(prevState => !prevState)}>
                    {
                        openMotherCare ? <BiMinus className="text-filteringIcon text-xl cursor-pointer" /> : <BiPlus className="text-filteringIcon text-xl cursor-pointer" />
                    }
                </div>
            </div>
            <hr className="border-t-2" />
            <div className="collapse-pannel" style={openMotherCare ? { height: motherHeight } : { height: 0 }}>
                <div ref={motherFiltering} className="pt-3.25">
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Mother's Care</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Baby's Care</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Nursing & Feeding</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Baby Food</span></p>
                </div>
            </div>
        </div>
    )
}

export default MotherCareFiltering
