import React, { useState } from 'react'

import CountryLogo from "../../../Assets/Images/CountryLogo.png"
import HeadlessUIDropDown from './HeadlessUIDropDown'

const Language = [
    { name: 'English' },
    { name: 'Arabic' },
    { name: 'Bangla' },
]

const Currency = [
    { name: 'Dollar' },
    { name: 'Riyal' },
    { name: 'BDT' },
]


const TopBar = ({ appearances }) => {

    const [country, setCountry] = useState("english")
    const [currency, setCurrency] = useState("dollar")

    return (
        <div className="bg-topBarBG h-6 flex items-center" id="top">
            <div className="container mx-auto flex flex-row items-center px-4">
                <p className="font-DMSans text-xs"><span className="hidden sm:inline">Call Us: </span>{appearances?.filter(item => item.key === 'contact').map((data, index) => (<a href={`tel:+${data.value}`} key={index}>{data.value}</a>))}</p>

                <div className="font-DMSans text-xs text-topBarTextColor ml-17 hidden lg:block">{appearances.filter(item => item.key === 'address').map((data, index) => (<p key={index}>{data.value}</p>))}</div>
                {/* <div className="flex ml-auto items-center">
                    <div className="flex mr-2 items-center">
                        <div className="h-6.5 w-6.5 mr-2.5 hidden sm:block">
                            <img src={CountryLogo} alt="Country Logo" />
                        </div>
                        <HeadlessUIDropDown value={Language} setValue={setCountry} />
                    </div>
                    <div className="w-px h-4 bg-topBarVerticalSeperator mr-4"></div>
                    <HeadlessUIDropDown value={Currency} setValue={setCurrency} />
                </div> */}
            </div>
        </div>
    )
}

export default TopBar
