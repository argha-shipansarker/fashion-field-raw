import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Slider from "react-slick";
import ProgressBar from "@ramonak/react-progress-bar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Rating from "react-rating";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import "./carousel.css";

import TestModal from "./TestModal";

import { useDispatch, useSelector } from "react-redux";
import {
  addingProduct,
  calculatingTotalPrice,
  calculatingTotalCartProducts,
  openingCartSideBar,
} from "../../ReduxStore/CartSystem/CartStore";
import { closingAndOpeningOfSignInModal } from "../../ReduxStore/LogInFolder/UserInfo";
import {
  addingProductInWishListArray,
  settingNumberOfWishListItems,
} from "../../ReduxStore/WishListSystem/WishListStore";

import axios from "axios";
import { Link } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        height: 30,
        width: 30,
        borderRadius: 15,
        background: "#eeeeee",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#999999",
      }}
      onClick={onClick}
    >
      <div style={{ fontSize: 17 }} className="custom-arrow-icon-div">
        <i className="fas fa-angle-right custom-arrow-icon"></i>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick, data } = props;
  // console.log(props.data)
  return (
    <div
      className={className}
      style={{
        ...style,
        height: 30,
        width: 30,
        borderRadius: 15,
        background: "#eeeeee",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#999999",
      }}
      onClick={onClick}
    >
      <div style={{ fontSize: 17 }} className="custom-arrow-icon-div">
        <i className="fas fa-angle-left custom-arrow-icon"></i>
      </div>
    </div>
  );
}

