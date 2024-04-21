import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

const PriceFiltering = () => {
    return (
        <div className="priceFiltering mt-11">
            <p className="font-Poppins font-semibold text-base text-topBarTextColor mb-2.75">Price</p>
            <hr className="border-t-2 mb-4.5" />
            <Scrollbars style={{ height: 155 }}>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>0 - 500</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>500 - 1000</span></p>
                <p className="font-DMSans text-sm text-logobarElementBG font-bold mb-3.25"><span>1000 - 2000</span></p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25"><span>2000 - 5000</span></p>
                <p className="font-DMSans text-sm text-sliderDescription"><span>5000 - 8000</span></p>
            </Scrollbars>
        </div>
    )
}

export default PriceFiltering
