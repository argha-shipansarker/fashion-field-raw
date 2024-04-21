import React from 'react'
import BootsSlider from './BootsSlider'

const Boots = () => {
    return (
        <div className="container mx-auto px-4 mt-18">
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Boots</p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-7"></div>
            <BootsSlider />
        </div>
    )
}

export default Boots