const Carousel = forwardRef((props, forwardedRef) => {
  const {
    data,
    carouselType,
    slidesToShow,
    arrows,
    laptop,
    tab,
    mobile,
    dots,
    autoplay,
    centerMode,
    mobileArrow,
    desktopScroll,
    laptopScroll,
  } = props;

  // console.log(data);

  const commonCarouselRef = useRef(null);

  useImperativeHandle(forwardedRef, () => {
    return {
      nextButton: () => {
        commonCarouselRef.current.slickNext();
      },
      prevButton: () => {
        commonCarouselRef.current.slickPrev();
      },
    };
  });

  const settings = {
    centerMode: centerMode,
    dots: dots,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: desktopScroll,
    arrows: arrows,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => <div className="ft-slick__dots--custom"></div>,
    autoplay: autoplay,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: laptop,
          slidesToScroll: laptopScroll,
          infinite: true,
          dots: dots,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: tab,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: mobile,
          slidesToScroll: 1,
          arrows: mobileArrow,
        },
      },
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  const [modal, setModal] = useState(false);
  const [indexValue, setIndex] = useState(null);
  // const [scale, setScale] = useState("scale-101")

  const [specficProduct, setSpecficProduct] = useState(null);

  const commonCarouselQuickViewHandle = (item, index) => {
    setModal(true);
    // setIndex(index)
    setSpecficProduct(item);
    // console.log(item)
  };

  const dispatch = useDispatch();

  //adding product in the cart and making the cart button red for those products

  const { cartArray } = useSelector((state) => state.testCart);

  // useEffect(() => {
  //   // console.log(cartArray)
  // }, [cartArray]);

  const handleAddingProductInCart = (item) => {
    // console.log(item)
    const modifiedProductObjectWithQuantity = {
      ...item,
      productQuantity: 1,
      type: "product",
      groupId: "",
      variantData: null,
    };
    dispatch(addingProduct(modifiedProductObjectWithQuantity));
    dispatch(calculatingTotalPrice());
    dispatch(calculatingTotalCartProducts());
  };

  //adding product in wishlist

  const { token } = useSelector((state) => state.authInfo);
  const { wishListArray } = useSelector((state) => state.wishList);
  // const [wishListAddingDone, setWishListAddingDone] = useState(false)

  const handleAddingProductInWishlist = (item) => {
    console.log(item);
    if (token != null) {
      //sending product to wishlist
      axios
        .post(
          "/customer/wishlists",
          {
            product_id: item.id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          axios
            .get("/customer/wishlists", {
              headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
              },
            })
            .then((response) => {
              console.log(response);
              dispatch(addingProductInWishListArray(response.data));
              dispatch(settingNumberOfWishListItems(response.data.length));
            })
            .catch((errors) => {
              console.log(errors.response);
            });
        })
        .catch((errors) => {
          console.log(errors.response);
        });
    } else {
      dispatch(closingAndOpeningOfSignInModal());
    }
  };

  // useEffect(() => {

  //     if (token != null) {
  //         //getting product from wishlist

  //         axios.get("/customer/wishlists", {
  //             headers: {
  //                 Authorization: "Bearer " + token,
  //                 Accept: 'application/json',
  //             }
  //         }).then(response => {
  //             console.log(response)
  //             // setWishListAddingDone(prevState => prevState)
  //         }).catch(errors => {
  //             console.log(errors.response)
  //         })
  //     }

  // }, [wishListAddingDone, token])

  return (
    <>
      {carouselType === "mainCarousel" && (
        <Slider {...settings}>
          {data?.map((item, index) => (
            <div className="focus:outline-none" key={index}>
              <a href={item?.link ? item.link : '#'}>
                <img src={item?.image} alt="Hero Slider" />
              </a>
            </div>
          ))}
        </Slider>
      )}

      {carouselType === "dealsOfTheDay" && (
        <div>
          <Slider {...settings}>
            {data.map((item, index) => (
              <div key={index}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8 justify-items-center md:pr-7">
                  <div
                    className="flex h-82.5 justify-center border-1 hover:border-mutedText border-transparent hover:shadow-md transition-all ease-linear duration-300 relative quickView-parent cursor-pointer"
                    onClick={() => commonCarouselQuickViewHandle(item, index)}
                  >
                    <div className="quickView group">
                      <p className="font-Poppins font-bold text-white text-base">
                        Quick View
                      </p>
                    </div>
                    <div className="w-67 h-full flex justify-center items-center bg-topBarBG relative overflow-hidden">
                      <div className="transform scale-101 hover:scale-102 transition-all ease-linear duration-300 flex items-center">
                        <img
                          src={item.thumbnail}
                          alt="Deals of the Day Slider"
                        />
                      </div>
                    </div>
                    {/* <div className="w-9 h-9 bg-logobarElementBG absolute rounded-4.5 flex justify-center items-center top-4 right-4">
                                            <p className="font-Poppins text-white text-tinyxl font-semibold">{item.discount}%</p>
                                        </div> */}
                  </div>
                  <div className="flex flex-col px-2 md:px-0">
                    <p className="text-sliderText font-Poppins font-semibold text-base hover:text-logobarElementBG">
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </p>
                    <div className="flex items-center mb-3 md:mb-7">
                      {item?.price > item?.selling_price && (
                        <strike className="text-mutedText font-Poppins font-semibold text-xs mr-2">
                          TK.{item.price}
                        </strike>
                      )}
                      <p className="font-Poppins font-semibold text-logobarElementBG text-lg">
                        TK.{item.selling_price}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <p
                        className="font-DMSans text-sm text-sliderDescription line-clamp-8"
                        dangerouslySetInnerHTML={{
                          __html: item.short_description,
                        }}
                      />
                    </div>
                    <div className="mt-2 md:mt-auto">
                      <div className="flex mb-2 hidden">
                        <p className="font-DMSans text-sm font-semibold">
                          Available:{" "}
                          <span className="text-logobarElementBG">
                            {item.available}
                          </span>
                        </p>
                        <p className="font-DMSans text-sm font-semibold ml-auto">
                          sold:{" "}
                          <span className="text-logobarElementBG">
                            {item.sold}
                          </span>
                        </p>
                      </div>
                      {/* <ProgressBar completed={item.available} bgColor="#e5371b" baseBgColor="#eeeeee" isLabelVisible={false} height="12px" /> */}
                      <div className="flex items-center">
                        <div>
                          <p className="font-DMSans text-xl text-sliderText font-semibold">
                            Hurry Up!
                          </p>
                          <p className="font-DMSans text-xs text-sliderText font-semibold">
                            Offer ends in
                          </p>
                        </div>
                        <div className="ml-auto">
                          <div className="flex">
                            <div className="flex flex-col items-center mr-2">
                              <div className="w-9 h-9 bg-timeBG flex justify-center items-center rounded-2xl">
                                <p className="font-Poppins font-semibold text-sliderText text-xs">
                                  {item.hours}
                                </p>
                              </div>
                              <p className="font-Poppins font-medium text-tiny text-sliderDescription mt-2">
                                HOURS
                              </p>
                            </div>
                            <div className="flex flex-col items-center mr-2">
                              <div className="w-9 h-9 bg-timeBG flex justify-center items-center rounded-2xl">
                                <p className="font-Poppins font-semibold text-sliderText text-xs">
                                  {item.mins}
                                </p>
                              </div>
                              <p className="font-Poppins font-medium text-tiny text-sliderDescription mt-2">
                                MINS
                              </p>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-9 h-9 bg-timeBG flex justify-center items-center rounded-2xl">
                                <p className="font-Poppins font-semibold text-sliderText text-xs">
                                  {item.secs}
                                </p>
                              </div>
                              <p className="font-Poppins font-medium text-tiny text-sliderDescription mt-2">
                                SECS
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          {modal && (
            <TestModal
              modal={modal}
              setModal={setModal}
              specficProduct={specficProduct}
            />
          )}
        </div>
      )}

      {carouselType === "commonCarousel" && (
        <div>
          <Slider {...settings} ref={commonCarouselRef}>
            {data?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-center md:justify-start transition-all ease-linear duration-300">
                  <div className="w-67 xxs:w-40 xs:w-42 xs1:w-44 xs2:w-46 md:w-67">
                    <div
                      className="w-full h-83 xxs:h-48 xs:h-50.2 xs1:h-52 xs2:h-54 md:h-83 flex justify-center items-center bg-topBarBG relative border-1 hover:border-mutedText border-transparent hover:shadow-lg transition-all ease-linear duration-300 quickView-parent overflow-hidden cursor-pointer"
                      onClick={() => commonCarouselQuickViewHandle(item, index)}
                    >
                      <div className="quickView group">
                        <p className="font-Poppins font-bold text-white text-base">
                          Quick View
                        </p>
                      </div>
                      <div
                        className={`h-full w-full flex justify-center items-center transform scale-101 hover:scale-102 transition-all ease-linear duration-300 image-scale`}
                      >
                        {/* <img src={item.thumbnail} alt="Section of different products" /> */}
                        <LazyLoadImage
                          src={item?.thumbnail}
                          effect="blur"
                          alt="Section of different products"
                          afterLoad={() => console.log("image loaded")}
                        />
                      </div>

                      {item?.discount && (
                        <div className="w-9 h-9 bg-logobarElementBG absolute rounded-4.5 flex justify-center items-center top-4 right-4">
                          <p className="font-Poppins text-white text-tinyxl font-semibold">
                            {item?.discount}%
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-1 h-36 flex flex-col">
                      <p className="mb-1">
                        <Link to={`/category/${item?.product_category?.slug}`} target="_blank" className="font-DMSans text-xs text-commonCarouselMutedText mb-3 hover:text-topBarTextColor">
                          {item?.product_category?.name}
                        </Link>
                      </p>
                      {/* <p className="font-Poppins font-semibold text-base xxs:text-sm md:text-base text-topBarTextColor hover:text-logobarElementBG line-clamp-2"> */}
                      <Link className="font-Poppins font-semibold text-base xxs:text-sm md:text-base text-topBarTextColor hover:text-logobarElementBG line-clamp-2" to={`/product/${item?.slug}`}>
                        {item?.name}
                      </Link>
                      {/* </p> */}
                      <div className="flex items-center mt-3">
                        <div>
                          {/* <Tippy content="4.00" placement="right"> */}
                          <Rating
                            emptySymbol="fa fa-star-o text-sm xxs:text-tinyxl md:text-sm text-ratingIcon"
                            fullSymbol="fa fa-star text-sm xxs:text-tinyxl md:text-sm"
                            fractions={2}
                            initialRating={item?.reviews_avg_rating}
                            quiet={true}
                            readonly
                          />
                          {/* </Tippy> */}
                          <div className="flex items-center mr-2 flex-row xxs:flex-col lg:flex-row items-start">
                            <p className="font-Poppins text-base mr-2 font-semibold text-logobarElementBG">
                              TK. {item?.selling_price}
                            </p>
                            {item?.price > item?.selling_price && (
                              <strike className="font-Poppins text-xs font-semibold text-mutedText xxs:-ml-5 md:ml-0">
                                TK. {item?.price}
                              </strike>
                            )}
                          </div>
                        </div>
                        <div className="ml-auto flex">
                          {wishListArray.findIndex(
                            (itemInWishList) =>
                              itemInWishList?.product_id == item?.id
                          ) == -1 ? (
                            <button
                              className="w-10 h-10 xxs:w-8 xxs:h-8 md:w-10 md:h-10 bg-timeBG rounded-2.5xl flex justify-center items-center mr-2 hover:bg-logobarElementBG group"
                              onClick={() =>
                                handleAddingProductInWishlist(item)
                              }
                            >
                              <i className="far fa-heart group-hover:text-white"></i>
                            </button>
                          ) : (
                            <button
                              className="w-10 h-10 xxs:w-8 xxs:h-8 md:w-10 md:h-10 bg-logobarElementBG rounded-2.5xl flex justify-center items-center mr-2"
                              onClick={() =>
                                handleAddingProductInWishlist(item)
                              }
                            >
                              <i
                                className="far fa-heart"
                                style={{ color: "white" }}
                              ></i>
                            </button>
                          )}

                          {cartArray.findIndex(
                            (itemInCart) => itemInCart?.productId == item?.id
                          ) == -1 ? (
                            <div>
                              {item?.is_variable ? (
                                <button
                                  className="w-10 h-10 xxs:w-8 xxs:h-8 md:w-10 md:h-10 bg-timeBG rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG group mr-1 md:mr-0"
                                  onClick={() => commonCarouselQuickViewHandle(item, index)}
                                >
                                  <i className="far fa-shopping-bag group-hover:text-white"></i>
                                </button>
                              ) : (
                                <button
                                  className="w-10 h-10 xxs:w-8 xxs:h-8 md:w-10 md:h-10 bg-timeBG rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG group mr-1 md:mr-0"
                                  onClick={() => {
                                    handleAddingProductInCart(item);
                                    dispatch(openingCartSideBar());
                                  }}
                                >
                                  <i className="far fa-shopping-bag group-hover:text-white"></i>
                                </button>
                              )}
                            </div>
                          ) : (
                            <div>
                              {item?.is_variable ? (
                                <button
                                  className="w-10 h-10 xxs:w-8 xxs:h-8 md:w-10 md:h-10 bg-logobarElementBG rounded-2.5xl flex justify-center items-center mr-1 md:mr-0"
                                  onClick={() => commonCarouselQuickViewHandle(item, index)}
                                >
                                  <i
                                    className="far fa-shopping-bag"
                                    style={{ color: "white" }}
                                  ></i>
                                </button>
                              ) : (
                                <button
                                  className="w-10 h-10 xxs:w-8 xxs:h-8 md:w-10 md:h-10 bg-logobarElementBG rounded-2.5xl flex justify-center items-center mr-1 md:mr-0"
                                  onClick={() => {
                                    handleAddingProductInCart(item);
                                    dispatch(openingCartSideBar());
                                  }}
                                >
                                  <i
                                    className="far fa-shopping-bag"
                                    style={{ color: "white" }}
                                  ></i>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          {modal && (
            <TestModal
              modal={modal}
              setModal={setModal}
              specficProduct={specficProduct}
            />
          )}
        </div>
      )}

      {carouselType === "topBrand" && (
        <Slider {...settings}>
          {data?.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-center h-48 test">
                <img src={item.logo} alt="Top Brands" className="w-1/2" />

              </div>
            </div>
          ))}
        </Slider>
      )}

      {carouselType === "homeLifestyle" && (
        <Slider {...settings} ref={commonCarouselRef}>
          {data.map((item, index) => (
            <div key={index}>{item.child}</div>
          ))}
        </Slider>
      )}
    </>
  );
});

export default Carousel;
