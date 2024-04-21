import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Image1 from "../../../Assets/Images/MenFootwear/FootSOC1.png"
import Image2 from "../../../Assets/Images/MenFootwear/FootSOC2.png"
import Image3 from "../../../Assets/Images/MenFootwear/FootSOC3.png"
import Image4 from "../../../Assets/Images/MenFootwear/FootSOC4.png"
import Image5 from "../../../Assets/Images/MenFootwear/FootSOC5.png"
import Image6 from "../../../Assets/Images/MenFootwear/FootSOC6.png"
import Image7 from "../../../Assets/Images/MenFootwear/FootSOC7.png"
import Image8 from "../../../Assets/Images/MenFootwear/FootSOC8.png"
import Image9 from "../../../Assets/Images/MenFootwear/FootSOC9.png"
import Image10 from "../../../Assets/Images/MenFootwear/FootSOC10.png"
import Image11 from "../../../Assets/Images/MenFootwear/FootSOC11.png"
import Image12 from "../../../Assets/Images/MenFootwear/FootSOC12.png"

const data = [
    {
        image: Image1,
        name: "Flip Flops",
        link: "flip-flops"
    },
    {
        image: Image2,
        name: "Flat Sandals",
        link: "flat-sandals"
    },
    {
        image: Image3,
        name: "Casual Sandals",
        link: "casual-sandals"
    },
    {
        image: Image4,
        name: "House Slippers",
        link: "house-slippers"
    },
    {
        image: Image5,
        name: "Sneakers",
        link: "sneakers"
    },
    {
        image: Image6,
        name: "Loafers",
        link: "loafers"
    },
    {
        image: Image7,
        name: "Casual Shoes",
        link: "casual-shoes"
    },
    {
        image: Image8,
        name: "Formal Shoes",
        link: "formal-shoes"
    },
    {
        image: Image9,
        name: "Sports Shoes",
        link: "sports-shoes"
    },
    {
        image: Image10,
        name: "Boots",
        link: "boots"
    },
    {
        image: Image11,
        name: "Running Shoes",
        link: "running-shoe"
    },
    {
        image: Image12,
        name: "Accessories",
        link: "accessories"
    },
]

const FootwearSOC = (props) => {

    const { productCategories } = props;

    const [modifiedProductCategories, setModifiedProductCategories] = useState([])

    const history = useHistory()

    useEffect(() => {
        if (productCategories.length == 1) {
            if (productCategories[0].name == "Products") {
                history.push(`/category/${productCategories[0].slug}`)
            }
        } else {
            let temp = productCategories.filter(value => value.name != "Products")
            setModifiedProductCategories(temp)
        }
        // console.log(productCategories)
    }, [productCategories])

    return (
        <div className="container mx-auto px-4 mt-8">
            <div className="md:pr-7">
                <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Shop by Category</p>
                <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-7"></div>
                <div className="grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-6" style={{ justifyItems: "center" }}>
                    {
                        modifiedProductCategories.map((item, index) => (
                            <Link className="bg-topBarBG h-46.5 w-4/5 md:w-full border-1 hover:border-mutedText border-transparent hover:shadow-lg rounded-lg transition-all ease-linear duration-300 overflow-hidden" key={index} to={`/category/${item.slug}`}>
                                <div className="h-4/5 flex justify-center items-center transform scale-101 hover:scale-105 transition-all ease-linear duration-300">
                                    <img src={item.thumbnail} alt="Shop By Category Section" />
                                </div>
                                <div className="h-1/5 flex justify-center items-center">
                                    <p className="font-Poppins font-semibold text-sm text-topBarTextColor">{item.name}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FootwearSOC
