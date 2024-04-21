import React, { useState, useRef, useEffect } from 'react'
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom"
import Rating from "react-rating"
import { useSelector } from 'react-redux';
import { ImSpinner9 } from "react-icons/im"

import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';
import LinesEllipsis from "react-lines-ellipsis"
import { BiPlus, BiMinus } from "react-icons/bi"
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaWhatsapp } from "react-icons/fa"

import ProductImage1 from "../../Assets/Images/product-image1.png"
import ProductImage2 from "../../Assets/Images/product-image2.png"
import ProductImage3 from "../../Assets/Images/product-image3.png"
import ProductImage4 from "../../Assets/Images/product-image4.png"

import { useDispatch } from 'react-redux';
import { addingProduct, calculatingTotalPrice, calculatingTotalCartProducts, openingCartSideBar, openAddedToCartNotificationModal } from "../../ReduxStore/CartSystem/CartStore"

import SliderImage from 'react-zoom-slider';

import ImageGallary from '../PageComponents/IndividualProduct/ImageGallary';

import Slider from "react-slick";

import { SliderLoader, SliderDescriptionLoader } from "../../SkeletonLoaders/TestModalLoader"

import UseWindowDimensionsHook from './UseWindowDimensionsHook';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, height: 30, width: 30, borderRadius: 15, background: "#f6f6f6", display: "flex", justifyContent: "center", alignItems: "center", color: "#999999" }}
            onClick={onClick}
        >
            <div style={{ fontSize: 17 }} className="custom-arrow-icon-div">
                <i className="fas fa-angle-right custom-arrow-icon"></i>
            </div>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, height: 30, width: 30, borderRadius: 15, background: "#f6f6f6", display: "flex", justifyContent: "center", alignItems: "center", color: "#999999" }}
            onClick={onClick}
        >
            <div style={{ fontSize: 17 }} className="custom-arrow-icon-div">
                <i className="fas fa-angle-left custom-arrow-icon"></i>
            </div>
        </div>
    );
}

