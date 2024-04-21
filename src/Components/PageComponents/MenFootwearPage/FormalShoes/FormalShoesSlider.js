import React from 'react'

import Carousel from '../../../ReuseableComponents/Carousel'

import Image1 from "../../../../Assets/Images/MenFootwear/FormalShoes1.png"
import Image2 from "../../../../Assets/Images/MenFootwear/FormalShoes2.png"
import Image3 from "../../../../Assets/Images/MenFootwear/FormalShoes3.png"
import Image4 from "../../../../Assets/Images/MenFootwear/FormalShoes4.png"

const data = [
    {
        category: "Formal Shoes",
        name: "Rerum necessitatibus saepe eveniet ut et voluptates",
        newPrice: 1750,
        image: Image1,
    },
    {
        category: "Formal Shoes",
        name: "Itaque earum rerum hic tenetur a sapiente delectus",
        newPrice: 2820,
        image: Image2,
    },
    {
        category: "Formal Shoes",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 3980,
        image: Image3,
    },
    {
        category: "Formal Shoes",
        name: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
        newPrice: 4880,
        image: Image4,
    },
    {
        category: "Formal Shoes",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 5350,
        image: Image2,
    },
]

const FormalShoesSlider = () => {
    return (
        <div className="carouselWithoutTab">
            <Carousel data={data} carouselType="commonCarousel" slidesToShow={4} arrows={true} mobileArrow={true} laptop={3} tab={2} mobile={1} dots={false} autoplay={false} centerMode={false} />
        </div>
    )
}

export default FormalShoesSlider
