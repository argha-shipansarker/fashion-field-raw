import React, { forwardRef, useEffect, useState } from 'react'
import axios from 'axios'
import { ImSpinner9 } from "react-icons/im"

import Carousel from '../../ReuseableComponents/Carousel'

import MenShirt1 from "../../../Assets/Images/MenCategory/MenShirt1.png"
import MenShirt2 from "../../../Assets/Images/MenCategory/MenShirt2.png"
import MenShirt3 from "../../../Assets/Images/MenCategory/MenShirt3.png"
import MenShirt4 from "../../../Assets/Images/MenCategory/MenShirt4.png"

const data = [
    {
        category: "Shirts",
        name: "Sed quia non numquam eius modi tempora incidunt ut labore",
        newPrice: 960,
        image: MenShirt1,
    },
    {
        category: "Shirts",
        name: "Dolore magnam aliqua qua erat voluptatem ut enim",
        newPrice: 880,
        image: MenShirt2,
    },
    {
        category: "Shirts",
        name: "Minima veniam quis nostru exercitationem ullam corporis",
        newPrice: 720,
        image: MenShirt3,
    },
    {
        category: "Shirts",
        name: "Laboriosam nisi ut aliquid ex ea commodi consequatur",
        newPrice: 880,
        image: MenShirt4,
    },
    {
        category: "Shirts",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 575,
        image: MenShirt2,
    },
]

const MenShirtSlider = forwardRef((props, forwardedRef) => {

    const { slug } = props

    // console.log(slug)

    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.get(`/product-categories/${slug}/slider`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            // console.log(response.data)
            setProduct(response.data.products)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [slug])

    useEffect(() => {
        // console.log(product)
    }, [product])

    return (
        <div>
            {
                product ? <Carousel data={product} carouselType="commonCarousel" slidesToShow={product.length >= 4 ? 4 : product.length} arrows={false} mobileArrow={false} laptop={product.length >= 3 ? 3 : product.length} tab={product.length >= 2 ? 2 : product.length} mobile={product.length < 2 ? product.length : 2} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} desktopScroll={4} laptopScroll={3} /> : (
                    <div className='w-full h-125 flex items-center justify-center'>
                        <ImSpinner9 className="animate-spin" size={40} color='red' />
                    </div>
                )
            }
        </div>
    )
})

export default MenShirtSlider
