import React, { useEffect, useState } from 'react'
import { useLocation, Link, useParams, useHistory } from "react-router-dom"
import axios from 'axios'
import LazyLoad, { lazyload } from 'react-lazyload';

import MainSlider from "../Components/PageComponents/MenFootwearPage/MainSlider"
import FootwearDealsOfTheDay from '../Components/PageComponents/MenFootwearPage/DealsOfTheDay/FootwearDealsOfTheDay'
import FootwearSOC from '../Components/PageComponents/MenFootwearPage/FootwearSOC'
import FootwearBestSeller from '../Components/PageComponents/MenFootwearPage/BestSeller/FootwearBestSeller'
import FootwearFirstBanner from '../Components/PageComponents/MenFootwearPage/Banners/FootwearFirstBanner'
import Sandals from '../Components/PageComponents/MenFootwearPage/Sandals'
import Sneakers from '../Components/PageComponents/MenFootwearPage/Sneakers/Sneakers'
import FormalShoes from '../Components/PageComponents/MenFootwearPage/FormalShoes/FormalShoes'
import SportsShoes from '../Components/PageComponents/MenFootwearPage/SportsShoes/SportsShoes'
import Boots from '../Components/PageComponents/MenFootwearPage/Boots/Boots'
import FootwearSecondBanner from '../Components/PageComponents/MenFootwearPage/Banners/FootwearSecondBanner'
import ThreeCarouseMain from '../Components/PageComponents/MenFootwearPage/ThreeCarouselSection/ThreeCarouseMain'
import TopBrands from '../Components/PageComponents/HomePage/TopBrands'

import BestSeller from '../Components/PageComponents/HomePage/BestSeller'
import DealsOfTheDay from '../Components/PageComponents/HomePage/DealsOfTheDay'



const MenFootwearPage = () => {

    const pathName = useLocation()
    const { slug } = useParams()
    const { main_category, sub_category } = useParams()

    const [subCategories, setSubCategories] = useState(null)

    const [productCategories, setProductCategories] = useState([]);
    const [dealsProduct, setDealsProduct] = useState(null);


    const [subCategory, setSubcategory] = useState('');

    const [bestSellingProducts, setBestSellingProducts] = useState(null)

    const fetchProductCategories = () => {
        axios.get(`/sub-categories/${sub_category}/product-categories`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            console.log(response);
            setProductCategories(response.data);
        }).catch(error => {
            console.log(error);
        })

        axios.get(`/sub-categories/${sub_category}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            console.log(response);
            setSubcategory(response.data);
        }).catch(error => {
            console.log(error);
        })
    }


    const [banners, setBanners] = useState([])
    const [subcategorySliders, setSubCategorySliders] = useState([])

    const [sectionOneLargeBanner, setSectionOneLargeBanner] = useState([]);
    const [sectionOneSmallBanner, setSectionOneSmallBanner] = useState([]);

    const [sectionTwoLargeBanner, setSectionTwoLargeBanner] = useState([]);
    const [sectionTwoSmallBanner, setSectionTwoSmallBanner] = useState([]);
    const [headerBanner, setheaderBanner] = useState([]);

    const subcategoryBanners = () => {
        axios.get(`/subcategoryBannerSlider/${sub_category}`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => {
            console.log("💥", res.data.subcategoryBanners);
            setSubCategorySliders(res.data.subcategorySliders);
            // setBanners(res.data.categoryBanners);
            setSectionOneLargeBanner([]);
            setSectionOneSmallBanner([]);
            setSectionTwoLargeBanner([]);
            setSectionTwoSmallBanner([]);
            setheaderBanner([]);
            res.data.subcategoryBanners.map((item, index) => {
                if (item.type === 'section1large') {
                    setSectionOneLargeBanner(prevState => [...prevState, { image: item.image, link: item.link }])
                }
                if (item.type === 'section1small') {
                    setSectionOneSmallBanner(prevState => [...prevState, { image: item.image, link: item.link }])
                }
                if (item.type === 'section2small') {
                    setSectionTwoSmallBanner(prevState => [...prevState, { image: item.image, link: item.link }])
                }
                if (item.type === 'section2large') {
                    setSectionTwoLargeBanner(prevState => [...prevState, { image: item.image, link: item.link }])
                }
                if (item.type === 'headerbanner') {
                    setheaderBanner(prevState => [...prevState, { image: item.image, link: item.link }])
                }
            })
        }).catch(err => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        axios.get(`/sub-categories/${sub_category}/slider`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            console.log(response.data)
            setSubCategories(response.data.product_categories)
        }).catch(errors => {
            console.log(errors.response)
        })
        fetchProductCategories();

        axios.get(`/deals-sub-category/${sub_category}`, {
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            console.log(response)
            setDealsProduct(response.data)
        }).catch(errors => {
            console.log(errors.response)
        })
        subcategoryBanners();
    }, [sub_category])




    useEffect(() => {
        console.log('🏆', banners);
    }, [banners])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathName])



    return (
        <div className='mt-16 md:mt-0'>
            <MainSlider subcategorySliders={subcategorySliders} />
            <div className="container mx-auto px-4 mt-4">
                <ol className="list-reset flex text-sm font-medium font-Poppins">
                    <li><Link to="/" className="text-logobarElementBG">Home</Link></li>
                    <li><span className="mx-2 text-mutedText">/</span></li>
                    <li><Link to={`/main-category/${subCategory?.category?.slug}`} className="text-logobarElementBG">{subCategory?.category?.name}</Link></li>
                    <li><span className="mx-2 text-mutedText">/</span></li>
                    <li className="text-mutedText">{subCategory?.name}</li>
                </ol>
            </div>
            {/* <FootwearDealsOfTheDay /> */}
            {dealsProduct && <DealsOfTheDay dealsProduct={dealsProduct} />}
            <FootwearSOC productCategories={productCategories} />
            <BestSeller sub_category={sub_category} />
            <FootwearFirstBanner sectionOneLargeBanner={sectionOneLargeBanner} sectionOneSmallBanner={sectionOneSmallBanner} />



            {
                subCategories && subCategories.map((item, index) => (
                    <div key={index}>
                        <LazyLoad once={true}>
                            <Sandals item={item} />
                        </LazyLoad>
                    </div>
                ))
            }

            <FootwearSecondBanner sectionTwoLargeBanner={sectionTwoLargeBanner} sectionTwoSmallBanner={sectionTwoSmallBanner} />
            <ThreeCarouseMain slug={sub_category} type='sub_category' />
            <TopBrands />
        </div>
    )
}

export default MenFootwearPage
