import React, { useState, useEffect, useRef } from 'react'

import { BiMinus, BiPlus } from "react-icons/bi"

const PersonalCare = props => {
    const { openPersonalCare, setOpenPersonalCare } = props
    const personalFiltering = useRef()
    const [personalHeight, setPersonalHeight] = useState(0)

    useEffect(() => {
        setPersonalHeight(personalFiltering.current.clientHeight)
    }, [openPersonalCare])

    return (
        <div className="personalCare mb-7.5">
            <div className="flex justify-between items-center mb-2.75">
                <p className="font-Poppins font-semibold text-base text-topBarTextColor">Personal Care</p>
                <div onClick={() => setOpenPersonalCare(prevState => !prevState)}>
                    {
                        openPersonalCare ? <BiMinus className="text-filteringIcon text-xl cursor-pointer" /> : <BiPlus className="text-filteringIcon text-xl cursor-pointer" />
                    }
                </div>
            </div>
            <hr className="border-t-2" />
            <div className="collapse-pannel" style={openPersonalCare ? { height: personalHeight } : { height: 0 }}>
                <div ref={personalFiltering} className="pt-3.25 pb-3.25">
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Men's Care</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Women's Care</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Baby Care</span></p>
                    <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Mother's Care</span></p>
                </div>
            </div>
        </div>
    )
}

export default PersonalCare
