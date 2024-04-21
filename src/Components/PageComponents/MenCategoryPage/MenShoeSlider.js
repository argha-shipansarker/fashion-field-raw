import React, { forwardRef } from 'react'

import Carousel from '../../ReuseableComponents/Carousel'

import MenShoe1 from "../../../Assets/Images/MenCategory/MenShoe1.png"
import MenShoe2 from "../../../Assets/Images/MenCategory/MenShoe2.png"
import MenShoe3 from "../../../Assets/Images/MenCategory/MenShoe3.png"
import MenShoe4 from "../../../Assets/Images/MenCategory/MenShoe4.png"

const data = [
    {
        category: "Sports Shoes",
        name: "Et harum quidem rerumgrt facilis est et expedita distinctioNam libero tempore optio cumque",
        newPrice: 2320,
        image: MenShoe1,
    },
    {
        category: "Sports Shoes",
        name: "Nam libero tempore cum soluta nobis est editun",
        newPrice: 2390,
        image: MenShoe2,
    },
    {
        category: "Sports Shoes",
        name: "Eligendi optio cumque nihil impedit quo minus id quod",
        newPrice: 1420,
        image: MenShoe3,
    },
    {
        category: "Sports Shoes",
        name: "Eligendi optio cumque nihil impedit quo minus id quod",
        newPrice: 3560,
        image: MenShoe4,
    },
    {
        category: "Sports Shoes",
        name: "Maxime placeat facere possimus, omnis voluptas",
        newPrice: 2675,
        image: MenShoe2,
    },
]


const MenShoeSlider = forwardRef((props, forwardedRef) => {
    return (
        <div>
            <Carousel data={data} carouselType="commonCarousel" slidesToShow={4} arrows={false} mobileArrow={false} laptop={3} tab={2} mobile={1} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} />
        </div>
    )
})

export default MenShoeSlider
