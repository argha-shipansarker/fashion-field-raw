import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

const ColorFiltering = () => {
    return (
        <div className="colorFiltering mt-9">
            <p className="font-Poppins font-semibold text-base text-topBarTextColor mb-2.75">Color Options</p>
            <hr className="border-t-2 mb-4.5" />
            <Scrollbars style={{ height: 220 }}>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Black</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Blue</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Brown</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>White</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Green</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Red</span></p>
                <p className="font-DMSans text-sm text-sliderDescription"><span>Gray</span></p>
            </Scrollbars>
        </div>
    )
}

export default ColorFiltering
