import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LazyLoad from "react-lazyload";

import MainSlider from "../Components/PageComponents/HomePage/MainSlider";
import DealsOfTheDay from "../Components/PageComponents/HomePage/DealsOfTheDay";
import BestSeller from "../Components/PageComponents/HomePage/BestSeller";
import MenFashion from "../Components/PageComponents/HomePage/MenFashion";
import WomenFashion from "../Components/PageComponents/HomePage/WomenFashion";
import BoyClothing from "../Components/PageComponents/HomePage/BoyClothing";
import FirstBanner from "../Components/PageComponents/HomePage/FirstBanner";
import SecondBanner from "../Components/PageComponents/HomePage/SecondBanner";
import GirlsClothing from "../Components/PageComponents/HomePage/GirlsClothing";
import ThirdBanner from "../Components/PageComponents/HomePage/ThirdBanner";
import HomeLivingGridTab from "../Components/PageComponents/HomePage/Home&Lifestyle/HomeLivingGridTab";
import TopBrands from "../Components/PageComponents/HomePage/TopBrands";
import ThreeCarouseMain from "../Components/PageComponents/MenFootwearPage/ThreeCarouselSection/ThreeCarouseMain";

import MyntraSliderMobile from "../Components/PageComponents/HomePage/MyntraSliderMobile";
import AarongMobileSlider from "../Components/PageComponents/HomePage/AarongMobileSlider";

import Testimonials from "../Components/Testimonials";

import BestSellerSlider from "../Components/PageComponents/HomePage/BestSellerSlider";

const HomePage = () => {
    const { pathname } = useLocation();
    // console.log(pathname)

    const [modifiecData, setModifiedData] = useState([]);
    const fetchSliderImages = () => {
        axios
            .get("/homepage/main-banner", {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) => {
                setModifiedData([]);
                console.log("mobile top banners", response);
                response.data.forEach((slider) => {
                    setModifiedData((prevState) => [
                        ...prevState,
                        { link: slider.link, image: slider.image },
                    ]);
                });
            })
            .catch((error) => {
                console.log(error.response);
            });
    };
    useEffect(() => {
        fetchSliderImages();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [categories, setCategories] = useState(null);

    const [bannerSliders, setBannersSliders] = useState([]);

    useEffect(() => {
        axios
            .get("/homepage/slider", {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) => {
                console.log("🔷", response.data);
                setCategories(response.data);
            })
            .catch((errors) => {
                console.log(errors.response);
            });
    }, []);

    const [dealsProduct, setDealsProduct] = useState(null);

    useEffect(() => {
        axios
            .get(`homepage-deals`, {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) => {
                console.log("🏆🔥", response.data);
                setDealsProduct(response.data);
            })
            .catch((errors) => {
                console.log(errors.response);
            });
    }, []);

    useEffect(() => {
        console.log("hello hello hello hello", categories);
    }, [categories]);

    return (
        <div className="mt-16 md:mt-0">
            {/* <div className='hidden md:block'> */}
            <MainSlider />
            {/* </div> */}

            <div className="md:hidden">
                <MyntraSliderMobile />
            </div>

            <div className="md:hidden">
                <AarongMobileSlider />
            </div>

            {modifiecData?.map((item, index) => (
                <div className="md:hidden w-full mt-4" key={index}>
                    <a href={item?.link ? item.link : "#"}>
                        <img
                            src={item?.image}
                            alt="Hero Slider"
                            className="w-full object-contain"
                        />
                    </a>
                </div>
            ))}

            {dealsProduct && <DealsOfTheDay dealsProduct={dealsProduct} />}

            <BestSellerSlider />

            <LazyLoad once={true} offset={50}>
                <FirstBanner />
            </LazyLoad>

            {categories &&
                categories
                    .filter((item, index) => index < 2)
                    .map((item, index) => (
                        <div key={index}>
                            <LazyLoad once={true} offset={50}>
                                <MenFashion item={item} />
                            </LazyLoad>
                        </div>
                    ))}

            <div className="hidden md:block">
                <LazyLoad once={true} offset={50}>
                    <SecondBanner />
                </LazyLoad>
            </div>

            {categories &&
                categories
                    .filter((item, index) => index > 1)
                    .map((item, index) => (
                        <div key={index}>
                            <LazyLoad once={true} offset={50}>
                                <MenFashion item={item} />
                            </LazyLoad>
                        </div>
                    ))}

            <LazyLoad once={true} offset={50}>
                <ThirdBanner />
            </LazyLoad>

            {/* <HomeLivingGridTab /> */}

            <LazyLoad once={true} offset={50}>
                <ThreeCarouseMain slug="all" type="all" />
            </LazyLoad>

            <LazyLoad once={true} offset={50}>
                <TopBrands />
            </LazyLoad>

            <Testimonials />
        </div>
    );
};

export default HomePage;
