import React, { useState, useEffect } from 'react'
import axios from "axios"
import Carousel from '../../ReuseableComponents/Carousel'
import Image01 from "../../../Assets/Images/home_slider/01.jpg"
import Image02 from "../../../Assets/Images/home_slider/02.jpg"
import Image03 from "../../../Assets/Images/home_slider/03.jpg"
import Image04 from "../../../Assets/Images/home_slider/04.jpg"
import Image05 from "../../../Assets/Images/home_slider/05.jpg"
import Image06 from "../../../Assets/Images/home_slider/06.jpg"
import Men01 from "../../../Assets/Images/shirt-banner-2.jpg"
import Men02 from "../../../Assets/Images/shirt-banner-1.jpg"
import Women01 from "../../../Assets/Images/ledis-tops.jpg"
import Girl01 from "../../../Assets/Images/girls-t-shirt.jpg"
import Boy01 from "../../../Assets/Images/boy.jpg"

const data = [
    {
        image: Image01
    },
    {
        image: Image02
    },
    {
        image: Image03
    },
    {
        image: Image04
    },
    {
        image: Image05
    },
    {
        image: Image06
    },
]

const men = [
    {
        image: Men01
    },
    {
        image: Men02
    }
];

const women = [
    {
        image: Women01
    }
];

const girl = [
    {
        image: Girl01
    }
];
const boy = [
    {
        image: Boy01
    }
];


const CommonSlider = (props) => {
    const { slug } = props;

    const [sliderData, setSliderData] = React.useState([]);

    // const sliderData = [];



    React.useEffect(() => {
        if (slug == 'men') {
            setSliderData(men)
        } else if (slug == 'women') {
            setSliderData(women)
        } else if (slug == 'mother-care') {
            setSliderData(girl)
        } else if (slug == 'boys-girls') {
            setSliderData(boy)
        } else {
            setSliderData(data)
        }
    }, [slug])

    const [sliders, setSliders] = useState([])
    useEffect(() => {
        axios.get(`/categoryBannerSlider/${slug}`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => {
            console.log("💥", res.data.categorySliders);
            setSliders(res.data.categorySliders);
        }).catch(err => {
            console.log(err.message);
        })
    }, [slug])

    console.log("🎡", sliders);

    return (
        <div>
            <Carousel data={sliders} carouselType="mainCarousel" slidesToShow={1} arrows={false} laptop={1} tab={1} mobile={1} dots={true} autoplay={true} centerMode={false} desktopScroll={1} laptopScroll={1} />
        </div>
    )
}

export default CommonSlider
