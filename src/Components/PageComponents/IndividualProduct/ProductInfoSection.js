import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaWhatsapp } from "react-icons/fa"
import { BiMinus, BiPlus } from "react-icons/bi"
import Rating from "react-rating"
import Ruler from "../../../Assets/Images/IndividualProduct/ruler.png"
import SizeChartModal from './SizeChartModal';
import { FaShare } from "react-icons/fa"
import { ImSpinner9 } from "react-icons/im"

import { useDispatch, useSelector } from "react-redux"
import { addingProduct, calculatingTotalPrice, calculatingTotalCartProducts, openingCartSideBar, increasingQuantityOfProductBeforeAddingToCart, openAddedToCartNotificationModal } from "../../../ReduxStore/CartSystem/CartStore"
import { useHistory, useParams } from 'react-router';

import ShippingLogo from "../../../Assets/Images/IndividualProduct/ShippingLogo.png"
import OriginalLogo from "../../../Assets/Images/IndividualProduct/OriginalLogo.png"
import RefundLogo from "../../../Assets/Images/IndividualProduct/RefundLogo.png"

import renderHTML from 'react-render-html';


import { Link } from 'react-router-dom';
import axios from 'axios';
import { addingProductInWishListArray, settingNumberOfWishListItems } from "../../../ReduxStore/WishListSystem/WishListStore"
import { closingAndOpeningOfSignInModal } from "../../../ReduxStore/LogInFolder/UserInfo"


import SliderImage from 'react-zoom-slider';

import ImageGallary from './ImageGallary';

import { CarouselLoader, ProductNameLoader, ReviewLoader, ProductGeneralInfoLoader, ProductPriceLoader } from "../../../SkeletonLoaders/IndividualProductPageLoader"

import UseWindowDimensionsHook from '../../ReuseableComponents/UseWindowDimensionsHook';


