import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./thirdBanner.css"
import { Link } from 'react-router-dom'

import ThirdBanner1 from "../../../Assets/Images/SALE-BANNER-1.jpg"
import ThirdBanner2 from "../../../Assets/Images/SALE-BANNER-2.jpg"
import ThirdBanner3 from "../../../Assets/Images/SALE-BANNER-3.jpg"

const ThirdBanner = () => {
    const [banners, setBanners] = useState([])
    useEffect(() => {
        axios.get("/homebannerSlider", {
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => {
            // console.log("💥",res.data.homePageBanner);
            setBanners(res.data.homePageBanner);
        }).catch(err => {
            console.log(err.message);
        })
    }, [])

    // console.log("🏆",banners);
    return (
        <div className="container mx-auto px-4 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:pr-7">
                {banners && banners.map((item, index) => (
                    <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                        <a href={item?.bannersecthree1link}>
                            <img key={index} src={item.bannerSecThreeImage1} alt="first banner" className={item.bannerSecThreeImage1 ? "w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                        </a>
                    </div>
                ))}
                {/* <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                
                    <img src={ThirdBanner1} alt="Third Banner" className="w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" />
            
                </div> */}
                {banners && banners.map((item, index) => (
                    <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                        <a href={item?.bannersecthree2link}>
                            <img key={index} src={item.bannerSecThreeImage2} alt="first banner" className={item.bannerSecThreeImage2 ? "w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                        </a>
                    </div>
                ))}
                {/* <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                    <img src={ThirdBanner2} alt="Third Banner" className="w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" />
                </div> */}
                {banners && banners.map((item, index) => (
                    <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                        <a href={item?.bannersecthree3link}>
                            <img key={index} src={item.bannerSecThreeImage3} alt="first banner" className={item.bannerSecThreeImage3 ? "w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                        </a>
                    </div>
                ))}
                {/* <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                    <img src={ThirdBanner3} alt="Third Banner" className="w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" />
                </div> */}
            </div>
        </div>
    )
}

export default ThirdBanner
