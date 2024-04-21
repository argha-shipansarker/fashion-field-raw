import React, { forwardRef } from 'react'

import Carousel from '../../ReuseableComponents/Carousel'

import FashionAccessories from './FashionAccessories'
import FashionAccessoriesSecond from './FashionAccessoriesSecond'

const data = [
    {
        child: <FashionAccessories />
    },
    {
        child: <FashionAccessoriesSecond />
    },
]

const FashionAccessoriesCarousel = forwardRef((props, forwardedRef) => {
    return (
        <div>
            <Carousel data={data} carouselType="homeLifestyle" slidesToShow={1} arrows={false} mobileArrow={false} laptop={1} tab={1} mobile={1} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} />
        </div>
    )
})

export default FashionAccessoriesCarousel
