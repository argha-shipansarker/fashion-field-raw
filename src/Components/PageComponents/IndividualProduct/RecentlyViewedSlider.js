import React from 'react'
import Carousel from '../../ReuseableComponents/Carousel'


const RecentlyViewedSlider = (props) => {
    const { recentProducts } = props
    return (
        <div className="carouselWithoutTab">
            <Carousel data={recentProducts} carouselType="commonCarousel" slidesToShow={recentProducts.length < 4 ? recentProducts.length : 4} arrows={true} mobileArrow={true} laptop={recentProducts.length < 3 ? recentProducts.length : 3} tab={recentProducts.length < 2 ? recentProducts.length : 2} mobile={1} dots={false} autoplay={false} centerMode={false} desktopScroll={4} laptopScroll={3} />
        </div>
    )
}

export default RecentlyViewedSlider
