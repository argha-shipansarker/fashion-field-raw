import React, { useEffect, useState } from 'react'
import axios from "axios"
import Image1 from "../../../../Assets/Images/MenFootwear/FootwearSB1.png"
import Image2 from "../../../../Assets/Images/MenFootwear/FootwearSB2.png"
import Image3 from "../../../../Assets/Images/MenFootwear/FootwearSB3.png"
import { Link } from 'react-router-dom'

const FootwearSecondBanner = (props) => {
    const { sectionTwoLargeBanner } = props;
    const { sectionTwoSmallBanner } = props;


    console.log("😎", sectionTwoSmallBanner);

    return (
        <div className="container mx-auto px-4 mt-8">
            <div className="md:pr-7 grid grid-cols-1 md:grid-cols-4 gap-4">
                {sectionTwoSmallBanner[0] && <div className="h-106 md:h-82.5 overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                    <a href={sectionTwoSmallBanner[0].link}>
                        <img src={sectionTwoSmallBanner[0].image} className={sectionTwoSmallBanner[0].image ? "w-full h-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : ""} alt="Banners" />
                    </a>
                </div>}
                {/* <div className="h-106 md:h-82.5 overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                    <img src={Image1} className="w-full h-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" alt="Banners" />
                </div> */}
                {sectionTwoLargeBanner && sectionTwoLargeBanner.map((item, index) => (
                    <div className="md:col-span-2 h-59 md:h-82.5 overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                        <a href={item.link}>
                            <img key={index} src={item.image} alt="Banner Section" className={item.image ? "w-full h-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                        </a>
                    </div>

                ))}
                {/* <div className="md:col-span-2 h-59 md:h-82.5 overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                    <img src={Image2} className="w-full h-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" alt="Banners" />
                </div> */}
                {sectionTwoSmallBanner[1] && <div className="h-106 md:h-82.5 overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                    <a href={sectionTwoSmallBanner[1].link}>
                        <img src={sectionTwoSmallBanner[1].image} className={sectionTwoSmallBanner[1].image ? "w-full h-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : ""} alt="Banners" />
                    </a>
                </div>}
            </div>
        </div>
    )
}

export default FootwearSecondBanner
