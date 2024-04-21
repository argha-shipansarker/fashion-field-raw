import React from 'react'
import SportsShoesSlider from './SportsShoesSlider'

const SportsShoes = () => {
    return (
        <div className="container mx-auto px-4 mt-18">
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Sports Shoes</p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-7"></div>
            <SportsShoesSlider />
        </div>
    )
}

export default SportsShoes
