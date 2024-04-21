import React from 'react'
import NewArrivalCarousel from './NewArrivalCarousel'

const NewArrivalsFilteringSection = () => {
    return (
        <div className="newArrivals mt-11">
            <p className="font-Poppins font-semibold text-sm2 text-sliderHeading mb-1.75">New Arrivals</p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-1"></div>
            <NewArrivalCarousel />
        </div>
    )
}

export default NewArrivalsFilteringSection
