import React, { forwardRef } from 'react'
import Carousel from '../../../ReuseableComponents/Carousel'
import HomeLivingGrid from './HomeLivingGrid'
import HomeLivingGridSecond from './HomeLivingGridSecond'

const data = [
    {
        child: <HomeLivingGrid />
    },
    {
        child: <HomeLivingGridSecond />
    },
]

const HomeLifestyleCarousel = forwardRef((props, forwardedRef) => {
    return (
        <div className="">
            <Carousel data={data} carouselType="homeLifestyle" slidesToShow={1} arrows={false} mobileArrow={false} laptop={1} tab={1} mobile={1} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} />
        </div>
    )
})

export default HomeLifestyleCarousel
