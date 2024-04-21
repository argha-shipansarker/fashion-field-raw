import React from 'react'
import MultiRowCarousel from './MultiRowCarousel'

const TopRated = ({products}) => {
    return (
        <div>
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Top Rated</p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-1"></div>
            <MultiRowCarousel products={products} />
        </div>
    )
}

export default TopRated
