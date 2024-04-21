import React from 'react'
import Carousel from '../../ReuseableComponents/Carousel'
import { ImSpinner9 } from "react-icons/im"

import Image1 from "../../../Assets/Images/MenFootwear/Sandals1.png"
import Image2 from "../../../Assets/Images/MenFootwear/Sandals2.png"
import Image3 from "../../../Assets/Images/MenFootwear/Sandals3.png"
import Image4 from "../../../Assets/Images/MenFootwear/Sandals4.png"

const data = [
    {
        category: "Sandals",
        name: "Rerum necessitatibus saepe eveniet ut et voluptates",
        newPrice: 750,
        image: Image1,
    },
    {
        category: "Sandals",
        name: "Itaque earum rerum hic tenetur a sapiente delectus",
        newPrice: 820,
        image: Image2,
    },
    {
        category: "Sandals",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 980,
        image: Image3,
    },
    {
        category: "Sandals",
        name: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
        newPrice: 880,
        image: Image4,
    },
    {
        category: "Sandals",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 350,
        image: Image2,
    },
]

const SandalsSlider = props => {
    const { products } = props
    return (
        <div className="carouselWithoutTab">
            {
                products ? <Carousel data={products} carouselType="commonCarousel" slidesToShow={products.length >= 4 ? 4 : products.length} arrows={true} mobileArrow={true} laptop={products.length >= 3 ? 3 : products.length} tab={products.length >= 2 ? 2 : products.length} mobile={products.length < 2 ? products.length : 2} dots={false} autoplay={false} centerMode={false} desktopScroll={4} laptopScroll={3} /> : (
                    <div className='w-full h-125 flex items-center justify-center'>
                        <ImSpinner9 className="animate-spin" size={40} color='red' />
                    </div>
                )
            }
        </div>
    )
}

export default SandalsSlider