const ProductInfoSection = (props) => {

    const { token } = useSelector(state => state.authInfo)
    const { wishListArray } = useSelector(state => state.wishList)

    const { cartArray } = useSelector(state => state.testCart)

    const { height, width } = UseWindowDimensionsHook();

    useEffect(() => {
        console.log(cartArray)
    }, [])


    const handleAddingProductInWishlist = item => {
        console.log(item)
        if (token != null) {

            //sending product to wishlist
            axios.post("/customer/wishlists", {
                product_id: item.id
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log(response)
                axios.get("/customer/wishlists", {
                    headers: {
                        Authorization: "Bearer " + token,
                        Accept: 'application/json',
                    }
                }).then(response => {
                    console.log(response)
                    dispatch(addingProductInWishListArray(response.data))
                    dispatch(settingNumberOfWishListItems(response.data.length))
                }).catch(errors => {
                    console.log(errors.response)
                })
            }).catch(errors => {
                console.log(errors.response)
            })

        } else {
            dispatch(closingAndOpeningOfSignInModal())
        }

    }

    let history = useHistory()

    const { slug } = useParams()

    const { appearances } = props

    const [product, setProduct] = useState(null)
    const [productVariation, setProductVariation] = useState([])
    const [productionVaritaionArrayForAxios, setProductionVaritaionArrayForAxios] = useState([])

    const [productionVaritaionArrayForFrontend, setProductionVaritaionArrayForFrontend] = useState([])

    const [productVariationId, setProductVariationId] = useState(null)

    const [numberOfProduct, setNumberOfProduct] = useState(1)


    // const [variantProductMainStock, setVariantProductMainStock] = useState(null)
    const [variantProductVarientStock, setVariantProductVarientStock] = useState(null)




    useEffect(() => {
        // console.log("=================+++++++++++++++++++++", product)

    }, [product])

    useEffect(() => {
        axios.get(`/products/${slug}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            console.log(response);
            setProduct(response.data);
            setNumberOfProduct(1)
            if (response.data?.selected_variable) {
                let temp = response.data?.selected_variable?.attributes?.map(values => values.value)
                let productVariationTemp = []
                response.data?.selected_variable?.attributes?.forEach(values => {
                    let obj = { [values.attribute_id]: values.value }
                    productVariationTemp.push(obj)
                })
                console.log(productVariationTemp)
                setProductVariation(productVariationTemp)
                console.log(temp)
                let product = cartArray.filter(item => item.productGroupId == response.data?.selected_variable?.id)
                if (product.length > 0) {
                    setNumberOfProduct(product[0].productQuantity)
                }
                console.log(product)
                setProductionVaritaionArrayForFrontend(temp)
                setProductVariationId(response.data?.selected_variable?.id)
                setVariantProductVarientStock(response.data?.selected_variable?.stock)
            } else {
                let product = cartArray.filter(item => item.productId == response.data?.id)
                if (product.length > 0) {
                    setNumberOfProduct(product[0].productQuantity)
                }
            }

        }).catch(error => {
            console.log(error);
        })
    }, [slug])

    useEffect(() => {
        if (product != null && cartArray.length > 0) {
            if (product?.selected_variable) {
                let productVariation = cartArray.filter(item => item.productGroupId == product?.selected_variable?.id)
                console.log(productVariation[0])
                if (productVariation.length > 0) {
                    setNumberOfProduct(productVariation[0]?.productQuantity)
                }
            } else {
                let productNoVariation = cartArray.filter(item => item.productId == product?.id)
                if (productNoVariation.length > 0) {
                    setNumberOfProduct(productNoVariation[0]?.productQuantity)
                }
            }
        }

    }, [cartArray, product])

    const [productImages, setProductImages] = React.useState([]);

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

    const { setOpenTab } = props;

    // React.useEffect(() => {
    //     setProductImages([])
    //     setProductImages(prevState => [...prevState, product?.thumbnail])

    //     product?.images?.map((item, index) => {
    //         setProductImages(prevState => [...prevState, item.product_image[0].image])
    //     })
    // }, [product]);


    const [newSliderImage, setNewSliderImage] = useState([])

    React.useEffect(() => {
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

    }, [product, productionVaritaionArrayForFrontend]);

    React.useEffect(() => {
        // console.log("++++++++++++++++++++++++++++++++++++", newSliderImage);
    }, [newSliderImage])

    const settings = {
        customPaging: function (i) {
            return (
                <div className="w-3/4 h-3/4">
                    <img src={productImages[i]} alt="Products Demo" className="h-full w-full object-contain" />
                </div>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const dispatch = useDispatch()

    const handleAddingProductInCart = (item) => {
        console.log(item)
        if (item?.is_variable == false) {
            const modifiedProductObjectWithQuantity = { ...item, productQuantity: numberOfProduct, type: "product", groupId: "", variantData: null, outOfStock: false }
            dispatch(addingProduct(modifiedProductObjectWithQuantity))
            dispatch(calculatingTotalPrice())
            dispatch(calculatingTotalCartProducts())
        }

        if (item?.is_variable == true && productVariationId != null) {
            const modifiedProductObjectWithQuantity = { ...item, productQuantity: numberOfProduct, type: "product_group", groupId: productVariationId, variantData: item?.selected_variable, allVariants: item?.variables?.Color, outOfStock: false }
            dispatch(addingProduct(modifiedProductObjectWithQuantity))
            dispatch(calculatingTotalPrice())
            dispatch(calculatingTotalCartProducts())
        }

    }

    useEffect(() => {
        console.log(productVariation)
    }, [productVariation])

    useEffect(() => {
        console.log(productionVaritaionArrayForFrontend)
    }, [productionVaritaionArrayForFrontend])


    const [requestQueue, setRequestQueue] = useState([])

    const creatingProductVariationArray = (e, item, attributeName) => {
        if (requestQueue.length == 0) {
            setRequestQueue([1])
            console.log(item)
            console.log(productVariation)
            let testArray = []
            testArray = [...productVariation]

            console.log(testArray)

            setProductVariationId(-1)

            // console.log(testArray)

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

            console.log(testArray)

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
                history.push(`/product/${response.data.slug}`)
                setRequestQueue([])
                // setProductVariationId(response.data.id)
                // setVariantProductVarientStock(response.data?.stock)
                // setNumberOfProduct(1)
                // setVariationButton(false)
            }).catch(errors => {
                console.log(errors.response)
                setProductVariationId(null)
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
    //             history.push(`/product/${response.data.slug}`)
    //             setProductVariationId(response.data.id)
    //             setVariantProductVarientStock(response.data?.stock)
    //             setNumberOfProduct(1)
    //             setVariationButton(false)
    //         }).catch(errors => {
    //             console.log(errors.response)
    //             setProductVariationId(null)
    //             setVariantProductVarientStock(null)
    //         })
    //     }

    // }, [productionVaritaionArrayForAxios])

    useEffect(() => {
        console.log(variantProductVarientStock)
    }, [variantProductVarientStock])

    // useEffect(() => {
    //     console.log(product?.stock)
    // })

    const [modal, setModal] = useState(false)
    const [sizeData, setSizeData] = useState(null)


    return (
        <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                <div className="md:col-span-3 individual-product">

                    {
                        newSliderImage.length > 0 ? (
                            <ImageGallary
                                data={newSliderImage}
                                width="98%"
                                showDescription={false}
                                direction="right"
                            />
                        ) : <CarouselLoader />
                    }


                </div>

                <div className="md:col-span-6">
                    {/* <p className="text-2xl text-topBarTextColor font-Poppins font-bold mb-4.75">{product?.name}</p> */}

                    {/* <ProductNameLoader /> */}

                    {
                        product ? <p className="text-2xl text-topBarTextColor font-Poppins font-bold mb-4.75">{product?.name}</p> : <ProductNameLoader />
                    }

                    <div className="flex items-center mb-7.5">
                        {/* <Tippy content="4.00" placement="top"> */}
                        <Rating
                            emptySymbol="fa fa-star-o text-sm text-ratingIcon"
                            fullSymbol="fa fa-star text-sm"
                            fractions={2}
                            initialRating={product?.reviews_avg_rating}
                            quiet={true}
                            readonly
                        />
                        {/* </Tippy> */}
                        {/* <a href="#link3" onClick={() => setOpenTab(3)} className="text-logobarElementBG text-sm font-Poppins ml-3.25">{`(${product?.reviews_count} reviews)`}</a> */}
                        {
                            product ? <a href="#link3" onClick={() => setOpenTab(3)} className="text-logobarElementBG text-sm font-Poppins ml-3.25">{`(${product?.reviews_count} reviews)`}</a> : <ReviewLoader />
                        }
                    </div>

                    <div className="flex items-center justify-between">
                        {
                            product ? (
                                // <ProductPriceLoader />
                                <div className='flex items-center'>
                                    {product?.price > product?.selling_price ? <strike className="text-base text-mutedText font-semibold font-Poppins mr-2">Tk. {product?.price}</strike> : ''}
                                    <p className="text-2xl text-logobarElementBG font-Poppins font-semibold">Tk. {product?.selling_price}</p>
                                </div>
                            ) : (
                                // <div className='flex items-center'>
                                //     {product?.price > product?.selling_price ? <strike className="text-base text-mutedText font-semibold font-Poppins">Tk. {product?.price}</strike> : ''}
                                //     <p className="text-2xl text-logobarElementBG font-Poppins font-semibold ml-2">Tk. {product?.selling_price}</p>
                                // </div>
                                <ProductPriceLoader />
                            )
                        }
                        {/* <div className='flex items-center'>
                            {product?.price > product?.selling_price ? <strike className="text-base text-mutedText font-semibold font-Poppins">Tk. {product?.price}</strike> : ''}
                            <p className="text-2xl text-logobarElementBG font-Poppins font-semibold ml-2">Tk. {product?.selling_price}</p>
                        </div> */}

                        {/* <div className="flex ml-15.5">
                            <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                <FaFacebookF className="mr-5" />
                            </button>
                            <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                <FaTwitter className="mr-5" />
                            </button>
                            <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                <FaWhatsapp className="mr-5" />
                            </button>
                            <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                <FaInstagram className="mr-5" />
                            </button>
                            <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                <FaPinterestP className="mr-5" />
                            </button>
                        </div> */}
                        <div className='mr-10'>
                            <FaShare color='#e5371b' size={20} />
                        </div>
                    </div>

                    {
                        product ? (
                            <div className="mt-9">
                                <div className="flex items-center">
                                    <p className="text-sm font-semibold font-Poppins">SKU:</p>
                                    <p className="text-base font-DMSans ml-25">{product?.SKU}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm font-semibold font-Poppins">Availability:</p>
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
                                    {/* <p className="text-base font-DMSans ml-22">{product.brand && <Link to={`/brand/${product.brand.slug}`}>{product?.brand?.name}</Link>}</p> */}
                                    <Link to={`/brand/${product?.brand?.slug}`} className="text-base font-DMSans ml-22 text-logobarElementBG">{product?.brand?.name}</Link>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm font-semibold font-Poppins">Category:</p>
                                    <Link to={`/category/${product?.product_category?.slug}`} className="text-base font-DMSans ml-15 text-logobarElementBG">{product?.product_category?.name}</Link>
                                </div>
                                {
                                    product?.product_category?.chart && (
                                        <div className="flex items-center">
                                            <p className="text-sm font-semibold font-Poppins">Size Chart:</p>
                                            <img src={Ruler} className='ml-14 cursor-pointer' onClick={() => { setModal(true); setSizeData(product?.product_category?.chart) }} />
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <ProductGeneralInfoLoader />
                        )
                    }

                    {
                        product?.variables && Object.entries(product?.variables)?.map(([key, value], index) => (
                            <div className="flex mt-2 items-center" key={index}>
                                <p className={`text-base font-Poppins font-semibold uppercase mt-2 ${key == "Size" ? "mr-9.75" : "mr-4"}`}>{key}: </p>
                                <div className="flex flex-wrap">
                                    {
                                        value?.map((item, index) => (
                                            <button className="flex justify-center items-center mr-2 cursor-pointer mt-2" key={index} onClick={(e) => creatingProductVariationArray(e, item, key)}>
                                                {
                                                    item?.thumbnails.length > 0 ? (
                                                        <img
                                                            src={item?.thumbnails[0].thumbnail}
                                                            className={`w-12.5 h-12.5 border-1 object-contain ${productionVaritaionArrayForFrontend.includes(item?.value) ? "border-2 border-logobarElementBG" : ""}`}
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
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }

                    <div className="mt-9.75 flex">
                        <div className="w-25.25 h-9.25 bg-topBarBG flex justify-between items-center px-2 font-Poppins font-semibold text-sm mr-2">
                            <BiMinus className="cursor-pointer" onClick={handlingDecreasingProductQuantity} />
                            <p>{numberOfProduct}</p>
                            <BiPlus className="cursor-pointer" onClick={() => handlingIncreasingProductQuantity(product)} />
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

                        {/* <div className="h-9.25 w-9.25 bg-topBarBG flex justify-center items-center">
                            <i className="far fa-heart" style={{ color: "black" }}></i>
                        </div> */}

                        {
                            wishListArray.findIndex(itemInWishList => itemInWishList.product_id == product?.id) == -1 ? (
                                <button className="w-9.25 h-9.25 bg-timeBG  flex justify-center items-center mr-4 hover:bg-logobarElementBG group product-info" onClick={() => handleAddingProductInWishlist(product)}>
                                    <i className="far fa-heart group-hover:text-white"></i>
                                </button>
                            ) : (
                                <button className="w-9.25 h-9.25 bg-logobarElementBG  flex justify-center items-center mr-4" onClick={() => handleAddingProductInWishlist(product)}>
                                    <i className="far fa-heart" style={{ color: "white" }}></i>
                                </button>
                            )
                        }

                    </div>

                    <hr className="my-6" />

                    <div className="">
                        <p className="text-base font-DMSans" dangerouslySetInnerHTML={{ __html: product?.short_description }} />
                    </div>

                </div>

                <div className="md:col-span-3">

                    {/* {appearances?.filter(item => item.key === 'sidebar').map((data, index) => (<>{renderHTML(data.value)}</>))} */}
                    {appearances?.filter(item => item.key === 'sidebar').map((data, index) => (<div dangerouslySetInnerHTML={{ __html: data?.value }} />))}


                    <div className="h-32.75 bg-topBarBG p-6 mt-5 flex items-center">
                        <div className="w-12.5 h-12.5 bg-white flex items-center justify-center pt-2" style={{ borderRadius: "50%" }}>
                            <img src={product?.store?.logo} className="w-3/4 h-3/4 object-contain" />
                        </div>
                        <div className="ml-4">
                            <p className="font-Poppins text-sm">Sold by</p>
                            <p className="font-Poppins text-base font-bold mt-4">{product?.store?.name}</p>
                            <div className="w-22 h-5.5 bg-logobarElementBG rounded-xl flex justify-center items-center mt-4">
                                <p className="font-Poppins text-xs font-semibold text-white"><Link to={`/store/${product?.store?.slug}`}>Go To Store</Link></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <SizeChartModal modal={modal} setModal={setModal} sizeData={sizeData} />
        </div>
    )
}

export default ProductInfoSection
