import React from 'react'
import MultiRowCarousel from './MultiRowCarousel'

const RecentlySold = ({products}) => {


    return (
        <div>
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Recently Sold</p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-1"></div>
            <MultiRowCarousel products={products} />
        </div>
    )
}

export default RecentlySold
