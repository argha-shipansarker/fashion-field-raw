import React, { forwardRef, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { ImSpinner9 } from "react-icons/im"

import Carousel from '../../ReuseableComponents/Carousel'

import ProductImage3 from "../../../Assets/Images/product-image3.png"
import ProductImage4 from "../../../Assets/Images/product-image4.png"
import ProductImage5 from "../../../Assets/Images/product-image5.png"
import ProductImage6 from "../../../Assets/Images/product-image6.png"

const data = [
    {
        category: "Heals",
        name: "Rerum necessitatibus saepe eveniet ut et voluptates",
        oldPrice: 1890,
        newPrice: 1140,
        discount: 35,
        image: ProductImage6,
    },
    {
        category: "Tops",
        name: "Itaque earum rerum hic tenetur a sapiente delectus",
        newPrice: 1140,
        image: ProductImage3,
    },
    {
        category: "Cushions & Covers",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 1575,
        image: ProductImage4,
    },
    {
        category: "Tops",
        name: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
        newPrice: 680,
        image: ProductImage5,
    },
    {
        category: "Cushions & Covers",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 1575,
        image: ProductImage4,
    },
]

const BestSellerSlider = forwardRef((props, forwardedRef) => {

    const bestSellerRef = useRef(null)


    // const { slug } = props

    // console.log(slug)

    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.get(`/bestseller`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            console.log("============================", response.data)
            setProduct(response.data.products)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [])

    const handleCarouselNextButton = () => {
        bestSellerRef.current.nextButton()
    }

    const handleCarouselPrevButton = () => {
        bestSellerRef.current.prevButton()
    }




    return (
        <div className="container mx-auto mt-11 px-4 relative carouselWithoutTab">
            <p className='font-Poppins font-semibold text-base xs:text-xl text-sliderHeading mb-1.5'>Best Seller</p>
            <div className='w-12 h-1.5 bg-logobarElementBG rounded-lg mb-5'></div>
            <div className="flex items-center flex absolute right-5 top-1 md:right-10 md:top-2">

                <div
                    onClick={handleCarouselPrevButton}
                    className="h-7.5 w-7.5 rounded-3.75 bg-timeBG flex justify-center items-center text-mutedText mr-4 cursor-pointer hover:bg-logobarElementBG hover:text-white"
                >
                    <div style={{ fontSize: 17 }} className="custom-arrow-icon-div">
                        <i className="fas fa-angle-left custom-arrow-icon"></i>
                    </div>
                </div>

                <div
                    className="h-7.5 w-7.5 rounded-3.75 bg-timeBG flex justify-center items-center text-mutedText cursor-pointer hover:bg-logobarElementBG hover:text-white"
                    onClick={handleCarouselNextButton}
                >
                    <div style={{ fontSize: 17 }} className="custom-arrow-icon-div">
                        <i className="fas fa-angle-right custom-arrow-icon"></i>
                    </div>
                </div>

            </div>
            {
                product ? <Carousel data={product} carouselType="commonCarousel" slidesToShow={product.length < 4 ? product.length : 4} arrows={false} mobileArrow={false} laptop={product.length < 3 ? product.length : 3} tab={product.length < 2 ? product.length : 2} mobile={product.length < 2 ? product.length : 2} dots={false} autoplay={false} centerMode={false} ref={bestSellerRef} desktopScroll={4} laptopScroll={3} /> : (
                    <div className='w-full h-125 flex items-center justify-center'>
                        <ImSpinner9 className="animate-spin" size={40} color='red' />
                    </div>
                )
            }
        </div>
    )
})

export default BestSellerSlider
