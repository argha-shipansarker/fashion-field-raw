import React, { useEffect, useState } from 'react'
import axios from "axios"

import Image1 from "../../../../Assets/Images/MenFootwear/FootwearFB1.png"
import Image2 from "../../../../Assets/Images/MenFootwear/FootwearFB2.png"
import Image3 from "../../../../Assets/Images/MenFootwear/FootwearFB3.png"
import { Link } from 'react-router-dom'

const FootwearFirstBanner = (props) => {
    const { sectionOneLargeBanner } = props;
    const { sectionOneSmallBanner } = props;



    return (
        <div className="container mx-auto px-4 mt-8">
            <div className="md:pr-7 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                    {sectionOneLargeBanner && sectionOneLargeBanner.map((item, index) => (
                        <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                            <a href={item.link}>
                                <img key={index} src={item.image} alt="Banner Section" className={item.image ? "w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                            </a>
                        </div>
                    ))}
                    {/* <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                        <img src={Image1} className="w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" alt="Banner" />
                    </div> */}
                </div>
                <div className="w-full md:col-span-4">
                    <div className="flex flex-col justify-between">
                        {sectionOneSmallBanner && sectionOneSmallBanner.map((item, index) => (
                            <div className="overflow-hidden box-border border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300 mb-4">
                                <a href={item.link}>
                                    <img key={index} src={item.image} alt="Banner Section" className={item.image ? "w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                                </a>
                            </div>
                        ))}
                        {/* <div className="overflow-hidden box-border border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                            <img src={Image2} className="w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" alt="Banner" />
                        </div>
                        <div className="mt-4.5 overflow-hidden box-border border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                            <img src={Image3} className="w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" alt="Banner" />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FootwearFirstBanner
