import React from 'react'
import RecentlyViewedSlider from './RecentlyViewedSlider'

const RecentlyViewed = (props) => {
    const { recentProducts } = props;
    return (
        <div className="mt-18">
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Recently Viewed</p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-7"></div>
            <RecentlyViewedSlider recentProducts={recentProducts} />
        </div>
    )
}

export default RecentlyViewed
