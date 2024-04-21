import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

const RatingFiltering = () => {
    return (
        <div className="ratingFiltering mt-11">
            <p className="font-Poppins font-semibold text-base text-topBarTextColor mb-2.75">Rating</p>
            <hr className="border-t-2 mb-4.5" />
            <Scrollbars style={{ height: 155 }}>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25">
                    <span>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </span>
                </p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25">
                    <span>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </span>
                    <span className="inline-block ml-3 text-logobarElementBG font-bold">And Up</span>
                </p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25">
                    <span>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                    </span>
                    <span className="inline-block ml-3">And Up</span>
                </p>
                <p className="font-DMSans text-sm text-sliderDescription mb-3.25">
                    <span>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                    </span>
                    <span className="inline-block ml-3">And Up</span>
                </p>
                <p className="font-DMSans text-sm text-sliderDescription">
                    <span>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                    </span>
                    <span className="inline-block ml-3">And Up</span>
                </p>
            </Scrollbars>
        </div>
    )
}

export default RatingFiltering
