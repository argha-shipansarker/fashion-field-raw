import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import MenSecondB from "../../../Assets/Images/MenCategory/MenSecondB.png"
import FirstBannerImage from "../../../Assets/Images/FirstBannerU.jpg"

const MenSecondBanner = (props) => {
    const { slug } = props;
    const { sectionTwoBanner } = props

    return (
        <div className="container mx-auto px-4 mt-8">
            {sectionTwoBanner && sectionTwoBanner.map((item, index) => (
                <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300 md:mr-7">
                    <a href={item.link}>
                        <img key={index} src={item.image} alt="Banner Section" className={item.image ? "w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300 px-2" : "hidden"} />
                    </a>
                </div>
            ))}

        </div>
    )
}

export default MenSecondBanner
