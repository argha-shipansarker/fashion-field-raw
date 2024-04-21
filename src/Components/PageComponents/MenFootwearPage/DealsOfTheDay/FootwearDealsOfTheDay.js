import React from 'react'
import FootwearDealsOfTheDaySlider from './FootwearDealsOfTheDaySlider'

const FootwearDealsOfTheDay = () => {
    return (
        <div className="container mx-auto px-4 pt-6">
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Deals of the Day</p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-7"></div>
            <FootwearDealsOfTheDaySlider />
        </div>
    )
}

export default FootwearDealsOfTheDay
