import React, { useState, useEffect } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const AarongMobileSlider = () => {

    const [modifiecData, setModifiedData] = useState([])
    const fetchSliderImages = () => {
        axios
            .get("/homepage/mobile-view/slider", {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) => {
                // console.log("mobile sliders", response)
                setModifiedData([])
                response.data.forEach(slider => {
                    setModifiedData(prevState => [...prevState, { link: slider.link, image: slider.image }])
                })
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    useEffect(() => {
        fetchSliderImages()
    }, [])

    const settings = {
        centerMode: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    };

    return (
        <div>
            <Slider {...settings}>
                {modifiecData?.map((item, index) => (
                    <div className="focus:outline-none" key={index}>
                        <a href={item?.link ? item.link : '#'}>
                            <img
                                src={item?.image}
                                alt="Hero Slider"
                                className="w-full object-contain"
                            />
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default AarongMobileSlider;
