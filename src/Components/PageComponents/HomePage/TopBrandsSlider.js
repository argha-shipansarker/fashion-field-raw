import React, { useState, useEffect } from 'react'
import axios from "axios"
import Carousel from '../../ReuseableComponents/Carousel'
import LazyLoad from 'react-lazyload';

import Brand1 from "../../../Assets/Images/Brand1.png"
import Brand2 from "../../../Assets/Images/Brand2.png"
import Brand3 from "../../../Assets/Images/Brand3.png"
import Brand4 from "../../../Assets/Images/Brand4.png"
import Brand5 from "../../../Assets/Images/Brand5.png"

const data = [
    Brand1,
    Brand2,
    Brand3,
    Brand4,
    Brand5,
    Brand2,
]



const TopBrandsSlider = () => {
    const [brand, setBrand] = useState(null)
    useEffect(() => {
        axios.get(`/brandlogos`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            console.log("💥", response.data)
            // console.log(slug)
            setBrand(response.data)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [])

    // console.log("💤",brand);
    return (
        <div>
            {
                brand && <Carousel data={brand} carouselType="topBrand" slidesToShow={5} arrows={true} mobileArrow={false} laptop={3} tab={2} mobile={1} dots={false} autoplay={true} centerMode={true} />
            }


        </div>
    )
}

export default TopBrandsSlider
