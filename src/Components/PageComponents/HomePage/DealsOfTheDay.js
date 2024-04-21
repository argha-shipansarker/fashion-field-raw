import React from 'react'

import DealsOfTheDaySlider from './DealsOfTheDaySlider'

const DealsOfTheDay = props => {
    const { dealsProduct } = props
    return (
        <div className="container mx-auto px-4 pt-4">
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Deals of the Day</p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-7"></div>
            <DealsOfTheDaySlider dealsProduct={dealsProduct} />
        </div>
    )
}

export default DealsOfTheDay
