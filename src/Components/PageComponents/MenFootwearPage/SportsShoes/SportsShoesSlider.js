import React from 'react'
import Carousel from '../../../ReuseableComponents/Carousel'


const SportsShoesSlider = (props) => {
    const { similarProducts } = props;
    return (
        <div className="carouselWithoutTab">
            <Carousel data={similarProducts} carouselType="commonCarousel" slidesToShow={similarProducts.length < 4 ? similarProducts.length : 4} arrows={true} mobileArrow={true} laptop={similarProducts.length < 3 ? similarProducts.length : 3} tab={similarProducts.length < 2 ? similarProducts.length : 2} mobile={1} dots={false} autoplay={false} centerMode={false} desktopScroll={4} laptopScroll={3} />
        </div>
    )
}

export default SportsShoesSlider
