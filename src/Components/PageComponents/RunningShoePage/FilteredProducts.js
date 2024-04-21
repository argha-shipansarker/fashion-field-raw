import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";
import Rating from "react-rating";
import { ImSpinner9 } from "react-icons/im";

import TestModal from "../../ReuseableComponents/TestModal";

import { useDispatch, useSelector } from "react-redux";
import {
    addingProduct,
    calculatingTotalPrice,
    calculatingTotalCartProducts,
    openingCartSideBar,
} from "../../../ReduxStore/CartSystem/CartStore";

import {
    addingProductInWishListArray,
    settingNumberOfWishListItems,
} from "../../../ReduxStore/WishListSystem/WishListStore";
import {
    closingAndOpeningOfSignInModal,
    updateSearchingValue,
} from "../../../ReduxStore/LogInFolder/UserInfo";

const FilteredProducts = ({ products, loading }) => {
    const [modal, setModal] = useState(false);
    const [indexValue, setIndex] = useState(null);

    const [specficProduct, setSpecficProduct] = useState(null);

    const commonCarouselQuickViewHandle = (item, index) => {
        setModal(true);
        // setIndex(index)
        // console.log(item, index)
        setSpecficProduct(item);
    };

    const dispatch = useDispatch();

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

    const { cartArray } = useSelector((state) => state.testCart);

    const { token } = useSelector((state) => state.authInfo);
    const { wishListArray } = useSelector((state) => state.wishList);

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
                            dispatch(
                                addingProductInWishListArray(response.data)
                            );
                            dispatch(
                                settingNumberOfWishListItems(
                                    response.data.length
                                )
                            );
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

    return (
        <div className="argha">
            <div className="flex flex-wrap justify-center xxs:justify-between">
                {loading ? (
                    <>
                        {products?.map((item, index) => (
                            <div
                                className="flex justify-center md:justify-start transition-all ease-linear duration-300 mb-3 md:mb-10"
                                key={index}
                            >
                                <div className="w-67 xxs:w-40 xs:w-42 xs1:w-44 xs2:w-46 md:w-67">
                                    <div
                                        className="w-full h-83 xxs:h-48 xs:h-50.2 xs1:h-52 xs2:h-54 md:h-83 flex justify-center items-center bg-topBarBG relative border-1 hover:border-mutedText border-transparent hover:shadow-lg transition-all ease-linear duration-300 quickView-parent cursor-pointer overflow-hidden"
                                        onClick={() =>
                                            commonCarouselQuickViewHandle(
                                                item,
                                                index
                                            )
                                        }
                                    >
                                        <div className="quickView group">
                                            <p className="font-Poppins font-bold text-white text-base">
                                                Quick View
                                            </p>
                                        </div>
                                        <div
                                            className={`h-full w-full flex justify-center items-center transform scale-101 hover:scale-102 transition-all ease-linear duration-300 image-scale`}
                                        >
                                            <img
                                                src={item.thumbnail}
                                                alt="Section of different products"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-1 h-36 xxs:h-32 md:h-36 flex flex-col">
                                        <p className="md:mb-1">
                                            <span className="font-DMSans text-xs text-commonCarouselMutedText mb-3 hover:text-topBarTextColor">
                                                {item.product_category?.name}
                                            </span>
                                        </p>
                                        <Link
                                            className="font-Poppins font-semibold text-base xxs:text-sm md:text-base text-topBarTextColor hover:text-logobarElementBG line-clamp-2"
                                            to={`/product/${item.slug}`}
                                            onClick={() =>
                                                dispatch(
                                                    updateSearchingValue("")
                                                )
                                            }
                                        >
                                            {item.name}
                                        </Link>
                                        <div className="flex items-center mt-3">
                                            <div>
                                                {/* <Tippy content="4.00" placement="right"> */}
                                                <Rating
                                                    emptySymbol="fa fa-star-o text-sm text-ratingIcon"
                                                    fullSymbol="fa fa-star text-sm"
                                                    fractions={2}
                                                    initialRating={
                                                        item.reviews_avg_rating
                                                    }
                                                    quiet={true}
                                                    readonly
                                                />
                                                {/* </Tippy> */}
                                                <div className="flex items-center md:flex-col md:items-start lg:items-center  lg:flex-row">
                                                    <p className="font-Poppins text-base xxs:text-xs md:text-base font-semibold text-logobarElementBG">
                                                        TK. {item.selling_price}
                                                    </p>
                                                    {item.price >
                                                        item.selling_price && (
                                                        <strike className="font-Poppins text-xs xxs:text-tinyxl md:text-xs font-semibold text-mutedText ml-2 md:ml-0 lg:ml-2">
                                                            TK. {item.price}
                                                        </strike>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="ml-auto flex">
                                                {wishListArray.findIndex(
                                                    (itemInWishList) =>
                                                        itemInWishList.product_id ==
                                                        item.id
                                                ) == -1 ? (
                                                    <button
                                                        className="w-10 h-10 xxs:w-7 xxs:h-7 md:w-10 md:h-10 bg-timeBG rounded-2.5xl flex justify-center items-center mr-2 md:mr-4 hover:bg-logobarElementBG group"
                                                        onClick={() =>
                                                            handleAddingProductInWishlist(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <i className="far fa-heart group-hover:text-white"></i>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="w-10 h-10 xxs:w-7 xxs:h-7 md:w-10 md:h-10 bg-logobarElementBG rounded-2.5xl flex justify-center items-center mr-2 md:mr-4"
                                                        onClick={() =>
                                                            handleAddingProductInWishlist(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <i
                                                            className="far fa-heart"
                                                            style={{
                                                                color: "white",
                                                            }}
                                                        ></i>
                                                    </button>
                                                )}

                                                {/* {
                                                cartArray.findIndex(itemInCart => itemInCart.productId == item.id) == -1 ? (
                                                    <button className="w-10 h-10 bg-timeBG rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG group" onClick={() => handleAddingProductInCart(item)}>
                                                        <i className="far fa-shopping-bag group-hover:text-white"></i>
                                                    </button>
                                                ) : (
                                                    <button className="w-10 h-10 bg-logobarElementBG rounded-2.5xl flex justify-center items-center" onClick={() => handleAddingProductInCart(item)}>
                                                        <i className="far fa-shopping-bag" style={{ color: "white" }}></i>
                                                    </button>
                                                )
                                            } */}

                                                {cartArray.findIndex(
                                                    (itemInCart) =>
                                                        itemInCart.productId ==
                                                        item.id
                                                ) == -1 ? (
                                                    <div>
                                                        {item.is_variable ? (
                                                            <Link
                                                                to={`/product/${item.slug}`}
                                                                className="w-10 h-10 xxs:w-7 xxs:h-7 md:w-10 md:h-10 bg-timeBG rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG group mr-1 md:mr-0"
                                                                target="_blank"
                                                            >
                                                                <i className="far fa-shopping-bag group-hover:text-white"></i>
                                                            </Link>
                                                        ) : (
                                                            <button
                                                                className="w-10 h-10 xxs:w-7 xxs:h-7 md:w-10 md:h-10 bg-timeBG rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG group mr-1 md:mr-0"
                                                                onClick={() => {
                                                                    handleAddingProductInCart(
                                                                        item
                                                                    );
                                                                    dispatch(
                                                                        openingCartSideBar()
                                                                    );
                                                                }}
                                                            >
                                                                <i className="far fa-shopping-bag group-hover:text-white"></i>
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {item.is_variable ? (
                                                            <Link
                                                                to={`/product/${item.slug}`}
                                                                className="w-10 h-10 xxs:w-7 xxs:h-7 md:w-10 md:h-10 bg-logobarElementBG rounded-2.5xl flex justify-center items-center mr-1 md:mr-0"
                                                                target="_blank"
                                                            >
                                                                <i
                                                                    className="far fa-shopping-bag"
                                                                    style={{
                                                                        color: "white",
                                                                    }}
                                                                ></i>
                                                            </Link>
                                                        ) : (
                                                            <button
                                                                className="w-10 h-10 xxs:w-7 xxs:h-7 md:w-10 md:h-10 bg-logobarElementBG rounded-2.5xl flex justify-center items-center mr-1 md:mr-0"
                                                                onClick={() => {
                                                                    handleAddingProductInCart(
                                                                        item
                                                                    );
                                                                    dispatch(
                                                                        openingCartSideBar()
                                                                    );
                                                                }}
                                                            >
                                                                <i
                                                                    className="far fa-shopping-bag"
                                                                    style={{
                                                                        color: "white",
                                                                    }}
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
                        ))}
                    </>
                ) : (
                    <div className="w-full h-125 flex items-center justify-center">
                        <ImSpinner9
                            className="animate-spin"
                            size={40}
                            color="red"
                        />
                    </div>
                )}
            </div>
            {modal && (
                <TestModal
                    modal={modal}
                    setModal={setModal}
                    specficProduct={specficProduct}
                />
            )}
        </div>
    );
};

export default FilteredProducts;
