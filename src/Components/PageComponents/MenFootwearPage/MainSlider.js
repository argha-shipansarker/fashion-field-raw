import React from 'react'
import Carousel from '../../ReuseableComponents/Carousel'
import HeroSlider from "../../../Assets/Images/MenFootwear/hero-banner.png"

const data = [
    {
        image: HeroSlider
    },
    {
        image: HeroSlider
    },
    {
        image: HeroSlider
    },
    {
        image: HeroSlider
    },
]

const MainSlider = ({ subcategorySliders }) => {
    return (
        <div>
            <Carousel data={subcategorySliders} carouselType="mainCarousel" slidesToShow={1} arrows={false} laptop={1} tab={1} mobile={1} dots={true} autoplay={true} centerMode={false} desktopScroll={1} laptopScroll={1} />
        </div>
    )
}

export default MainSlider
