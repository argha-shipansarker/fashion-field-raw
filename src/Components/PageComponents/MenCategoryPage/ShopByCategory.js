import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import SbC1 from "../../../Assets/Images/MenCategory/SbC1.png"
import SbC2 from "../../../Assets/Images/MenCategory/SbC2.png"
import SbC3 from "../../../Assets/Images/MenCategory/SbC3.png"
import SbC4 from "../../../Assets/Images/MenCategory/SbC4.png"
import SbC5 from "../../../Assets/Images/MenCategory/SbC5.png"
import SbC6 from "../../../Assets/Images/MenCategory/SbC6.png"

const data = [
    {
        image: SbC1,
        name: "Clothing",
        link: ""
    },
    {
        image: SbC2,
        name: "Watches",
        link: ""
    },
    {
        image: SbC3,
        name: "Footwears",
        link: "/sub-category/abraham-grady/roscoe-breitenberg"
    },
    {
        image: SbC4,
        name: "Men's Care",
        link: ""
    },
    {
        image: SbC5,
        name: "Backpacks",
        link: ""
    },
    {
        image: SbC6,
        name: "Accessories",
        link: ""
    },
]

const ShopByCategory = (props) => {

    const { subcategories, slug } = props;

    useEffect(() => {
        console.log("🙌🙌🙌🙌🙌🙌🙌", subcategories)
    }, [subcategories])




    React.useEffect(() => {
        // console.log(props);
    }, [props])

    return (
        <div className="container mx-auto px-4 mt-4">
            <div className="md:pr-7">
                <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Shop by Category</p>
                <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-7"></div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-6" style={{ justifyItems: "center" }}>
                    {
                        subcategories.map((item, index) => (
                            <Link className="bg-topBarBG h-46.5 w-4/5 md:w-full border-1 hover:border-mutedText border-transparent hover:shadow-lg rounded-lg transition-all ease-linear duration-300 overflow-hidden" key={index} to={`/sub-category/${item.slug}`}>
                                <div className="h-4/5 flex justify-center items-center transform scale-101 hover:scale-105 transition-all ease-linear duration-300 mt-1">
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

export default ShopByCategory
