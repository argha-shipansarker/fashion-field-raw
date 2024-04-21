import React, { forwardRef } from 'react'

import Carousel from '../../ReuseableComponents/Carousel'

import ProductImage11 from "../../../Assets/Images/product-image11.png"
import ProductImage12 from "../../../Assets/Images/product-image12.png"
import ProductImage13 from "../../../Assets/Images/product-image13.png"
import ProductImage14 from "../../../Assets/Images/product-image14.png"

const data = [
    {
        category: "Tops",
        name: "Saepe eveniet ut et voluptate repudiandae sint et molestiae",
        newPrice: 400,
        image: ProductImage11,
    },
    {
        category: "Tops",
        name: "Autem vel eum iure reprehen qui in ea voluptate velit",
        newPrice: 420,
        image: ProductImage12,
    },
    {
        category: "Tops",
        name: "Temporibus autem quibusda et aut officiis debitis aut rerum necessit",
        newPrice: 290,
        image: ProductImage13,
    },
    {
        category: "Tops",
        name: "Omnis voluptas assumenda est omnis dolor repellendus",
        newPrice: 380,
        image: ProductImage14,
    },
    {
        category: "Tops",
        name: "Omnis voluptas assumenda est omnis dolor repellendus",
        newPrice: 150,
        image: ProductImage12,
    },
]

const WomenFashionSlider = forwardRef((props, forwardedRef) => {
    return (
        <div>
            <Carousel data={data} carouselType="commonCarousel" slidesToShow={4} arrows={false} mobileArrow={false} laptop={3} tab={2} mobile={1} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} />
        </div>
    )
})

export default WomenFashionSlider
