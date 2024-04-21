import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { BiMinus, BiPlus } from "react-icons/bi"

const MenFiltering = props => {
    const { openMen, setOpenMen, pathname } = props
    const [openClothing, setOpenClothing] = useState(false)
    const [openWatches, setOpenWatches] = useState(false)
    const [openFootwear, setOpenFootwear] = useState(false)
    const [openCare, setOpenCare] = useState(false)
    const [openAccessories, setOpenAccessories] = useState(false)

    const menFiltering = useRef()

    // console.log(pathname)

    useEffect(() => {
        if (openClothing) {
            setOpenWatches(false)
            setOpenFootwear(false)
            setOpenCare(false)
            setOpenAccessories(false)
        }
    }, [openClothing])

    useEffect(() => {
        if (openWatches) {
            setOpenClothing(false)
            setOpenFootwear(false)
            setOpenCare(false)
            setOpenAccessories(false)
        }
    }, [openWatches])

    useEffect(() => {
        if (openFootwear) {
            setOpenClothing(false)
            setOpenWatches(false)
            setOpenCare(false)
            setOpenAccessories(false)
        }
    }, [openFootwear])

    useEffect(() => {
        if (openCare) {
            setOpenClothing(false)
            setOpenWatches(false)
            setOpenFootwear(false)
            setOpenAccessories(false)
        }
    }, [openCare])

    useEffect(() => {
        if (openAccessories) {
            setOpenClothing(false)
            setOpenWatches(false)
            setOpenFootwear(false)
            setOpenCare(false)
        }
    }, [openAccessories])

    const [menSectionHeight, setMenSectionHeight] = useState(0)

    const handleMen = () => {
        setOpenMen(prevState => !prevState)
    }

    useEffect(() => {
        setMenSectionHeight(menFiltering.current.clientHeight)
    }, [openMen])

    useEffect(() => {
        setMenSectionHeight(menFiltering.current.clientHeight)
    }, [openClothing, openWatches, openFootwear, openCare, openAccessories])

    return (
        <div className="men mb-7.5">
            <div className="flex justify-between items-center mb-2.75">
                <p className="font-Poppins font-semibold text-base text-topBarTextColor">Men</p>
                <div onClick={handleMen}>
                    {
                        openMen ? <BiMinus className="text-filteringIcon text-xl cursor-pointer" /> : <BiPlus className="text-filteringIcon text-xl cursor-pointer" />
                    }
                </div>
            </div>
            <hr className="border-t-2" />
            <div className="collapse-pannel" style={openMen ? { height: menSectionHeight } : { height: 0 }}>

                <div ref={menFiltering} className="pt-3.25">

                    <p className={`font-DMSans text-sm mb-3.25 cursor-pointer transform transition-all ease-linear duration-200 ${openClothing ? "font-bold text-topBarTextColor" : "text-sliderDescription"}`}>
                        <span onClick={() => setOpenClothing(prevState => !prevState)}>Men's Clothing</span>
                    </p>
                    {
                        openClothing && <div>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Men's Shirts</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Men's T-Shirts</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Men's Polo Shirt</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Men's Ethnic</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Men's Innerwear</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Men's Tank Top</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Men's Winter</span></p>
                        </div>
                    }

                    <p className={`font-DMSans text-sm mb-3.25 cursor-pointer ${openWatches ? "font-bold text-topBarTextColor" : "text-sliderDescription"}`}>
                        <span onClick={() => setOpenWatches(prevState => !prevState)}>Men's Watches</span>
                    </p>
                    {
                        openWatches && <div>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Original Watches</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Smart Watches</span></p>
                        </div>
                    }

                    <p className={`font-DMSans text-sm mb-3.25 cursor-pointer ${openFootwear ? "font-bold text-topBarTextColor" : "text-sliderDescription"}`}>
                        <span onClick={() => setOpenFootwear(prevState => !prevState)}>Men's Footwear</span>
                    </p>
                    {
                        openFootwear && <div>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Flip Flops</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Flat Sandals</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Casual Sandals</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Hosuse Slippers</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Sneakers</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Loafers</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Casual Shoes</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Formal Shoes</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Sports Shoes</span></p>
                            <p className={`font-DMSans text-sm mb-3.25 ml-6 ${pathname.indexOf("boots") !== -1 ? "text-logobarElementBG font-bold" : "text-sliderDescription"}`}>
                                <Link to="/category/boots">Boots</Link>
                            </p>
                            <p className={`font-DMSans text-sm mb-3.25 ml-6 ${pathname.indexOf("running-shoe") !== -1 ? "text-logobarElementBG font-bold" : "text-sliderDescription"}`}>
                                <Link to="/category/running-shoe">Running Shoes</Link>
                            </p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Accessories</span></p>
                        </div>
                    }

                    <p className={`font-DMSans text-sm mb-3.25 cursor-pointer ${openCare ? "font-bold text-topBarTextColor" : "text-sliderDescription"}`}>
                        <span onClick={() => setOpenCare(prevState => !prevState)}>Men's Care</span>
                    </p>
                    {
                        openCare && <div>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Men's Perfume</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Men's Deodorant</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Skin Care</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Hair Care</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Body Care</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Shaving & Grooming Needs</span></p>
                        </div>
                    }

                    <p className={`font-DMSans text-sm mb-3.25 cursor-pointer ${openAccessories ? "font-bold text-topBarTextColor" : "text-sliderDescription"}`}>
                        <span onClick={() => setOpenAccessories(prevState => !prevState)}>Men's Accessories</span>
                    </p>
                    {
                        openAccessories && <div>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Belts</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Wallets</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Sunglasses</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Hats & Caps</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Ties & Bow Ties</span></p>
                            <p className="font-DMSans text-sm text-sliderDescription mb-3.25 ml-6"><span>Bags</span></p>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default MenFiltering
