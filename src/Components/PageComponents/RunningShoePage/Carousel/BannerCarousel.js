import React from 'react'
import Carousel from '../../../ReuseableComponents/Carousel'

import BannerImage from "../../../../Assets/Images/FilteredImage/FilterBanner.png"

const data = [
    {
        image: BannerImage
    },
    {
        image: BannerImage
    },
    {
        image: BannerImage
    },
]

const BannerCarousel = () => {
    return (
        <div className="mt-10.75 filtering-banner">
            <Carousel data={data} carouselType="mainCarousel" slidesToShow={1} arrows={false} laptop={1} tab={1} mobile={1} dots={true} autoplay={true} centerMode={false} />
        </div>
    )
}

export default BannerCarousel
