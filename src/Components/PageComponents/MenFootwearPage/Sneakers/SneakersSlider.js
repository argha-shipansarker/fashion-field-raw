import React from 'react'
import Carousel from '../../../ReuseableComponents/Carousel'

import Image1 from "../../../../Assets/Images/MenFootwear/Sneakers1.png"
import Image2 from "../../../../Assets/Images/MenFootwear/Sneakers2.png"
import Image3 from "../../../../Assets/Images/MenFootwear/Sneakers3.png"
import Image4 from "../../../../Assets/Images/MenFootwear/Sneakers4.png"

const data = [
    {
        category: "Sneakers",
        name: "Rerum necessitatibus saepe eveniet ut et voluptates",
        newPrice: 1080,
        image: Image1,
    },
    {
        category: "Sneakers",
        name: "Itaque earum rerum hic tenetur a sapiente delectus",
        newPrice: 1820,
        image: Image2,
    },
    {
        category: "Sneakers",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 2980,
        image: Image3,
    },
    {
        category: "Sneakers",
        name: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
        newPrice: 1880,
        image: Image4,
    },
    {
        category: "Sneakers",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 3350,
        image: Image2,
    },
]

const SneakersSlider = () => {
    return (
        <div className="carouselWithoutTab">
            <Carousel data={data} carouselType="commonCarousel" slidesToShow={4} arrows={true} mobileArrow={true} laptop={3} tab={2} mobile={1} dots={false} autoplay={false} centerMode={false} />
        </div>
    )
}

export default SneakersSlider
