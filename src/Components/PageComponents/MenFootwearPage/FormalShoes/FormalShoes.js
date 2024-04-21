import React from 'react'
import FormalShoesSlider from './FormalShoesSlider'

const FormalShoes = () => {
    return (
        <div className="container mx-auto px-4 mt-18">
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Formal Shoes</p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-7"></div>
            <FormalShoesSlider />
        </div>
    )
}

export default FormalShoes
