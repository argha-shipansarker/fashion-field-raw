import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const Testimonials = () => {


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, height: 30, width: 30, borderRadius: 15, background: "#eeeeee", display: "flex", justifyContent: "center", alignItems: "center", color: "#999999" }}
                onClick={onClick}
            >
                <div style={{ fontSize: 17 }} className="custom-arrow-icon-div">
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
                style={{ ...style, height: 30, width: 30, borderRadius: 15, background: "#eeeeee", display: "flex", justifyContent: "center", alignItems: "center", color: "#999999" }}
                onClick={onClick}
            >
                <div style={{ fontSize: 17 }} className="custom-arrow-icon-div">
                    <i className="fas fa-angle-left custom-arrow-icon"></i>
                </div>
            </div>
        );
    }



    const settings = {
        // centerMode: centerMode,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        appendDots: (dots) => <ul>{dots}</ul>,
        customPaging: (i) => (
            <div className="ft-slick__dots--custom">
            </div>
        ),
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    }

    const [comments, setComments] = useState(null)

    useEffect(() => {
        axios.get("/testimonials", {
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            console.log(response)
            setComments(response.data)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [])






    return (
        <div className='container mx-auto pl-4 pr-4 md:pr-7 mt-20'>
            {/* <p className=''>Testimoinal</p> */}
            {comments && comments.length > 0 && <p className='font-Poppins font-bold text-orderTrack text-2xl text-center mb-10'>Testimoinal</p>}

            <Slider {...settings}>

                {
                    comments && comments.map((item, index) => (
                        <div className='pr-8'>
                            <p className='line-clamp-5 font-Poppins font-normal text-base'>{item?.comment}</p>
                            <div className='mt-6'>
                                <p className='font-Poppins font-normal text-logobarElementBG text-lg'>{item?.name}, {item?.designation}</p>
                            </div>
                        </div>
                    ))
                }

            </Slider>

        </div>
    )
}

export default Testimonials
