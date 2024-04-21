import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';

import Image1 from "../../../../Assets/Images/MenFootwear/MultiCarousel1.png"
import Image2 from "../../../../Assets/Images/MenFootwear/MultiCarousel2.png"
import Image3 from "../../../../Assets/Images/MenFootwear/MultiCarousel3.png"
import Image4 from "../../../../Assets/Images/MenFootwear/MultiCarousel4.png"
import Image5 from "../../../../Assets/Images/MenFootwear/MultiCarousel5.png"
import Image6 from "../../../../Assets/Images/MenFootwear/MultiCarousel6.png"
import Image7 from "../../../../Assets/Images/MenFootwear/MultiCarousel7.png"
import Image8 from "../../../../Assets/Images/MenFootwear/MultiCarousel8.png"
import Image9 from "../../../../Assets/Images/MenFootwear/MultiCarousel9.png"

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, height: 23, width: 23, borderRadius: 15, background: "#eeeeee", display: "flex", justifyContent: "center", alignItems: "center", color: "#999999" }}
            onClick={onClick}
        >
            <div style={{ fontSize: 13 }} className="custom-arrow-icon-div">
                <i className="fas fa-angle-right custom-arrow-icon"></i>
            </div>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    // console.log(props)
    return (
        <div
            className={className}
            style={{ ...style, height: 23, width: 23, borderRadius: 15, background: "#eeeeee", display: "flex", justifyContent: "center", alignItems: "center", color: "#999999" }}
            onClick={onClick}
        >
            <div style={{ fontSize: 13 }} className="custom-arrow-icon-div">
                <i className="fas fa-angle-left custom-arrow-icon"></i>
            </div>
        </div>
    );
}

const data = [
    {
        category: "Sandals",
        name: "Ut aut reiciendis volup tatibus maiores alias con",
        price: 1260,
        image: Image1
    },
    {
        category: "Sandals",
        name: "Ut aut reiciendis volup tatibus maiores alias con",
        price: 1260,
        image: Image2
    },
    {
        category: "Sandals",
        name: "Ut aut reiciendis volup tatibus maiores alias con",
        price: 1260,
        image: Image3
    },
    {
        category: "Sandals",
        name: "Ut aut reiciendis volup tatibus maiores alias con",
        price: 1260,
        image: Image4
    },
    {
        category: "Sandals",
        name: "Ut aut reiciendis volup tatibus maiores alias con",
        price: 1260,
        image: Image5
    },
    {
        category: "Sandals",
        name: "Ut aut reiciendis volup tatibus maiores alias con",
        price: 1260,
        image: Image6
    },
    {
        category: "Sandals",
        name: "Ut aut reiciendis volup tatibus maiores alias con",
        price: 1260,
        image: Image7
    },
    {
        category: "Sandals",
        name: "Ut aut reiciendis volup tatibus maiores alias con",
        price: 1260,
        image: Image8
    },
    {
        category: "Sandals",
        name: "Ut aut reiciendis volup tatibus maiores alias con",
        price: 1260,
        image: Image9
    },
]

const NewArrivalCarousel = () => {

    const settings = {
        centerMode: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        // appendDots: (dots) => <ul>{dots}</ul>,
        // customPaging: (i) => (
        //     <div className="ft-slick__dots--custom">
        //     </div>
        // ),
        autoplay: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        rows: 3,
        slidesPerRow: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                }
            }
        ]
    }

    return (
        <div className="new-arrival-filter">
            <Slider {...settings}>
                {
                    data.map((item, index) => (
                        <div key={index}>
                            <div className="flex border-1 p-5 md:mr-1 mt-5 items-center">
                                <div className="h-29.5 flex justify-center items-center bg-topBarBG border-1 hover:border-mutedText border-transparent hover:shadow-lg transition-all ease-linear duration-300" style={{ width: "40%" }}>
                                    <div className="h-full w-full flex justify-center items-center transform scale-101 hover:scale-102 transition-all ease-linear duration-300">
                                        <img src={item.image} alt="Products" />
                                    </div>
                                </div>
                                <div className="ml-4" style={{ width: "56%" }}>
                                    <p className="text-tinymd text-commonCarouselMutedText font-DMSans hover:text-topBarTextColor">{item.category}</p>
                                    <p className="text-tinymd2 text-topBarTextColor font-semibold font-Poppins hover:text-logobarElementBG mt-2 line-clamp-2">{item.name}</p>
                                    {/* <LinesEllipsis
                                        text={`${item.name}`}
                                        maxLine="2"
                                        ellipsis="..."
                                        className="text-sm text-topBarTextColor font-semibold font-Poppins hover:text-logobarElementBG mt-2"
                                    /> */}
                                    <Tippy content="4.00" placement="right">
                                        <span className="new-arrival-filter inline-block flex items-center mt-2 mb-1">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="far fa-star"></i>
                                        </span>
                                    </Tippy>
                                    <p className="text-tiny2xl text-logobarElementBG font-semibold font-Poppins mb-2">Tk. {item.price}</p>
                                    <div className="ml-auto flex new-arrival-filter">
                                        <button className="w-5.75 h-5.75 bg-timeBG rounded-2.5xl flex justify-center items-center mr-2 hover:bg-logobarElementBG group">
                                            <i className="far fa-heart group-hover:text-white"></i>
                                        </button>
                                        <button className="w-5.75 h-5.75 bg-timeBG rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG group">
                                            <i className="far fa-shopping-bag group-hover:text-white"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default NewArrivalCarousel
