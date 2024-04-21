import React, { useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addingProductInWishListArray, settingNumberOfWishListItems } from "../../../../ReduxStore/WishListSystem/WishListStore"
import { closingAndOpeningOfSignInModal } from "../../../../ReduxStore/LogInFolder/UserInfo"
import { addingProduct, calculatingTotalCartProducts, calculatingTotalPrice, openingCartSideBar } from "../../../../ReduxStore/CartSystem/CartStore"


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, height: 30, width: 30, borderRadius: 15, background: "#eeeeee", display: "flex", justifyContent: "center", alignItems: "center", color: "#999999" }}
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
    // console.log(props)
    return (
        <div
            className={className}
            style={{ ...style, height: 30, width: 30, borderRadius: 15, background: "#eeeeee", display: "flex", justifyContent: "center", alignItems: "center", color: "#999999" }}
            onClick={onClick}
        >
            <div style={{ fontSize: 17 }} className="custom-arrow-icon-div">
                <i className="fas fa-angle-left custom-arrow-icon"></i>
            </div>
        </div>
    );
}


const MultiRowCarousel = ({ products }) => {

    useEffect(() => {
        console.log("-===================================")
        console.log(products)
        console.log("-===================================")
    }, [])

    const settings = {
        centerMode: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        // appendDots: (dots) => <ul>{dots}</ul>,
        // customPaging: (i) => (
        //     <div className="ft-slick__dots--custom">
        //     </div>
        // ),
        autoplay: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        rows: 3,
        slidesPerRow: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                }
            }
        ]
    }

    const dispatch = useDispatch()


    //adding product in wishlist

    const { token } = useSelector(state => state.authInfo)
    const { wishListArray } = useSelector(state => state.wishList)
    // const [wishListAddingDone, setWishListAddingDone] = useState(false)

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


    //adding product in the cart and making the cart button red for those products

    const { cartArray } = useSelector(state => state.testCart)

    const handleAddingProductInCart = (item) => {
        // console.log(item)
        const modifiedProductObjectWithQuantity = { ...item, productQuantity: 1, type: "product", groupId: "", variantData: null }
        dispatch(addingProduct(modifiedProductObjectWithQuantity))
        dispatch(calculatingTotalPrice())
        dispatch(calculatingTotalCartProducts())
    }





    return (
        <div className="multiRow-carousel">
            <Slider {...settings}>
                {
                    products?.map((item, index) => (
                        <div key={index}>
                            <div className="flex border-1 p-5 md:mr-1 mt-5 items-center">
                                <div className="h-40 flex justify-center items-center bg-topBarBG border-1 hover:border-mutedText border-transparent hover:shadow-lg transition-all ease-linear duration-300" style={{ width: "40%" }}>
                                    <div className="h-full w-full flex justify-center items-center transform scale-101 hover:scale-102 transition-all ease-linear duration-300">
                                        <img src={item.thumbnail} alt="Products" />
                                    </div>
                                </div>
                                <div className="ml-5" style={{ width: "56%" }}>
                                    <Link to={`/category/${item.product_category.slug}`} className="text-xs text-commonCarouselMutedText font-DMSans hover:text-topBarTextColor">{item.product_category.name}</Link>
                                    <Link to={`/product/${item.slug}`} className="text-sm text-topBarTextColor font-semibold font-Poppins hover:text-logobarElementBG mt-2 line-clamp-2">{item.name}</Link>
                                    <Rating
                                        emptySymbol="fa fa-star-o text-sm text-ratingIcon"
                                        fullSymbol="fa fa-star text-sm"
                                        fractions={2}
                                        initialRating={item.reviews_avg_rating}
                                        quiet={true}
                                        readonly
                                    />
                                    {/* <LinesEllipsis
                                        text={`${item.name}`}
                                        maxLine="2"
                                        ellipsis="..."
                                        className="text-sm text-topBarTextColor font-semibold font-Poppins hover:text-logobarElementBG mt-2"
                                    /> */}
                                    {/* <Tippy content="4.00" placement="right">
                                        <span className="mb-1 inline-block multiRow-carousel">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="far fa-star"></i>
                                        </span>
                                    </Tippy> */}
                                    <p className="text-xl text-logobarElementBG font-semibold font-Poppins mb-2">Tk. {item.selling_price}</p>
                                    <div className="ml-auto flex">
                                        {/* <button className="w-7.5 h-7.5 bg-timeBG rounded-2.5xl flex justify-center items-center mr-4 hover:bg-logobarElementBG group">
                                            <i className="far fa-heart group-hover:text-white"></i>
                                        </button> */}


                                        {
                                            wishListArray.findIndex(itemInWishList => itemInWishList.product_id == item.id) == -1 ? (
                                                <button className="w-7.5 h-7.5 bg-timeBG rounded-2.5xl flex justify-center items-center mr-4 hover:bg-logobarElementBG group" onClick={() => handleAddingProductInWishlist(item)}>
                                                    <i className="far fa-heart group-hover:text-white"></i>
                                                </button>
                                            ) : (
                                                <button className="w-7.5 h-7.5 bg-logobarElementBG rounded-2.5xl flex justify-center items-center mr-4" onClick={() => handleAddingProductInWishlist(item)}>
                                                    <i className="far fa-heart" style={{ color: "white" }}></i>
                                                </button>
                                            )
                                        }

                                        {
                                            cartArray.findIndex(itemInCart => itemInCart.productId == item.id) == -1 ? (
                                                <div>
                                                    {
                                                        item.is_variable ? (
                                                            <Link to={`/product/${item.slug}`} className="w-7.5 h-7.5 bg-timeBG rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG group" target="_blank">
                                                                <i className="far fa-shopping-bag group-hover:text-white"></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="w-7.5 h-7.5 bg-timeBG rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG group" onClick={() => { handleAddingProductInCart(item); dispatch(openingCartSideBar()) }}>
                                                                <i className="far fa-shopping-bag group-hover:text-white"></i>
                                                            </button>
                                                        )
                                                    }

                                                </div>
                                            ) : (
                                                <div>

                                                    {
                                                        item.is_variable ? (
                                                            <Link to={`/product/${item.slug}`} className="w-7.5 h-7.5 bg-logobarElementBG rounded-2.5xl flex justify-center items-center" target="_blank">
                                                                <i className="far fa-shopping-bag" style={{ color: "white" }}></i>
                                                            </Link>
                                                        ) : (
                                                            <button className="w-7.5 h-7.5 bg-logobarElementBG rounded-2.5xl flex justify-center items-center" onClick={() => { handleAddingProductInCart(item); dispatch(openingCartSideBar()) }}>
                                                                <i className="far fa-shopping-bag" style={{ color: "white" }}></i>
                                                            </button>
                                                        )
                                                    }


                                                </div>
                                            )
                                        }


                                        {/* <button className="w-7.5 h-7.5 bg-timeBG rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG group">
                                            <i className="far fa-shopping-bag group-hover:text-white"></i>
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default MultiRowCarousel
