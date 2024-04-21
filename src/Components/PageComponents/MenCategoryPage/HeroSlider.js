import React from 'react'
import Carousel from '../../ReuseableComponents/Carousel'
import MenHeroSlider from "../../../Assets/Images/MenCategory/MenHeroSlider.png"

const data = [
    {
        image: MenHeroSlider
    },
    {
        image: MenHeroSlider
    },
    {
        image: MenHeroSlider
    },
    {
        image: MenHeroSlider
    },
]

const HeroSlider = () => {
    return (
        <div>
            <Carousel data={data} carouselType="mainCarousel" slidesToShow={1} arrows={false} laptop={1} tab={1} mobile={1} dots={true} autoplay={true} centerMode={false} />
        </div>
    )
}

export default HeroSlider
