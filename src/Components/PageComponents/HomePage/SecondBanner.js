import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import SecondBanner1 from "../../../Assets/Images/offer-zone-01.jpg"
import SecondBanner2 from "../../../Assets/Images/offer-zone-02.jpg"
import SecondBanner3 from "../../../Assets/Images/mid-banner.jpg"
import SecondBanner4 from "../../../Assets/Images/offer-zone-03.jpg"
import SecondBanner5 from "../../../Assets/Images/offer-zone-04.jpg"

const SecondBanner = () => {
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
        <div className="container mx-auto px-4 mt-10">
            <div className="md:pr-7 grid grid-cols-1 gap-y-5 gap-x-6 md:flex">
                <div className="flex flex-col">
                    {banners && banners.map((item, index) => (
                        <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300 mb-4">
                            <a href={item?.bannersectwo2smlink}>
                                <img key={index} src={item.bannerSecTwoImage2sm} alt="first banner" className={item.bannerSecTwoImage2sm ? "w-full md:w-70 h-54 transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                            </a>
                        </div>
                    ))}
                    {banners && banners.map((item, index) => (
                        <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                            <a href={item?.bannersectwo3smlink}>
                                <img key={index} src={item.bannerSecTwoImage3sm} alt="first banner" className={item.bannerSecTwoImage3sm ? "w-full md:w-70 h-54 transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                            </a>
                        </div>
                    ))}
                </div>
                {banners && banners.map((item, index) => (
                    <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                        <a href={item?.bannersectwo1lglink}>
                            <img key={index} src={item.bannerSecTwoImage1Lg} alt="first banner" className={item.bannerSecTwoImage1Lg ? "w-full h-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                        </a>
                    </div>
                ))}
                <div className="flex flex-col">
                    {banners && banners.map((item, index) => (
                        <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300 mb-4">
                            <a href={item?.bannersectwo4smlink}>
                                <img key={index} src={item.bannerSecTwoImage4sm} alt="first banner" className={item.bannerSecTwoImage4sm ? "w-full md:w-70 h-54 transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                            </a>
                        </div>
                    ))}
                    {banners && banners.map((item, index) => (
                        <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                            <a href={item?.bannersectwo5smlink}>
                                <img key={index} src={item.bannerSecTwoImage5sm} alt="first banner" className={item.bannerSecTwoImage5sm ? "w-full md:w-70 h-54 transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SecondBanner
