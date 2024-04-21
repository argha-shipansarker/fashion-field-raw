import React, { forwardRef } from 'react'

import Carousel from '../../ReuseableComponents/Carousel'

import ProductImage19 from "../../../Assets/Images/product-image19.png"
import ProductImage20 from "../../../Assets/Images/product-image20.png"
import ProductImage21 from "../../../Assets/Images/product-image21.png"
import ProductImage22 from "../../../Assets/Images/product-image22.png"

const data = [
    {
        category: "Tops",
        name: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis optio cumque",
        newPrice: 1140,
        image: ProductImage19,
    },
    {
        category: "Tops",
        name: "Praesentium voluptatum del eniti atque corrupti quos dolores et quas possimus, omnis",
        newPrice: 1140,
        image: ProductImage20,
    },
    {
        category: "Tops",
        name: "Molestias excepturi sint occa ecati cupiditate non ovide",
        newPrice: 1575,
        image: ProductImage21,
    },
    {
        category: "Tops",
        name: "Culpa qui officia deseru moll itia animi id est laboet ut repudiandaemolestiae",
        newPrice: 680,
        image: ProductImage22,
    },
    {
        category: "Tops",
        name: "Culpa qui officia deseru moll itia animi id est laboet ut repudiandaemolestiae",
        newPrice: 1575,
        image: ProductImage20,
    },
]

const GirlsClothingSlider = forwardRef((props, forwardedRef) => {
    return (
        <div>
            <Carousel data={data} carouselType="commonCarousel" slidesToShow={4} arrows={false} mobileArrow={false} laptop={3} tab={2} mobile={1} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} />
        </div>
    )
})

export default GirlsClothingSlider