const TestModal = props => {

    const { height, width } = UseWindowDimensionsHook();

    const { modal, setModal, specficProduct } = props

    const { cartArray } = useSelector(state => state.testCart)

    const history = useHistory()

    // console.log(data)

    // const selectedProduct = data[indexValue]
    // console.log(selectedProduct)

    const dispatch = useDispatch()

    const [product, setProduct] = useState(null)
    const [productVariation, setProductVariation] = useState([])
    const [productionVaritaionArrayForAxios, setProductionVaritaionArrayForAxios] = useState([])

    const [productionVaritaionArrayForFrontend, setProductionVaritaionArrayForFrontend] = useState([])

    const [productVariationId, setProductVariationId] = useState(null)

    const [variationRelatedAllData, setVariationRelatedAllData] = useState(null)

    const [productImages, setProductImages] = useState([])

    const [variantProductVarientStock, setVariantProductVarientStock] = useState(null)

    const [numberOfProduct, setNumberOfProduct] = useState(1)

    useEffect(() => {
        console.log(variantProductVarientStock)
    }, [variantProductVarientStock])


    // console.log(specficProduct)

    useEffect(() => {
        axios.get(`/products/${specficProduct?.slug}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            console.log(response);
            setProduct(response.data);
            setNumberOfProduct(1)
            if (response.data?.selected_variable) {
                let temp = response.data?.selected_variable?.attributes?.map(values => values.value)
                console.log(temp)

                let productVariationTemp = []
                response.data?.selected_variable?.attributes?.forEach(values => {
                    let obj = { [values.attribute_id]: values.value }
                    productVariationTemp.push(obj)
                })
                console.log(productVariationTemp)
                setProductVariation(productVariationTemp)

                let product = cartArray.filter(item => item.productGroupId == response.data?.selected_variable?.id)
                if (product.length > 0) {
                    setNumberOfProduct(product[0].productQuantity)
                }
                setProductionVaritaionArrayForFrontend(temp)
                setProductVariationId(response.data?.selected_variable?.id)
                setVariationRelatedAllData(response.data?.selected_variable)
                setVariantProductVarientStock(response.data?.selected_variable?.stock)
            } else {
                let product = cartArray.filter(item => item.productId == response.data?.id)
                console.log(product)
                if (product.length > 0) {
                    setNumberOfProduct(product[0].productQuantity)
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }, [specficProduct])



    useEffect(() => {
        // console.log(productVariationId)
        console.log(variationRelatedAllData)
        // console.log(product)

    }, [productVariationId, variationRelatedAllData, product])







    // useEffect(() => {
    //     if (product != null) {
    //         setProductImages([])
    //         setProductImages(prevState => [...prevState, product.thumbnail])
    //         product.images.map((item, index) => {
    //             setProductImages(prevState => [...prevState, item.product_image[0].image])
    //         })
    //     }

    // }, [product])

    const [newSliderImage, setNewSliderImage] = useState([])

    useEffect(() => {
        if (product != null) {
            setNewSliderImage([])

            if (product?.type == 'product_group') {

                product?.selected_thumbnails?.map((item, index) => {
                    setNewSliderImage(prevState => [...prevState, { image: item?.thumbnail, text: "product_group" }])
                })

            } else {
                if (product?.selected_variable?.attributes) {
                    Object.values(product?.variables)?.map(values => {
                        // console.log(values)
                        values.map(item => {
                            if (item?.thumbnails.length > 0) {
                                if (productionVaritaionArrayForFrontend.includes(item?.value)) {
                                    item?.thumbnails?.map(item => {
                                        setNewSliderImage(prevState => [...prevState, { image: item?.thumbnail, text: "product_group" }])
                                    })
                                }
                            }
                        })
                    })

                } else {
                    product?.images?.map((item, index) => {
                        setNewSliderImage(prevState => [...prevState, { image: item.product_image[0].image, text: "product" }])
                    })
                }
            }

        }

    }, [product, productionVaritaionArrayForFrontend])


    useEffect(() => {

        if (variationRelatedAllData?.thumbnails) {
            if (variationRelatedAllData?.thumbnails.length > 0) {
                console.log("hello again")
                setNewSliderImage([])
                variationRelatedAllData?.thumbnails?.map(item => {
                    setNewSliderImage(prevState => [...prevState, { image: item?.thumbnail, text: "product_group" }])
                })
            }
        }


    }, [variationRelatedAllData])


    const modalRef = useRef()

    // useEffect(() => {
    //     // window.scrollTo({ behavior: "smooth", top: modalRef.current.offsetTop })
    //     // console.log(modalRef)
    //     modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // }, [])


    const closeModal = () => {
        setModal(false)
    }

    const images = [ProductImage1, ProductImage2, ProductImage3, ProductImage4]

    const settings = {
        customPaging: function (i) {
            return (
                <div className="w-3/4 h-3/4">
                    <img src={productImages[i]} alt="Products Demo" className="h-full w-full" />
                </div>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };


    const handlingDecreasingProductQuantity = () => {
        if (numberOfProduct > 1) {
            setNumberOfProduct(prevState => prevState - 1)
        }
    }

    const handlingIncreasingProductQuantity = item => {
        if (product?.is_variable) {
            if (numberOfProduct < variantProductVarientStock) {
                setNumberOfProduct(prevState => prevState + 1)
            }
        } else {
            if (numberOfProduct < product?.stock) {
                setNumberOfProduct(prevState => prevState + 1)
            }
        }
    }

    // const handlingAddingToCart = product => {
    //     const modifiedProductObjectWithQuantity = { ...product, productQuantity: numberOfProduct }
    //     console.log(modifiedProductObjectWithQuantity)
    //     dispatch(addingProduct(modifiedProductObjectWithQuantity))
    //     dispatch(calculatingTotalPrice())
    //     dispatch(calculatingTotalCartProducts())
    //     setModal(false)
    // }

    const handleAddingProductInCart = (item) => {
        console.log(item)
        setModal(false)
        if (item?.is_variable == false) {
            const modifiedProductObjectWithQuantity = { ...item, productQuantity: numberOfProduct, type: "product", groupId: "", variantData: null, outOfStock: false }
            dispatch(addingProduct(modifiedProductObjectWithQuantity))
            dispatch(calculatingTotalPrice())
            dispatch(calculatingTotalCartProducts())
        }

        if (item?.is_variable == true && productVariationId != null && variationRelatedAllData != null) {
            const modifiedProductObjectWithQuantity = { ...item, productQuantity: numberOfProduct, type: "product_group", groupId: productVariationId, variantData: variationRelatedAllData, allVariants: item?.variables?.Color, outOfStock: false }
            dispatch(addingProduct(modifiedProductObjectWithQuantity))
            dispatch(calculatingTotalPrice())
            dispatch(calculatingTotalCartProducts())
        }

    }

    const [requestQueue, setRequestQueue] = useState([])


    const creatingProductVariationArray = (item, attributeName) => {
        // console.log(item)
        if (requestQueue.length == 0) {
            setRequestQueue([1])
            let testArray = []
            testArray = [...productVariation]

            setProductVariationId(-1)

            let key = item?.attribute_id
            let object = { [key]: item?.value }

            let alreadyInProductVariation = testArray.findIndex(item => Object.keys(item) == key)

            if (alreadyInProductVariation == -1) {
                // console.log(object)
                testArray = [...testArray, object]

            } else {
                // testArray[alreadyInProductVariation][key] = item?.product_option?.id
                testArray[alreadyInProductVariation][key] = item?.value
            }

            // console.log(testArray)

            let axiosSendingArray = []

            testArray.forEach((value, index) => {
                let temp = Object.values(value)
                axiosSendingArray = [...axiosSendingArray, ...temp]
                // console.log(temp, index)
            })

            setProductionVaritaionArrayForFrontend(axiosSendingArray)

            axios.post(`products/${product?.slug}`, {
                product_option_id: axiosSendingArray
            }, {
                headers: {
                    Accept: "application/json"
                }
            }).then(response => {
                console.log(response)
                setNumberOfProduct(1)
                let product = cartArray.filter(item => item.productGroupId == response.data?.id)
                console.log(product)
                if (product.length > 0) {
                    setNumberOfProduct(product[0].productQuantity)
                }
                setProductVariationId(response.data.id)
                setVariationRelatedAllData(response.data)
                setVariantProductVarientStock(response.data?.stock)
                setRequestQueue([])
            }).catch(errors => {
                console.log(errors.response)
                setProductVariationId(null)
                setVariationRelatedAllData(null)
                setVariantProductVarientStock(null)
                setRequestQueue([])
            })

            setProductVariation(testArray)
        }

    }

    // useEffect(() => {
    //     if (productVariation.length > 0) {
    //         let finalTemp = []
    //         productVariation.forEach((value, index) => {
    //             let temp = Object.values(value)
    //             finalTemp = [...finalTemp, ...temp]
    //             // console.log(temp, index)
    //         })

    //         // console.log(finalTemp)
    //         setProductionVaritaionArrayForAxios(finalTemp)
    //         setProductionVaritaionArrayForFrontend(finalTemp)

    //     }

    // }, [productVariation])

    // useEffect(() => {
    //     if (product != null && productionVaritaionArrayForAxios.length == Object.keys(product?.variables).length) {
    //         // console.log(productionVaritaionArrayForAxios)
    //         axios.post(`products/${product?.slug}`, {
    //             product_option_id: productionVaritaionArrayForAxios
    //         }, {
    //             headers: {
    //                 Accept: "application/json"
    //             }
    //         }).then(response => {
    //             console.log(response)
    //             setNumberOfProduct(1)
    //             let product = cartArray.filter(item => item.productGroupId == response.data?.id)
    //             console.log(product)
    //             if (product.length > 0) {
    //                 setNumberOfProduct(product[0].productQuantity)
    //             }
    //             setProductVariationId(response.data.id)
    //             setVariationRelatedAllData(response.data)
    //             setVariantProductVarientStock(response.data?.stock)
    //         }).catch(errors => {
    //             console.log(errors.response)
    //             setProductVariationId(null)
    //             setVariationRelatedAllData(null)
    //             setVariantProductVarientStock(null)
    //         })
    //     }

    // }, [productionVaritaionArrayForAxios])



    return (
        <div>
            <Modal open={modal} onClose={closeModal} center={true} blockScroll={false} ref={modalRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 pt-2">
                    <div className="modalCarousel w-67">
                        {/* {
                            productImages && <Slider {...settings} className="h-140">
                                {productImages.map((item, index) => (
                                    <div key={index}>
                                        <div className="h-106 bg-topBarBG flex justify-center items-center">
                                            <img src={item} alt="Products" />
                                        </div>
                                    </div>
                                ))}

                            </Slider>
                        } */}
                        {
                            newSliderImage.length > 0 ? <ImageGallary
                                data={newSliderImage}
                                width="100%"
                                showDescription={false}
                                direction="right"
                            /> : <SliderLoader />
                        }
                    </div>
                    <div>
                        {
                            product ? (
                                <div>
                                    {product && <Link className="text-xl text-topBarTextColor font-Poppins font-semibold hover:text-logobarElementBG line-clamp-2" to={`/product/${product.slug}`}>{product.name}</Link>}
                                    <p className="font-DMSans text-topBarTextColor text-3.25 mt-2">
                                        Category:
                                        {product && <Link className="text-mutedText hover:text-logobarElementBG ml-2 cursor-pointer" to={`/category/${product.product_category.slug}`}>{product.product_category.name}</Link>}
                                    </p>
                                    <p className="font-DMSans text-topBarTextColor text-3.25 mt-1">
                                        Brand:
                                        {product && <Link className="text-mutedText hover:text-logobarElementBG ml-2" to={`/brand/${product?.brand?.slug}`}>{product?.brand?.name}</Link>}
                                    </p>
                                    <hr className="mt-1 mb-1" />

                                    {product && product.special_price != null ? <strike className="text-base text-mutedText font-semibold font-Poppins">Tk. {product.price}</strike> : ''}

                                    <p className="font-Poppins font-bold text-topBarTextColor text-2xl">
                                        TK.
                                        {product && <span className="inline-block text-logobarElementBG ml-1">{product.selling_price}</span>}
                                    </p>

                                    <div className="flex items-center mt-1">
                                        {/* <Tippy content="4.00"> */}
                                        <Rating
                                            emptySymbol="fa fa-star-o text-sm text-ratingIcon"
                                            fullSymbol="fa fa-star text-sm"
                                            fractions={2}
                                            initialRating={product?.reviews_avg_rating}
                                            quiet={true}
                                            readonly
                                        />
                                        {/* </Tippy> */}
                                        <div className="ml-2 mt-1">
                                            <p className="font-Poppins text-mutedText text-3.25">{product?.reviews_count} Reviews</p>
                                        </div>
                                    </div>


                                    {product && <p className="font-DMSans text-topBarTextColor text-3.25 mt-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: product.short_description }} />}


                                    <hr className="mt-3 mb-3" />


                                    <div className="mt-4">
                                        <div className="flex items-center">
                                            <p className="text-sm font-semibold font-Poppins">SKU:</p>
                                            {product && <p className="text-base font-DMSans ml-25">{product?.SKU}</p>}
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-sm font-semibold font-Poppins">Availability:</p>
                                            {/* {product && <p className="text-base font-DMSans ml-12">{product?.stock > 0 ? 'In stock' : 'Out of stock'}</p>} */}
                                            {
                                                product?.is_variable ? (
                                                    <>
                                                        {
                                                            productVariationId < 0 && (
                                                                <p className="text-base font-DMSans ml-12">Select both Varient</p>
                                                            )
                                                        }
                                                        {
                                                            productVariationId == null && (
                                                                <p className="text-base font-DMSans ml-12">Out of stock</p>
                                                            )
                                                        }
                                                        {
                                                            productVariationId > 0 && (
                                                                <>
                                                                    {
                                                                        product?.stock > 0 && variantProductVarientStock > 0 && product?.in_stock == true ? (
                                                                            <p className="text-base font-DMSans ml-12">In stock</p>
                                                                        ) : (
                                                                            <p className="text-base font-DMSans ml-12">Out of stock</p>
                                                                        )
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                ) : (
                                                    <>
                                                        {
                                                            product?.stock > 0 && product?.in_stock == true ? (
                                                                <p className="text-base font-DMSans ml-12">In stock</p>
                                                            ) : (
                                                                <p className="text-base font-DMSans ml-12">Out of stock</p>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-sm font-semibold font-Poppins">Brand:</p>
                                            {product && <Link className="text-base font-DMSans ml-22 text-logobarElementBG" to={`/brand/${product?.brand?.slug}`}>{product?.brand?.name}</Link>}
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-sm font-semibold font-Poppins">Category:</p>
                                            {product && <Link className="text-base font-DMSans ml-15 text-logobarElementBG" to={`/category/${product?.product_category?.slug}`}>{product?.product_category?.name}</Link>}
                                        </div>
                                        <div className="flex items-center hidden">
                                            <p className="text-sm font-semibold font-Poppins">Main Material:</p>
                                            <p className="text-base font-DMSans ml-7.75">Nylon</p>
                                        </div>
                                    </div>


                                    {
                                        product?.variables && Object.entries(product?.variables).map(([key, value], index) => (
                                            <div className="flex mt-2 items-center" key={index}>
                                                <p className={`text-base font-Poppins font-semibold uppercase mt-2 ${key == "Size" ? "mr-9.75" : "mr-4"}`}>{key}: </p>
                                                <div className="flex flex-wrap">
                                                    {
                                                        value?.map((item, index) => (
                                                            <div className="flex justify-center items-center mr-2 cursor-pointer mt-2" key={index}
                                                                onClick={() => creatingProductVariationArray(item, key)}
                                                            >
                                                                {
                                                                    item?.thumbnails.length > 0 ? (
                                                                        <img
                                                                            src={item?.thumbnails[0].thumbnail}
                                                                            className={`h-8 w-8 border-1 object-contain ${productionVaritaionArrayForFrontend.includes(item?.value) ? "border-2 border-logobarElementBG" : ""}`}
                                                                            title={item?.value}
                                                                        />
                                                                    ) : (
                                                                        <div className={`h-8 px-3 flex border-1 justify-center items-center rounded ${productionVaritaionArrayForFrontend.includes(item?.value) ? "bg-logobarElementBG text-white" : ""}`}>
                                                                            <p
                                                                                className={`text-lg font-Poppins `}
                                                                            >
                                                                                {item?.product_option?.attributes?.value}
                                                                            </p>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }






                                    <div className="flex items-center mt-2 hidden">
                                        <p className="font-DMSans text-topBarTextColor text-sm">Color: </p>
                                        <div className="flex ml-8">
                                            <div className="h-6 w-6 xs:h-8 xs:w-8 mr-4" onClick={e => { console.log(e.currentTarget.style.backgroundColor) }}>
                                                <img src={ProductImage1} className="h-full w-full" alt="Products" />
                                            </div>
                                            <div className="h-6 w-6 xs:h-8 xs:w-8 mr-4">
                                                <img src={ProductImage2} className="h-full w-full" alt="Products" />
                                            </div>
                                            <div className="h-6 w-6 xs:h-8 xs:w-8 mr-4">
                                                <img src={ProductImage3} className="h-full w-full" alt="Products" />
                                            </div>
                                            <div className="h-6 w-6 xs:h-8 xs:w-8">
                                                <img src={ProductImage4} className="h-full w-full" alt="Products" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-center mt-6 hidden">
                                        <p className="font-DMSans text-topBarTextColor text-sm">Size: </p>
                                        <div className="flex md:ml-10 mt-2 md:mt-0">
                                            <p className="font-DMSans text-topBarTextColor border-1 px-3 xs:px-3.5 md:px-4 py-1 mr-2 hover:border-logobarElementBG hover:text-logobarElementBG cursor-pointer text-sm">S</p>
                                            <p className="font-DMSans text-topBarTextColor border-1 px-3 xs:px-3.5 md:px-4 py-1 mr-2 hover:border-logobarElementBG hover:text-logobarElementBG cursor-pointer text-sm">M</p>
                                            <p className="font-DMSans text-topBarTextColor border-1 px-3 xs:px-3.5 md:px-4 py-1 mr-2 hover:border-logobarElementBG hover:text-logobarElementBG cursor-pointer text-sm">L</p>
                                            <p className="font-DMSans text-topBarTextColor border-1 px-3 xs:px-3.5 md:px-4 py-1 mr-2 hover:border-logobarElementBG hover:text-logobarElementBG cursor-pointer text-sm">XL</p>
                                            <p className="font-DMSans text-topBarTextColor border-1 px-3 xs:px-3.5 md:px-4 py-1 hover:border-logobarElementBG hover:text-logobarElementBG cursor-pointer text-sm">XXL</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-12 gap-4 h-11 mt-8">

                                        <div className="col-span-5 md:col-span-4 border-1 rounded flex items-center px-2">
                                            <div className="w-9 h-7 bg-topBarBG flex items-center justify-center cursor-pointer" style={{ borderRadius: "50%" }} onClick={handlingDecreasingProductQuantity}>
                                                <BiMinus fontSize={18} color="#252525" />
                                            </div>

                                            <div className="w-1/2 pl-3">
                                                {numberOfProduct}
                                            </div>

                                            <div className="w-9 h-7 bg-topBarBG  flex items-center justify-center cursor-pointer" style={{ borderRadius: "50%" }} onClick={handlingIncreasingProductQuantity}>
                                                <BiPlus fontSize={18} color="#252525" />
                                            </div>
                                        </div>

                                        {
                                            product?.is_variable ? (
                                                <div>

                                                    {
                                                        productVariationId < 0 && (
                                                            <button className="w-36 h-9.25 bg-logobarElementBG flex justify-center items-center font-Poppins font-semibold text-sm text-white mr-2" disabled>
                                                                <ImSpinner9 className="animate-spin" size={20} color='white' />
                                                            </button>
                                                        )
                                                    }

                                                    {
                                                        productVariationId == null && (
                                                            <button className="w-36 h-9.25 bg-red-700 flex justify-center items-center font-Poppins font-semibold text-sm text-white mr-2" disabled>
                                                                <p>Out of Stock</p>
                                                            </button>
                                                        )
                                                    }

                                                    {
                                                        productVariationId > 0 && (
                                                            <div>
                                                                {
                                                                    product?.stock > 0 && variantProductVarientStock > 0 && product?.in_stock == true ? (
                                                                        <button
                                                                            onClick={() => { handleAddingProductInCart(product); width > 640 ? dispatch(openingCartSideBar()) : dispatch(openAddedToCartNotificationModal()) }} className="w-36 h-9.25 bg-logobarElementBG flex justify-center items-center font-Poppins font-semibold text-sm text-white mr-2" >
                                                                            <p>Buy Now</p>
                                                                        </button>
                                                                    ) : (
                                                                        <button className="w-36 h-9.25 bg-red-700 flex justify-center items-center font-Poppins font-semibold text-sm text-white mr-2" disabled>
                                                                            <p>Out of Stock</p>
                                                                        </button>
                                                                    )
                                                                }

                                                            </div>


                                                        )
                                                    }
                                                </div>
                                            ) : (
                                                <div>
                                                    {
                                                        product?.stock > 0 && product?.in_stock == true ? (
                                                            <button onClick={() => { handleAddingProductInCart(product); width > 640 ? dispatch(openingCartSideBar()) : dispatch(openAddedToCartNotificationModal()) }} className="w-36 h-9.25 bg-logobarElementBG flex justify-center items-center font-Poppins font-semibold text-sm text-white mr-2" >
                                                                <p>Buy Now</p>
                                                            </button>
                                                        ) : (
                                                            <button className="w-36 h-9.25 bg-red-700 flex justify-center items-center font-Poppins font-semibold text-sm text-white mr-2" disabled>
                                                                <p>Out of Stock</p>
                                                            </button>
                                                        )
                                                    }

                                                </div>
                                            )
                                        }


                                    </div>


                                    <div className="flex mt-8">
                                        <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                            <FaFacebookF />
                                        </button>
                                        <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                            <FaTwitter />
                                        </button>
                                        <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                            <FaWhatsapp />
                                        </button>
                                        <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                            <FaInstagram />
                                        </button>
                                        <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                            <FaPinterestP />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <SliderDescriptionLoader />
                            )
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default TestModal
