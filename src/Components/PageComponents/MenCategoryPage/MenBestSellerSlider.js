import React, { forwardRef, useState, useEffect } from 'react'
import axios from 'axios'

import Carousel from '../../ReuseableComponents/Carousel'

import MBS1 from "../../../Assets/Images/MenCategory/MBS1.png"
import MBS2 from "../../../Assets/Images/MenCategory/MBS2.png"
import MBS3 from "../../../Assets/Images/MenCategory/MBS3.png"
import MBS4 from "../../../Assets/Images/MenCategory/MBS4.png"

const data = [
    {
        category: "Shoes",
        name: "Rerum necessitatibus saepe eveniet ut et voluptates",
        oldPrice: 2890,
        newPrice: 2140,
        image: MBS1,
        id: 0,
    },
    {
        category: "Hats",
        name: "Itaque earum rerum hic tenetur a sapiente delectus",
        newPrice: 255,
        image: MBS2,
        id: 1,
    },
    {
        category: "Shirts",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 580,
        image: MBS3,
        id: 2,
    },
    {
        category: "Wallets",
        name: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
        newPrice: 680,
        image: MBS4,
        id: 3,
    },
    {
        category: "Hats",
        name: "Quis autem vel eum iure repreh enderit qui in ea voluptate velit",
        newPrice: 575,
        image: MBS2,
        id: 4,
    },
]


const MenBestSellerSlider = forwardRef((props, forwardedRef) => {



    const { slug } = props

    // console.log(slug)

    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.get(`/product-categories/${slug}/slider`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            // console.log(response.data)
            setProduct(response.data.products)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [slug])



    return (
        <div>
            {
                product && <Carousel data={product} carouselType="commonCarousel" slidesToShow={4} arrows={false} mobileArrow={false} laptop={3} tab={2} mobile={product.length < 2 ? product.length : 2} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} desktopScroll={4} laptopScroll={3} />
            }
        </div>
    )
})

export default MenBestSellerSlider
