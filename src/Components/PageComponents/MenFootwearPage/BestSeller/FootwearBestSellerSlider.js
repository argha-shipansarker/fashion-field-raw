import React, { forwardRef } from 'react'
import Carousel from '../../../ReuseableComponents/Carousel'

import Image1 from "../../../../Assets/Images/MenFootwear/FootwearBS1.png"
import Image2 from "../../../../Assets/Images/MenFootwear/FootwearBS2.png"
import Image3 from "../../../../Assets/Images/MenFootwear/FootwearBS3.png"
import Image4 from "../../../../Assets/Images/MenFootwear/FootwearBS4.png"

const data = [
    {
        category: "Flip Flops",
        name: "Rerum necessitatibus saepe eveniet ut et voluptates",
        oldPrice: 245,
        newPrice: 195,
        discount: 35,
        image: Image1,
    },
    {
        category: "Flip Flops",
        name: "Itaque earum rerum hic tenetur a sapiente delectus",
        newPrice: 320,
        image: Image2,
    },
    {
        category: "Flip Flops",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 280,
        image: Image3,
    },
    {
        category: "Flip Flops",
        name: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
        newPrice: 680,
        image: Image4,
    },
    {
        category: "Flip Flops",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 750,
        image: Image2,
    },
]

const FootwearBestSellerSlider = forwardRef((props, forwardedRef) => {
    return (
        <div>
            <Carousel data={data} carouselType="commonCarousel" slidesToShow={4} arrows={false} mobileArrow={false} laptop={3} tab={2} mobile={1} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} />
        </div>
    )
})

export default FootwearBestSellerSlider
