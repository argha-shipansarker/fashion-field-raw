import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ProductInfoSection from '../Components/PageComponents/IndividualProduct/ProductInfoSection'
import ProductDescriptionSection from '../Components/PageComponents/IndividualProduct/ProductDescriptionSection'
import SimilarProducts from '../Components/PageComponents/IndividualProduct/SimilarProducts'
import RecentlyViewed from '../Components/PageComponents/IndividualProduct/RecentlyViewed'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

import { BreadCrumbsLoader } from "../SkeletonLoaders/IndividualProductPageLoader"

const IndividualProduct = ({ appearances }) => {

    const [openTab, setOpenTab] = useState(1);


    const { slug } = useParams();

    const [similarProducts, setSimilarProducts] = React.useState([]);
    const [recentProducts, setRecentProducts] = React.useState([]);


    const { pathname } = useLocation()
    // console.log(pathname)

    useEffect(() => {
        window.scrollTo(0, 0)
        setOpenTab(1)
    }, [pathname])




    const [product, setProduct] = React.useState(null);

    const fatchProduct = () => {
        axios.get(`/products/${slug}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            console.log(response);
            setProduct(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const fetchSimilarProducts = () => {
        axios.get(`/products/${slug}/similar`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            // console.log(response);
            setSimilarProducts(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const fetchRecentViewProducts = () => {
        axios.get(`/products/${slug}/recent-view`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            // console.log(response);
            setRecentProducts(response.data);
        }).catch(error => {
            // console.log(error);
        })
    }

    React.useEffect(() => {
        // console.log(slug);
        fatchProduct();
        fetchSimilarProducts();
        fetchRecentViewProducts();
    }, [slug])

    return (
        <div className="container mx-auto pl-4 pr-4 md:pr-7 mt-18 md:mt-0">

            {
                product ? (
                    <ol className="list-reset flex flex-wrap text-sm font-medium font-Poppins mt-4 hidden md:flex">
                        <li><Link to="/" className="text-logobarElementBG">Home</Link></li>
                        <li><span className="mx-2 text-mutedText">/</span></li>
                        <li><Link to={`/main-category/${product?.product_category?.sub_category?.category?.slug}`} className="text-logobarElementBG">{product?.product_category?.sub_category?.category?.name}</Link></li>
                        <li><span className="mx-2 text-mutedText">/</span></li>
                        <li><Link to={`/sub-category/${product?.product_category?.sub_category?.slug}`} className="text-logobarElementBG">{product?.product_category?.sub_category?.name}</Link></li>
                        <li><span className="mx-2 text-mutedText">/</span></li>
                        <li><Link to={`/category/${product?.product_category?.slug}`} className="text-logobarElementBG">{product?.product_category?.name}</Link></li>
                        <li><span className="mx-2 text-mutedText">/</span></li>
                        <li className="text-mutedText">{product?.name}</li>
                    </ol>
                ) : <BreadCrumbsLoader />
            }






            <ProductInfoSection product={product} setOpenTab={setOpenTab} appearances={appearances} />
            <ProductDescriptionSection description={product?.description} specification={product?.specification} productSlug={product?.slug} numberOfReviews={product?.reviews_count} openTab={openTab} setOpenTab={setOpenTab} />
            <SimilarProducts similarProducts={similarProducts} />
            <RecentlyViewed recentProducts={recentProducts} />
        </div>
    )
}

export default IndividualProduct
