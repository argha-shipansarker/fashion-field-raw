import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

const MaterialFiltering = () => {
    return (
        <div className="materialFiltering mt-11">
            <p className="font-Poppins font-semibold text-base text-topBarTextColor mb-2.75">Main Material</p>
            <hr className="border-t-2 mb-4.5" />
            <Scrollbars style={{ height: 220 }}>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Rubber</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Synthetic</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Cotton</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Mesh</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Nylon</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>Polyester</span></p>
                <p className="font-DMSans text-sm text-sliderDescription"><span>Canvas</span></p>
            </Scrollbars>
        </div>
    )
}

export default MaterialFiltering
