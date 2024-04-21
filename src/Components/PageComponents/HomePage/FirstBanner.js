import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import FirstBannerImage from "../../../Assets/Images/footware-banner.jpeg"
import "./firstBanner.css"
import "./thirdBanner.css"

const FirstBanner = () => {
  const [banners, setBanners] = useState([])
  useEffect(() => {
    axios.get("/homebannerSlider", {
      headers: {
        'Accept': 'application/json',
      }
    }).then(res => {
      console.log("💥", res.data.homePageBanner);
      setBanners(res.data.homePageBanner);
    }).catch(err => {
      console.log(err.message);
    })
  }, [])


  return (
    //hover design 1
    // <div className="container mx-auto px-4 mt-8">
    //     <div className="h-50 w-291 md:mr-7 border-new">
    //         <div className="border-new-child">
    //             <img src={FirstBannerImage} alt="Sale Banner"
    //                 // className="transform scale-101 hover:scale-105 cursor-pointer transition-all ease-linear duration-300"
    //                 className=""
    //             />
    //         </div>
    //     </div>
    // </div>

    //hover design 2
    // <div className="container mx-auto px-4 mt-8">
    //     <div className="h-50 w-291 md:mr-7 banner-border relative">
    //         {/* <div className="border-new-child"> */}
    //         <img src={FirstBannerImage} alt="Sale Banner"
    //             // className="transform scale-101 hover:scale-105 cursor-pointer transition-all ease-linear duration-300"
    //             className=""
    //         />
    //         {/* </div> */}
    //     </div>
    // </div>

    //hover design 3
    <div className="md:container mx-auto md:px-4 mt-8">
      <div className="md:mr-7 overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
        {banners &&
          banners.map((item, index) => (
            <a href={item?.bannerseconelink}>
              <img
                src={item.bannerSecOneImage}
                alt="Sale Banner"
                className={
                  item.bannerSecOneImage
                    ? "transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300 md:px-2"
                    : "hidden"
                }
              />
            </a>
          ))}
      </div>
    </div>
  );
}

export default FirstBanner
