import React from 'react'
import Carousel from '../../../ReuseableComponents/Carousel'

import Image1 from "../../../../Assets/Images/MenFootwear/Boots1.png"
import Image2 from "../../../../Assets/Images/MenFootwear/Boots2.png"
import Image3 from "../../../../Assets/Images/MenFootwear/Boots3.png"
import Image4 from "../../../../Assets/Images/MenFootwear/Boots4.png"

const data = [
    {
        category: "Boots",
        name: "Rerum necessitatibus saepe eveniet ut et voluptates",
        newPrice: 1750,
        image: Image1,
    },
    {
        category: "Boots",
        name: "Itaque earum rerum hic tenetur a sapiente delectus",
        newPrice: 2820,
        image: Image2,
    },
    {
        category: "Boots",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 3980,
        image: Image3,
    },
    {
        category: "Boots",
        name: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
        newPrice: 8880,
        image: Image4,
    },
    {
        category: "Boots",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 9350,
        image: Image2,
    },
]

const BootsSlider = () => {
    return (
        <div className="carouselWithoutTab">
            <Carousel data={data} carouselType="commonCarousel" slidesToShow={4} arrows={true} mobileArrow={true} laptop={3} tab={2} mobile={1} dots={false} autoplay={false} centerMode={false} />
        </div>
    )
}

export default BootsSlider
