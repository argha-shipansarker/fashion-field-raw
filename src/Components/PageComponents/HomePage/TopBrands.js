import React, { useEffect } from 'react'
import LazyLoad from 'react-lazyload';

import TopBrandsSlider from './TopBrandsSlider'

const TopBrands = () => {
    useEffect(() => {
        console.log("hellllloooo again top brand component is loaded")
    }, [])
    return (
        <div className="container mx-auto px-4 mt-11">
            <div className="mb-6">
                <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Top Brands</p>
                <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg"></div>
            </div>
            <TopBrandsSlider />

        </div>
    )
}

export default TopBrands
