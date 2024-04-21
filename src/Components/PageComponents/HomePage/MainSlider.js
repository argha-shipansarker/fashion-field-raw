import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Carousel from "../../ReuseableComponents/Carousel";
import Image01 from "../../../Assets/Images/home_slider/01.jpg";
import Image02 from "../../../Assets/Images/home_slider/02.jpg";
import Image03 from "../../../Assets/Images/home_slider/03.jpg";
import Image04 from "../../../Assets/Images/home_slider/04.jpg";
import Image05 from "../../../Assets/Images/home_slider/05.jpg";
import Image06 from "../../../Assets/Images/home_slider/06.jpg";

const data = [
    {
        image: Image01,
    },
    {
        image: Image02,
    },
    {
        image: Image03,
    },
    {
        image: Image04,
    },
    {
        image: Image05,
    },
    {
        image: Image06,
    },
];

const MainSlider = () => {
    const [sliders, setSliders] = useState([]);
    const desktopSlider = useRef(null);
    useEffect(() => {
        // let temp = document.getElementById("desktop-carousel")
        // console.log(temp.parentElement.style.display)
        console.log(desktopSlider.current.style.display);
        axios
            .get("/homebannerSlider", {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((res) => {
                setSliders(res.data.homePageSlider);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    // console.log(sliders);
    return (
        <div className="hidden md:block" ref={desktopSlider}>
            <Carousel
                data={sliders}
                carouselType="mainCarousel"
                slidesToShow={1}
                arrows={false}
                laptop={1}
                tab={1}
                mobile={1}
                dots={true}
                autoplay={true}
                centerMode={false}
                desktopScroll={1}
                laptopScroll={1}
            />
        </div>
    );
};

export default MainSlider;
