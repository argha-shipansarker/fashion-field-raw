import React, { useEffect, useState } from 'react'
import { useLocation, Link, useParams } from "react-router-dom"
import axios from 'axios'
import LazyLoad from 'react-lazyload';

import HeroSlider from '../Components/PageComponents/MenCategoryPage/HeroSlider'
import DealsOfTheDay from '../Components/PageComponents/MenCategoryPage/DealsOfTheDay'
import ShopByCategory from '../Components/PageComponents/MenCategoryPage/ShopByCategory'
import MenBestSeller from '../Components/PageComponents/MenCategoryPage/MenBestSeller'
import MenFirstBanner from '../Components/PageComponents/MenCategoryPage/MenFirstBanner'
import MenShirt from '../Components/PageComponents/MenCategoryPage/MenShirt'
import MenTShirt from '../Components/PageComponents/MenCategoryPage/MenTShirt'
import MenPoloShirt from '../Components/PageComponents/MenCategoryPage/MenPoloShirt'
import MenPants from '../Components/PageComponents/MenCategoryPage/MenPants'
import MenShoe from '../Components/PageComponents/MenCategoryPage/MenShoe'
import MenSecondBanner from '../Components/PageComponents/MenCategoryPage/MenSecondBanner'
import FashionAccessoriesTab from '../Components/PageComponents/MenCategoryPage/FashionAccessoriesTab'
import TopBrands from '../Components/PageComponents/HomePage/TopBrands'
import MainSlider from '../Components/PageComponents/HomePage/MainSlider'
import CommonSlider from '../Components/PageComponents/HomePage/CommonSlider'
import ThreeCarouseMain from '../Components/PageComponents/MenFootwearPage/ThreeCarouselSection/ThreeCarouseMain'

const MenCategoryPage = () => {

    const { pathname } = useLocation()

    const { slug } = useParams()

    const [category, setCategory] = React.useState('');

    const [subcategories, setSubCategories] = React.useState([]);

    const [banners, setBanners] = useState([])



    // console.log(slug)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    const [subCategory, setSubCategory] = useState(null)

    const fetchSubCategories = () => {
        axios.get(`/categories/${slug}/sub-categories`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            // console.log(response);
            setSubCategories(response.data)
        }).catch(error => {
            console.log(error);
        })

        axios.get(`/categories/${slug}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            // console.log(response);
            setCategory(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        axios.get(`/categories/${slug}/slider`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            // console.log(response.data)
            setSubCategory(response.data.sub_categories)
        }).catch(errors => {
            console.log(errors)
        })

        fetchSubCategories();
    }, [slug])



    const [dealsProduct, setDealsProduct] = useState(null)


    const [sectionOneBanner, setSectionOneBanner] = useState([]);
    const [sectionTwoBanner, setSectionTwoBanner] = useState([]);

    const categoryBanners = () => {
        axios.get(`/categoryBannerSlider/${slug}`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => {
            console.log("💥", res.data.categoryBanners);
            // setBanners(res.data.categoryBanners);
            setSectionOneBanner([]);
            setSectionTwoBanner([]);
            res.data.categoryBanners.map((item, index) => {
                if (item.type === 'section1') {
                    setSectionOneBanner(prevState => [...prevState, { image: item.image, link: item.link }])
                }
                if (item.type === 'section2') {
                    setSectionTwoBanner(prevState => [...prevState, { image: item.image, link: item.link }])
                }
            })
        }).catch(err => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        console.log('🏆 hello hello', subcategories);
    }, [subcategories])

    useEffect(() => {
        console.log(slug)
        axios.get(`/deals-main-category/${slug}`, {
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            console.log(response)
            setDealsProduct(response.data);

            // setBestSellingProducts(response.data.products.data)
        }).catch(errors => {
            console.log(errors.response)
        })

        categoryBanners();
    }, [slug])










    return (
        <div className='mt-16 md:mt-0'>
            {/* <HeroSlider /> */}
            <CommonSlider slug={slug} />
            <div className="container mx-auto px-4 mt-6">
                <ol className="list-reset flex text-sm font-medium font-Poppins">
                    <li><Link to="/" className="text-logobarElementBG">Home</Link></li>
                    <li><span className="mx-2 text-mutedText">/</span></li>
                    <li className="text-mutedText">{category.name}</li>
                </ol>
            </div>
            {dealsProduct && <DealsOfTheDay dealsProduct={dealsProduct} />}
            <ShopByCategory subcategories={subcategories} slug={slug} />
            <MenBestSeller />
            <MenFirstBanner slug={slug} sectionOneBanner={sectionOneBanner} />


            {
                subCategory && subCategory.map((item, index) => (
                    <div key={index}>
                        <LazyLoad once={true}>
                            <MenShirt item={item} />
                        </LazyLoad>
                    </div>
                ))
            }


            <MenSecondBanner slug={slug} sectionTwoBanner={sectionTwoBanner} />
            {/* <FashionAccessoriesTab /> */}

            {/* <LazyLoad once={true}> */}
            <ThreeCarouseMain slug={slug} type='category' />
            {/* </LazyLoad> */}

            {/* <LazyLoad once={true} offset={50}> */}
            <TopBrands />
            {/* </LazyLoad> */}

        </div>
    )
}

export default MenCategoryPage
