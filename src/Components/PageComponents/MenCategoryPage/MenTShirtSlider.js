import React, { forwardRef } from 'react'

import Carousel from '../../ReuseableComponents/Carousel'

import MenTShirt1 from "../../../Assets/Images/MenCategory/MenTShirt1.png"
import MenTShirt2 from "../../../Assets/Images/MenCategory/MenTShirt2.png"
import MenTShirt3 from "../../../Assets/Images/MenCategory/MenTShirt3.png"
import MenTShirt4 from "../../../Assets/Images/MenCategory/MenTShirt4.png"

const data = [
    {
        category: "T Shirts",
        name: "Saepe eveniet ut et voluptate repudiandae sint et molestiae",
        newPrice: 320,
        image: MenTShirt1,
    },
    {
        category: "T Shirts",
        name: "Autem vel eum iure reprehen qui in ea voluptate velit",
        newPrice: 290,
        image: MenTShirt2,
    },
    {
        category: "T Shirts",
        name: "Temporibus autem quibusda et aut officiis debitis aut rerum necessit",
        newPrice: 320,
        image: MenTShirt3,
    },
    {
        category: "T Shirts",
        name: "Omnis voluptas assumenda est omnis dolor repellendus",
        newPrice: 260,
        image: MenTShirt4,
    },
    {
        category: "T Shirts",
        name: "Temporibus autem quibusda et aut officiis debitis aut rerum necessit",
        newPrice: 175,
        image: MenTShirt2,
    },
]

const MenTShirtSlider = forwardRef((props, forwardedRef) => {
    return (
        <div>
            <Carousel data={data} carouselType="commonCarousel" slidesToShow={4} arrows={false} mobileArrow={false} laptop={3} tab={2} mobile={1} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} />
        </div>
    )
})

export default MenTShirtSlider
