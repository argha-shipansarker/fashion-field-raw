import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { urlHelper } from "../../../urlHelper";
import CompanyLogo from "../../../Assets/Images/CompanyLogo.png";
import CompanyName from "../../../Assets/Images/CompanyName.png";
// import Wishlisht from "../../../Assets/Images/wishlist.png"

import { BsWallet2 } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io";

import { BiShoppingBag, BiWalletAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

import Sidebar from "../../../PageLayout/Sidebar/Sidebar";

import SignUpSignInModal from "../../../PageLayout/SignUpSignInModal";
import {
    savingTokenValue,
    savingMobileNumber,
    closingAndOpeningOfSignInModal,
    savingAccountBalance,
    updateSearchingValue,
    setCustomerData
} from "../../../ReduxStore/LogInFolder/UserInfo";

import SidebarDynamic from "../../../PageLayout/Sidebar/SidebarDynamic";

import { IoMdMenu } from "react-icons/io";

const tokenFromLocalStorage = JSON.parse(
    localStorage.getItem("FFtoken") || "null"
);

const LogoBar = () => {
    const [wishlist, setWishlist] = useState(true);

    const [result, setResult] = useState(1);
    // const [cart, setCart] = useState(10)
    const { cartItem } = useSelector((state) => state.testCart);

    const { wishListItemNumber } = useSelector((state) => state.wishList);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(savingTokenValue(tokenFromLocalStorage));
    }, []);

    // useEffect(() => {
    //     console.log(window.location.href.indexOf("search"))
    // })

    const { token, mobileNumber, accountBalance, searchingValue } = useSelector(
        (state) => state.authInfo
    );

    const [searchValue, setSearchValue] = useState("");
    const [
        searchValueForShowingInInputField,
        setSearchValueForShowingInInputField,
    ] = useState("");
    const [searchData, setSearchData] = useState([]);
    // const [dropdown,setDropDown]=useState(hidden);

    const active =
        "container mx-auto pr-11 absolute visible opacity-100 translate-y-0 transition-all ease-linear duration-200";
    const hidden =
        "container mx-auto pr-11 absolute invisible opacity-0 transform translate-y-1 transition-all ease-linear duration-200";

    // const fetchSeach = () => {
    //     if (searchValue.length > 2) {
    //         axios
    //             .get("manage-search?terms=" + searchValue, {
    //                 headers: {
    //                     Accept: "application/json",
    //                     Authorization: token,
    //                 },
    //             })
    //             .then((res) => {
    //                 setSearchData(res.data);
    //             });
    //     }
    // };
    // useEffect(() => {
    //     // fetchSeach()
    // }, [searchValue]);

    useEffect(() => {
        if (
            searchData?.products?.length === 0 &&
            searchData?.categories?.length === 0 &&
            searchData?.subcategories?.length === 0 &&
            searchData?.product_categories?.length === 0 &&
            searchData?.brands?.length === 0 &&
            searchData?.stores?.length === 0
        ) {
            setResult(false);
        } else {
            setResult(true);
        }
    }, [searchData]);
    useEffect(() => {
        if (token != null) {
            // console.log(token)
            axios
                .get("/customer/profile", {
                    headers: {
                        Authorization: "Bearer " + token,
                        Accept: "application/json",
                    },
                })
                .then((response) => {
                    console.log(response);
                    dispatch(savingMobileNumber(response.data.phone));
                    dispatch(savingAccountBalance(response.data.balance));
                    dispatch(setCustomerData(response.data));
                })
                .catch((errors) => {
                    // console.log(errors.response)
                });
        }
    }, [token]);

    let location = useLocation();

    useEffect(() => {
        // console.log(token)
        // console.log(mobileNumber)
        setSearchValue("");
    }, [token, mobileNumber, location]);

    const [isOpen, setIsOpen] = useState(false);

    const closeSidebarWhenClickedOutside = (ref, hamburgerRef) => {
        // console.log("hello hello hello")
        // console.log(ref.current)

        // console.log(ref.current)
        function handleClickOutside(event) {
            // console.log(ref.current.contains(event.target))
            if (
                ref.current &&
                !ref.current.contains(event.target) &&
                !hamburgerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    };
    const closeSearchWhenClickedOutside = (ref) => {
        // console.log("hello", ref)
        // function handleClickOutside(event) {
        //     if (ref.current && !ref.current.contains(event.target)) {
        //         setSearchValue('')
        //     }
        // }
        // document.addEventListener("mousedown", handleClickOutside);
        // return () => {
        //     document.removeEventListener("mousedown", handleClickOutside);
        // };
    };

    const sidebarRef = useRef(null);
    const hamburgerRef = useRef(null);

    const clickRef = useRef(null);

    closeSearchWhenClickedOutside(clickRef);

    closeSidebarWhenClickedOutside(sidebarRef, hamburgerRef);

    const handleSearchBox = (e) => {
        dispatch(updateSearchingValue(e.target.value));
        if (window.location.href.indexOf("search") == -1) {
            history.push({
                pathname: "/search",
                state: { view: "desktopView" },
            });
            console.log("=================manto===============");
        }
        setSearchValue(e.target.value);
        setSearchValueForShowingInInputField(e.target.value);
    };

    return (
        <div className="container mx-auto px-4 h-16 flex items-center bg-white fixed -top-px md:static z-10 shadow-lg md:shadow-none">
            <div className="flex items-center w-full">
                <div className="flex items-center">
                    <Link to="/" className="w-20 xl:w-25 xl:h-16 mr-0 md:mr-4">
                        <div className="h-10 md:h-14 mt-1">
                            <img
                                src={CompanyLogo}
                                alt="Company Logo"
                                className="h-full"
                            />
                        </div>
                    </Link>
                    <Link to="/" className="w-56 h-8 mr-20 hidden sm:block">
                        <img src={CompanyName} alt="Company Name" />
                    </Link>
                </div>
                <div className="hidden lg:flex relative">
                    <input
                        type="text"
                        placeholder="What do you want to buy?"
                        className="w-60 h-12 xl:w-106 xl:h-12 px-7 border-2 focus:outline-none rounded-l border-r-0"
                        onChange={(e) => handleSearchBox(e)}
                        value={searchingValue}
                    />
                    <button className="h-12 w-20 bg-logobarElementBG hover:bg-menuHover font-Poppins font-semibold text-white flex justify-center items-center rounded-r">
                        <i className="fas fa-search"></i>
                    </button>

                    {/* <div ref={clickRef} className={`container mx-auto px-4 bg-white h-96 absolute z-50 top-12 overflow-y-scroll ${searchValue.length > 2 ? 'visible' : 'hidden'}`} style={{ boxShadow: "0px 20px 46px 0 rgba(0, 0, 0, 0.15)" }}>
                        <div className="flex flex-col px-5 h-full">


                            {searchValue && searchData.products && searchData.products.length > 0 ? (
                                <div className="mt-7.75 mb-7.75">
                                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Products</p>
                                    {searchData.products.map((item, index) => (
                                        <Link to={urlHelper(item.slug, 'product')} className="mt-3 block" onClick={() => setSearchValueForShowingInInputField(item.name)}><span className="menu-text">{item.name} (Style No: {item.style_no}, SKU: {item.SKU})</span></Link>
                                    ))}

                                </div>
                            ) : ''}
                            {searchValue && searchData.categories && searchData.categories.length > 0 ? (
                                <div className="mt-7.75 mb-7.75">
                                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Categories</p>
                                    {searchData.categories.map((item, index) => (
                                        <Link to={urlHelper(item.slug, 'category')} className="mt-3 block" onClick={() => setSearchValueForShowingInInputField(item.name)}><span className="menu-text">{item.name}</span></Link>
                                    ))}

                                </div>
                            ) : ""}
                            {searchValue && searchData.subcategories && searchData.subcategories.length > 0 ? (
                                <div className="mt-7.75 mb-7.75">
                                    <p className="font-Poppins font-bold text-topBarTextColor text-base">SubCategories</p>
                                    {searchData.subcategories.map((item, index) => (
                                        <Link to={urlHelper(item.slug, 'sub-category')} className="mt-3 block" onClick={() => setSearchValueForShowingInInputField(item.name)}><span className="menu-text">{item.name}</span></Link>
                                    ))}
                                </div>
                            ) : ''}
                            {searchValue && searchData.product_categories && searchData.product_categories.length > 0 ? (
                                <div className="mt-7.75 mb-7.75">
                                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Product Categories</p>
                                    {searchData.product_categories.map((item, index) => (
                                        <Link to={urlHelper(item.slug, 'product-category')} className="mt-3 block" onClick={() => setSearchValueForShowingInInputField(item.name)}><span className="menu-text">{item.name}</span></Link>
                                    ))}
                                </div>
                            ) : ''}
                            {searchValue && searchData.brands && searchData.brands.length > 0 ? (
                                <div className="mt-7.75 mb-7.75">
                                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Brands</p>
                                    {searchData.brands.map((item, index) => (
                                        <Link to={urlHelper(item.slug, 'brand')} className="mt-3 block" onClick={() => setSearchValueForShowingInInputField(item.name)}><span className="menu-text">{item.name}</span></Link>
                                    ))}
                                </div>
                            ) : ''}
                            {searchValue && searchData.stores && searchData.stores.length > 0 ? (
                                <div className="mt-7.75 mb-7.75">
                                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Stores</p>
                                    {searchData.stores.map((item, index) => (
                                        <Link to={urlHelper(item.slug, 'store')} className="mt-3 block" onClick={() => setSearchValueForShowingInInputField(item.name)}><span className="menu-text">{item.name}</span></Link>
                                    ))}
                                </div>
                            ) : ''}

                            {result ? "" :
                                <div className="flex items-center justify-center h-full">
                                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Not Available</p>
                                </div>
                            }
                        </div>
                    </div> */}
                </div>
                <div className="account-wishlist flex items-center ml-auto relative">
                    {window.location.href.indexOf("search") == -1 ? (
                        <i
                            className={`fas fa-search fa-lg md:hidden ${token ? "mr-4" : "mr-6"
                                }`}
                            onClick={() => history.push("/search")}
                        ></i>
                    ) : (
                        ""
                    )}

                    <div className="md:mr-3">
                        {token ? (
                            <Link
                                className="font-DMSans text-sm font-bold text-topBarTextColor hover:text-logobarElementBG cursor-pointer"
                                to="/customer/account-info"
                            >
                                {/* {mobileNumber} */}
                                <div className="flex items-center">
                                    <div className="text-2xl flex items-center mr-4 md:mr-0">
                                        <i className="far fa-user-circle"></i>
                                    </div>
                                    <p className="font-Poppins text-base font-semibold ml-2 hidden md:block">
                                        My Account
                                    </p>
                                </div>
                            </Link>
                        ) : (
                            <div
                                className="flex items-center text-topBarTextColor hover:text-logobarElementBG cursor-pointer pr-6"
                                onClick={() =>
                                    dispatch(closingAndOpeningOfSignInModal())
                                }
                            >
                                <div className="text-2xl flex items-center">
                                    <i className="far fa-user-circle"></i>
                                </div>
                                <p className="font-DMSans text-sm font-bold ml-2 hidden md:block uppercase">
                                    Register <br />
                                    Login
                                </p>
                            </div>
                        )}
                    </div>

                    {token ? (
                        <Link
                            to="/customer/account-info"
                            className="relative mr-6 cursor-pointer"
                        >
                            <BiWalletAlt
                                fontSize={30}
                                className="text-topBarTextColor hover:text-logobarElementBG"
                            />
                            <div
                                className="absolute px-1 bg-logobarElementBG rounded flex justify-center items-center"
                                style={{
                                    top: -8,
                                    right: accountBalance > 100 ? -24 : -10,
                                }}
                            >
                                <p className="text-white font-Poppins font-bold text-xs">
                                    {accountBalance}
                                </p>
                            </div>
                        </Link>
                    ) : (
                        ""
                    )}

                    {token ? (
                        <Link
                            to="/customer/wishlist"
                            className="relative mr-6 cursor-pointer"
                        >
                            <AiOutlineHeart
                                fontSize={30}
                                className="text-topBarTextColor hover:text-logobarElementBG"
                            />
                            <div
                                className="absolute w-4 h-4 bg-logobarElementBG rounded-lg flex justify-center items-center"
                                style={{ top: -4, right: -8 }}
                            >
                                <p className="text-white font-Poppins font-bold text-xs">
                                    {wishListItemNumber}
                                </p>
                            </div>
                        </Link>
                    ) : (
                        <div
                            to="/customer/wishlist"
                            className="relative mr-6 cursor-pointer"
                            onClick={() =>
                                dispatch(closingAndOpeningOfSignInModal())
                            }
                        >
                            <AiOutlineHeart
                                fontSize={30}
                                className="text-topBarTextColor hover:text-logobarElementBG"
                            />
                            <div
                                className="absolute w-4 h-4 bg-logobarElementBG rounded-lg flex justify-center items-center"
                                style={{ top: -4, right: -8 }}
                            >
                                <p className="text-white font-Poppins font-bold text-xs">
                                    {wishListItemNumber}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Responsive Menubar Starts */}

                    <button
                        className="flex flex-col h-10 w-10 justify-center items-center group md:hidden"
                        onClick={() => setIsOpen((prevState) => !prevState)}
                        ref={hamburgerRef}
                    >
                        <IoMdMenu size={35} color="#222222" />
                    </button>
                </div>
            </div>

            {/* Sidebar of Mobile Navigation */}

            {/* <Sidebar isOpen={isOpen} sidebarRef={sidebarRef} setIsOpen={setIsOpen} /> */}

            <SidebarDynamic
                isOpen={isOpen}
                sidebarRef={sidebarRef}
                setIsOpen={setIsOpen}
            />

            <div className="relative">
                {/* <div className="flex mt-2 lg:hidden mb-4">
                    <input type="text" placeholder="Search Product" className="w-4/5 h-12 px-7 border-2 focus:outline-none rounded-l border-r-0" onChange={e => { setSearchValue(e.target.value); setSearchValueForShowingInInputField(e.target.value) }} value={searchValueForShowingInInputField} />
                    <button className="h-12 w-1/5 bg-logobarElementBG font-Poppins font-semibold text-white flex justify-center items-center rounded-r cursor-pointer">
                        <i className="fas fa-search"></i>
                    </button>
                </div> */}

                <div
                    ref={clickRef}
                    className={`container mx-auto px-4 bg-white h-96 absolute z-50 top-12 overflow-y-scroll lg:hidden ${searchValue.length > 2 ? "visible" : "hidden"
                        }`}
                    style={{ boxShadow: "0px 20px 46px 0 rgba(0, 0, 0, 0.15)" }}
                >
                    <div className="flex flex-col px-5 h-full">
                        {searchValue &&
                            searchData.products &&
                            searchData.products.length > 0 ? (
                            <div className="mt-7.75 mb-7.75">
                                <p className="font-Poppins font-bold text-topBarTextColor text-base">
                                    Products
                                </p>
                                {searchData.products.map((item, index) => (
                                    <Link
                                        to={urlHelper(item.slug, "product")}
                                        className="mt-3 block"
                                        onClick={() =>
                                            setSearchValueForShowingInInputField(
                                                item.name
                                            )
                                        }
                                    >
                                        <span className="menu-text">
                                            {item.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            ""
                        )}
                        {searchValue &&
                            searchData.categories &&
                            searchData.categories.length > 0 ? (
                            <div className="mt-7.75 mb-7.75">
                                <p className="font-Poppins font-bold text-topBarTextColor text-base">
                                    Categories
                                </p>
                                {searchData.categories.map((item, index) => (
                                    <Link
                                        to={urlHelper(item.slug, "category")}
                                        className="mt-3 block"
                                        onClick={() =>
                                            setSearchValueForShowingInInputField(
                                                item.name
                                            )
                                        }
                                    >
                                        <span className="menu-text">
                                            {item.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            ""
                        )}
                        {searchValue &&
                            searchData.subcategories &&
                            searchData.subcategories.length > 0 ? (
                            <div className="mt-7.75 mb-7.75">
                                <p className="font-Poppins font-bold text-topBarTextColor text-base">
                                    SubCategories
                                </p>
                                {searchData.subcategories.map((item, index) => (
                                    <Link
                                        to={urlHelper(
                                            item.slug,
                                            "sub-category"
                                        )}
                                        className="mt-3 block"
                                        onClick={() =>
                                            setSearchValueForShowingInInputField(
                                                item.name
                                            )
                                        }
                                    >
                                        <span className="menu-text">
                                            {item.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            ""
                        )}
                        {searchValue &&
                            searchData.product_categories &&
                            searchData.product_categories.length > 0 ? (
                            <div className="mt-7.75 mb-7.75">
                                <p className="font-Poppins font-bold text-topBarTextColor text-base">
                                    Product Categories
                                </p>
                                {searchData.product_categories.map(
                                    (item, index) => (
                                        <Link
                                            to={urlHelper(
                                                item.slug,
                                                "product-category"
                                            )}
                                            className="mt-3 block"
                                            onClick={() =>
                                                setSearchValueForShowingInInputField(
                                                    item.name
                                                )
                                            }
                                        >
                                            <span className="menu-text">
                                                {item.name}
                                            </span>
                                        </Link>
                                    )
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                        {searchValue &&
                            searchData.brands &&
                            searchData.brands.length > 0 ? (
                            <div className="mt-7.75 mb-7.75">
                                <p className="font-Poppins font-bold text-topBarTextColor text-base">
                                    Brands
                                </p>
                                {searchData.brands.map((item, index) => (
                                    <Link
                                        to={urlHelper(item.slug, "brand")}
                                        className="mt-3 block"
                                        onClick={() =>
                                            setSearchValueForShowingInInputField(
                                                item.name
                                            )
                                        }
                                    >
                                        <span className="menu-text">
                                            {item.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            ""
                        )}
                        {searchValue &&
                            searchData.stores &&
                            searchData.stores.length > 0 ? (
                            <div className="mt-7.75 mb-7.75">
                                <p className="font-Poppins font-bold text-topBarTextColor text-base">
                                    Stores
                                </p>
                                {searchData.stores.map((item, index) => (
                                    <Link
                                        to={urlHelper(item.slug, "store")}
                                        className="mt-3 block"
                                        onClick={() =>
                                            setSearchValueForShowingInInputField(
                                                item.name
                                            )
                                        }
                                    >
                                        <span className="menu-text">
                                            {item.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            ""
                        )}

                        {result ? (
                            ""
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="font-Poppins font-bold text-topBarTextColor text-base">
                                    Not Available
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <SignUpSignInModal />
        </div>
    );
};

export default LogoBar;
