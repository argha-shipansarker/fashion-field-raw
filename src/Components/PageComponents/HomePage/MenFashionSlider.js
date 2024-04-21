import React, { forwardRef, useState, useEffect } from 'react'
import axios from 'axios'
import { ImSpinner9 } from "react-icons/im"

import Carousel from '../../ReuseableComponents/Carousel'

import ProductImage7 from "../../../Assets/Images/product-image7.png"
import ProductImage8 from "../../../Assets/Images/product-image8.png"
import ProductImage9 from "../../../Assets/Images/product-image9.png"
import ProductImage10 from "../../../Assets/Images/product-image10.png"

const data = [
    {
        category: "Polo Shirts",
        name: "Sed quia non numquam eius modi tempora incidunt ut labore",
        newPrice: 300,
        image: ProductImage7,
    },
    {
        category: "Polo Shirts",
        name: "Dolore magnam aliqua qua erat voluptatem ut enim",
        newPrice: 350,
        image: ProductImage8,
    },
    {
        category: "Polo Shirts",
        name: "Minima veniam, quis nostru exercitationem ullam corporis",
        newPrice: 290,
        image: ProductImage9,
    },
    {
        category: "Polo Shirts",
        name: "Laboriosam nisi ut aliquid ex ea commodi consequatur",
        newPrice: 320,
        image: ProductImage10,
    },
    {
        category: "Polo Shirts",
        name: "Laboriosam nisi ut aliquid ex ea commodi consequatur",
        newPrice: 1500,
        image: ProductImage8,
    },
]


const MenFashionSlider = forwardRef((props, forwardedRef) => {
    const { slug } = props


    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.get(`/homepage/slider/${slug}`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            // console.log(response.data)
            // console.log(slug)
            setProduct(response.data)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [slug])

    useEffect(() => {
        // console.log(product)
        // console.log(slug)
    }, [product, slug])

    console.log("✴", product);

    return (
        <div>
            {
                product ? <Carousel data={product} carouselType="commonCarousel" slidesToShow={product.length < 4 ? product.length : 4} arrows={false} mobileArrow={false} laptop={product.length < 3 ? product.length : 3} tab={product.length < 2 ? product.length : 2} mobile={product.length < 2 ? product.length : 2} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} desktopScroll={4} laptopScroll={3} /> : (
                    <div className='w-full h-125 flex items-center justify-center'>
                        <ImSpinner9 className="animate-spin" size={40} color='red' />
                    </div>
                )
            }
        </div>
    )
})

export default MenFashionSlider
