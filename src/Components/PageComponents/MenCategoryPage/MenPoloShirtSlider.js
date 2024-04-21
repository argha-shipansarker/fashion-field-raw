import React, { forwardRef } from 'react'

import Carousel from '../../ReuseableComponents/Carousel'

import ProductImage7 from "../../../Assets/Images/product-image7.png"
import ProductImage8 from "../../../Assets/Images/product-image8.png"
import ProductImage9 from "../../../Assets/Images/product-image9.png"
import ProductImage10 from "../../../Assets/Images/product-image10.png"

const data = [
    {
        category: "Polo Shirts",
        name: "Sed quia non numquam eius modi tempora incidunt ut labore",
        newPrice: 320,
        image: ProductImage7,
    },
    {
        category: "Polo Shirts",
        name: "Dolore magnam aliqua qua erat voluptatem ut enim",
        newPrice: 390,
        image: ProductImage8,
    },
    {
        category: "Polo Shirts",
        name: "Minima veniam, quis nostru exercitationem ullam corporis",
        newPrice: 420,
        image: ProductImage9,
    },
    {
        category: "Polo Shirts",
        name: "Laboriosam nisi ut aliquid ex ea commodi consequatur",
        newPrice: 560,
        image: ProductImage10,
    },
    {
        category: "Polo Shirts",
        name: "Minima veniam, quis nostru exercitationem ullam corporis",
        newPrice: 675,
        image: ProductImage8,
    },
]

const MenPoloShirtSlider = forwardRef((props, forwardedRef) => {
    return (
        <div>
            <Carousel data={data} carouselType="commonCarousel" slidesToShow={4} arrows={false} mobileArrow={false} laptop={3} tab={2} mobile={1} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} />
        </div>
    )
})

export default MenPoloShirtSlider
