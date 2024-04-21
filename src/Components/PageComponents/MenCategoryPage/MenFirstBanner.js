import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import MFB1 from "../../../Assets/Images/MenCategory/MFB1.png"
import MFB2 from "../../../Assets/Images/MenCategory/MFB2.png"

const MenFirstBanner = (props) => {
    const { slug } = props;
    const { sectionOneBanner } = props
    // const [banners,setBanners]=useState([])
    // useEffect(()=>{
    //     axios.get(`/categoryBannerSlider/${slug}`,{
    //         headers: {
    //             'Accept': 'application/json',
    //         }
    //     }).then(res=>{
    //         console.log("💥",res.data.categoryBanners);
    //         // setBanners(res.data.categoryBanners);
    //         setBanners([]);
    //         res.data.map((item, index) => {
    //             setBanners(prevState => [...prevState, item.type, {image: item.image}])
    //         })
    //     }).catch(err=>{
    //         console.log(err.message);
    //     })
    // },[slug])


    // useEffect(() => {
    //     console.log(banners);
    // }, [banners])

    // console.log("🔷",banners);
    return (
        <div className="container mx-auto px-4 mt-8">
            <div className="md:pr-7">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {sectionOneBanner && sectionOneBanner.map((item, index) => (
                        <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                            <a href={item.link}>
                                <img key={index} src={item.image} alt="Banner Section" className={item.image ? "w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                            </a>

                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default MenFirstBanner
