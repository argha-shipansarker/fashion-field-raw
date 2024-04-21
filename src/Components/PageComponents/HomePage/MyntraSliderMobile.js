import React, { useEffect, useState } from 'react'
import Carousel from '../../ReuseableComponents/Carousel'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';

const MyntraSliderMobile = () => {

    const [modifiecData, setModifiedData] = useState([])
    const fetchSliderImages = () => {
        axios
            .get("/homepage/mobile-view-top/slider", {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) => {
                setModifiedData([])
                // console.log("mobile top sliders", response)
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
        slidesToShow: modifiecData.length >= 4 ? 4 : modifiecData.length,
        slidesToScroll: 1,
        arrows: false,
        // autoplay: true,
    };

    // let mobileSlider = document.getElementById('mobile-slider');
    // let style = mobileSlider?.parentElement?.style.display

    // useEffect(() => {
    //     if (mobileSlider && mobileSlider.parentElement)
    //         console.log(mobileSlider.parentElement.style.display);

    // }, [style])


    return (
        <div id="mobile-slider">
            <Slider {...settings}>
                {modifiecData?.map((item, index) => (
                    <div className="focus:outline-none" key={index}>
                        <a href={item?.link ? item.link : '#'}>
                            <img src={item?.image} alt="Hero Slider" className='w-full' />
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default MyntraSliderMobile