import React, { forwardRef } from 'react'

import Carousel from '../../ReuseableComponents/Carousel'

import ProductImage15 from "../../../Assets/Images/product-image15.png"
import ProductImage16 from "../../../Assets/Images/product-image16.png"
import ProductImage17 from "../../../Assets/Images/product-image17.png"
import ProductImage18 from "../../../Assets/Images/product-image18.png"

const data = [
    {
        category: "T-Shirts",
        name: "Nam libero tempore cumjut soluta nobis est eligendi optio cumqueyyyy",
        newPrice: 260,
        image: ProductImage15,
    },
    {
        category: "T-Shirts",
        name: "Nihil impedit quo minus idern quod maxime placeat face possimus, omnis",
        newPrice: 250,
        image: ProductImage16,
    },
    {
        category: "T-Shirts",
        name: "Voluptas assumenda estenm omnis dolor repellendus fre Temporibus",
        newPrice: 240,
        image: ProductImage17,
    },
    {
        category: "T-Shirts",
        name: "Quibusdam et aut officiis rety debitis aut rerum necessita fretynecessitatib",
        newPrice: 320,
        image: ProductImage18,
    },
    {
        category: "T-Shirts",
        name: "Quibusdam et aut officiis rety debitis aut rerum necessita fretynecessitatib",
        newPrice: 1500,
        image: ProductImage16,
    },
]

const BoyClothingSlider = forwardRef((props, forwardedRef) => {
    return (
        <div>
            <Carousel data={data} carouselType="commonCarousel" slidesToShow={4} arrows={false} mobileArrow={false} laptop={3} tab={2} mobile={1} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} />
        </div>
    )
})

export default BoyClothingSlider
