import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Carousel from '../Components/ReuseableComponents/Carousel'

const CampaignPage = () => {

    const { campaign_name } = useParams()

    const [sliders, setSliders] = useState([])
    const [rowNumber, setRowNumber] = useState([])

    useEffect(() => {
        axios.get(`/campaign/${campaign_name}`, {
            headers: {
                Accept: "application/json",
            },
        }).then(response => {
            console.log(response)
            setSliders(response.data?.campaign_sliders)
            setRowNumber(response.data?.campaign_rows)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [campaign_name])

    return (
        <div className="mt-16 md:mt-0">
            <Carousel
                data={sliders}
                carouselType="mainCarousel"
                slidesToShow={1}
                arrows={false}
                laptop={1}
                tab={1}
                mobile={1}
                dots={true}
                autoplay={true}
                centerMode={false}
                desktopScroll={1}
                laptopScroll={1}
            />

            {
                rowNumber?.map((row, index) => (
                    <>
                        {
                            row?.campaign_type === "banner" ? (
                                <div className="md:container mx-auto md:px-4 mt-8">
                                    {
                                        row?.campaign_banners.length === 1 && (
                                            <div className="md:mr-7 overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300">
                                                {
                                                    row?.campaign_banners.map((item, index) => (
                                                        <a href={item?.link}>
                                                            <img
                                                                src={item.image}
                                                                alt="Sale Banner"
                                                                className={
                                                                    item.image
                                                                        ? "transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300 md:px-2"
                                                                        : "hidden"
                                                                }
                                                            />
                                                        </a>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }

                                    {
                                        row?.campaign_banners.length === 5 && (
                                            <div className="md:pr-7 grid grid-cols-1 gap-y-5 gap-x-6 md:flex">
                                                <div className="flex flex-col justify-between">
                                                    {
                                                        row?.campaign_banners.filter((item, index) => index < 2).map((item, index) => (
                                                            <div className={`overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300 ${index != 1 ? "mb-4" : ""}`} key={index}>
                                                                <a href={item?.link}>
                                                                    <img src={item.image} alt="first banner" className={item.image ? "w-full md:w-70 h-54 transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                                                                </a>
                                                            </div>
                                                        ))
                                                    }
                                                </div>

                                                {
                                                    row?.campaign_banners.filter((item, index) => index === 2).map((item, index) => (
                                                        <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300" key={index}>
                                                            <a href={item?.link}>
                                                                <img src={item.image} alt="first banner" className={item.image ? "w-full h-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                                                            </a>
                                                        </div>
                                                    ))
                                                }

                                                <div className="flex flex-col justify-between">
                                                    {
                                                        row?.campaign_banners.filter((item, index) => index > 2).map((item, index) => (
                                                            <div className={`overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300 ${index != 1 ? "mb-4" : ""}`} key={index}>
                                                                <a href={item?.link}>
                                                                    <img src={item.image} alt="first banner" className={item.image ? "w-full md:w-70 h-54 transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                                                                </a>
                                                            </div>
                                                        ))
                                                    }
                                                </div>

                                            </div>
                                        )
                                    }

                                    {
                                        row?.campaign_banners.length === 3 && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:pr-7">
                                                {
                                                    row?.campaign_banners.map((item, index) => (
                                                        <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300" key={index}>
                                                            <a href={item?.link}>
                                                                <img src={item.image} alt="first banner" className={item.image ? "w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                                                            </a>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }

                                    {
                                        row?.campaign_banners.length === 2 && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:pr-7">
                                                {
                                                    row?.campaign_banners.map((item, index) => (
                                                        <div className="overflow-hidden border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300" key={index}>
                                                            <a href={item?.link}>
                                                                <img src={item.image} alt="first banner" className={item.image ? "w-full transform scale-101 hover:scale-102 cursor-pointer transition-all ease-linear duration-300" : "hidden"} />
                                                            </a>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }

                                </div>
                            ) : (
                                <div className="container mx-auto mt-11 px-4 relative carouselWithoutTab">
                                    <p className='font-Poppins font-semibold text-base xs:text-xl text-sliderHeading mb-1.5'>{row?.name}</p>
                                    <div className='w-12 h-1.5 bg-logobarElementBG rounded-lg mb-5'></div>
                                    <Carousel
                                        data={row?.campaign_products}
                                        carouselType="commonCarousel"
                                        slidesToShow={row?.campaign_products.length < 4 ? row?.campaign_products.length : 4}
                                        arrows={true}
                                        mobileArrow={true}
                                        laptop={row?.campaign_products.length < 3 ? row?.campaign_products.length : 3}
                                        tab={row?.campaign_products.length < 2 ? row?.campaign_products.length : 2}
                                        mobile={row?.campaign_products.length < 2 ? row?.campaign_products.length : 2}
                                        dots={false}
                                        autoplay={false}
                                        centerMode={false}
                                        desktopScroll={4}
                                        laptopScroll={3} />
                                </div>
                            )
                        }
                    </>
                ))
            }


        </div>
    )
}

export default CampaignPage