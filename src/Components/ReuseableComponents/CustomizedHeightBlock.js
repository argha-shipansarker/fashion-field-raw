import React from 'react'
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';

const CustomizedHeightBlock = props => {
    const { image, category, name, price, height } = props
    return (
        <>
            <div className={`${height} bg-topBarBG flex items-center justify-center border-1 hover:border-mutedText border-transparent hover:shadow-lg transition-all ease-linear duration-300 overflow-hidden`}>
                <div className="transform scale-101 hover:scale-102 transition-all ease-linear duration-300">
                    <img src={image} alt="Product" />
                </div>
            </div>
            <div className="mt-4">
                <p><span className="font-DMSans text-xs text-commonCarouselMutedText hover:text-topBarTextColor">{category}</span></p>
                <p className="font-Poppins text-base font-semibold text-topBarTextColor mt-3 h-12 overflow-hidden hover:text-logobarElementBG">{name}</p>
                <div className="flex items-center mt-auto mt-3.5">
                    <div>
                        <Tippy content="4.00">
                            <div className="mb-3">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </div>
                        </Tippy>
                        <div className="flex items-center md:flex-col md:items-start lg:items-center  lg:flex-row">
                            <p className="font-Poppins text-base font-semibold text-logobarElementBG">TK.{price}</p>
                        </div>
                    </div>
                    <div className="ml-auto flex">
                        <div className="w-10 h-10 bg-timeBG rounded-2.5xl flex justify-center items-center mr-4 group hover:bg-logobarElementBG">
                            <i className="far fa-heart group-hover:text-white"></i>
                        </div>
                        <div className="w-10 h-10 bg-timeBG rounded-2.5xl flex justify-center items-center group hover:bg-logobarElementBG">
                            <i className="far fa-shopping-bag group-hover:text-white"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomizedHeightBlock
