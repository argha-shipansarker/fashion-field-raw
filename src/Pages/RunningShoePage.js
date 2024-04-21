import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";
import { IoMdMenu } from "react-icons/io";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import FilteringSidebar from "../Components/PageComponents/RunningShoePage/FilteringSidebar";
import FilteredProducts from "../Components/PageComponents/RunningShoePage/FilteredProducts";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
    updateSortingValue,
    updateSorted_FilteredProducts,
    updateAttributes,
    updateBrands,
    updateSelectedBrand,
    updateMainSelectedAttributeArray,
    updateSelectedAttributeArrayToInitial,
} from "../ReduxStore/FilteringSystem/FilterStore";

const options = [
    { value: 1, label: "Default Sorting" },
    { value: "new", label: "New Arrival" },
    { value: "top_rated", label: "Top Rated" },
    { value: "best_seller", label: "Best Seller" },
    { value: "price_low", label: "Price Low to High" },
    { value: "price_high", label: "Price High to Low" },
];

const productShowingOptions = [
    { value: 10, label: "10 Products" },
    { value: 25, label: "25 Products" },
    { value: 50, label: "50 Products" },
    { value: 100, label: "100 Products" },
    { value: "all", label: "All Products" },
];

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: 16,
        fontFamily: "Poppins",
        color: state.isSelected ? "white" : "#252525",
        backgroundColor: state.isSelected ? "#e5371b" : "",
        "&:hover": { backgroundColor: state.isSelected ? "" : "#f6f6f6" },
    }),
    singleValue: (provided, state) => ({
        ...provided,
        fontSize: 16,
        fontFamily: "Poppins",
        color: "#252525",
    }),
    placeholder: (provided, state) => ({
        ...provided,
        fontSize: 16,
        fontFamily: "Poppins",
        color: "#252525",
    }),
    control: (provided, state) => ({
        ...provided,
        boxShadow: "none",
        backgroundColor: "#f6f6f6",
        width: 200,
        border: "1px solid #e5371b", // default border color
        "&:hover": { borderColor: "#e5371b" }, // border style on hover
        // You can also use state.isFocused to conditionally style based on the focus state
    }),
};

const stylesProductNumber = {
    option: (provided, state) => ({
        ...provided,
        fontSize: 16,
        fontFamily: "Poppins",
        color: state.isSelected ? "white" : "#252525",
        backgroundColor: state.isSelected ? "#e5371b" : "",
        "&:hover": { backgroundColor: state.isSelected ? "" : "#f6f6f6" },
    }),
    singleValue: (provided, state) => ({
        ...provided,
        fontSize: 16,
        fontFamily: "Poppins",
        color: "#252525",
    }),
    placeholder: (provided, state) => ({
        ...provided,
        fontSize: 16,
        fontFamily: "Poppins",
        color: "#252525",
    }),
    control: (provided, state) => ({
        ...provided,
        boxShadow: "none",
        backgroundColor: "#f6f6f6",
        width: 160,
        border: "1px solid #e5371b", // default border color
        "&:hover": { borderColor: "#e5371b" }, // border style on hover
        // You can also use state.isFocused to conditionally style based on the focus state
    }),
};

const RunningShoePage = () => {
    const {
        sortingValue,
        sorted_FilteredProducts,
        attributes,
        brands,
        selectedBrand,
        selectedAttribute,
        mainSelectedAttributeArray,
    } = useSelector((state) => state.filter);
    const { slug } = useParams();

    const dispatch = useDispatch();

    const [productNumber, setProductNumber] = useState({
        value: 50,
        label: "50 Products",
    });

    useEffect(() => {
        // console.log(mainSelectedAttributeArray)
    }, [mainSelectedAttributeArray]);

    const [open, setOpen] = useState(false);
    const testActive =
        "fixed top-0 left-0 h-screen w-3/4 bg-white transform transition-all duration-500 z-10 bg-white overflow-y-scroll pb-8 shadow-2xl md:hidden p-4";
    const testHidden =
        "absolute top-0 left-0 h-screen w-40 transform transition-all duration-500 opacity-0 -translate-x-114 z-10";
    const hamburgerRef = useRef(null);
    const sidebarRef = useRef(null);

    const [category, setCategory] = useState([]);

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return () => {
            dispatch(
                updateSortingValue({ value: 1, label: "Default Sorting" })
            );
            setProductNumber({ value: 50, label: "50 Products" });
            dispatch(updateSelectedBrand(""));
            dispatch(updateMainSelectedAttributeArray());
            dispatch(updateSelectedAttributeArrayToInitial());
            dispatch(updateSorted_FilteredProducts([]));
        };
    }, []);

    useEffect(() => {
        // dispatch(updateSortingValue({ value: 1, label: "Default Sorting" }))
        // setProductNumber({ value: 10, label: "10 Products" })
        // dispatch(updateSelectedBrand(""))
        // dispatch(updateMainSelectedAttributeArray())
        // dispatch(updateSorted_FilteredProducts([]))
    }, [slug]);

    const closeSidebarWhenClickedOutside = (ref, hamburgerRef) => {
        // console.log(ref.current)

        // console.log(ref.current)
        function handleClickOutside(event) {
            // console.log(ref.current.contains(event.target))
            if (
                ref.current &&
                !ref.current.contains(event.target) &&
                !hamburgerRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    };

    closeSidebarWhenClickedOutside(sidebarRef, hamburgerRef);

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        setLoading(false);
        axios
            .get(
                `/product-categories/${slug}/products?sort=${
                    sortingValue.value
                }&brand=${selectedBrand}&attributes[]=${mainSelectedAttributeArray.join(
                    "&attributes[]="
                )}&limit=${productNumber.value}`,
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            )
            .then((response) => {
                console.log(response);
                dispatch(updateSorted_FilteredProducts(response.data.products));
                setCategory(response.data.product_category);
                setCategories(response.data.categories);
                dispatch(updateBrands(response.data.brands));
                dispatch(updateAttributes(response.data.attributes));
                setLoading(true);
            })
            .catch((errors) => {
                console.log(errors.response);
                setLoading(true);
            });
    }, [
        sortingValue,
        selectedBrand,
        mainSelectedAttributeArray,
        productNumber,
    ]);

    return (
        <div className="container mx-auto pl-4 pr-4 md:pr-7 mt-20 md:mt-0">
            <div className="container mx-auto mt-8">
                <ol className="list-reset flex flex-wrap text-sm font-medium font-Poppins">
                    <li>
                        <Link to="/" className="text-logobarElementBG">
                            Home
                        </Link>
                    </li>
                    <li>
                        <span className="mx-2 text-mutedText">/</span>
                    </li>
                    <li>
                        <Link
                            to={`/main-category/${category.sub_category?.category?.slug}`}
                            className="text-logobarElementBG whitespace-nowrap"
                        >
                            {category.sub_category?.category?.name}
                        </Link>
                    </li>
                    <li>
                        <span className="mx-2 text-mutedText">/</span>
                    </li>
                    <li>
                        <Link
                            to={`/sub-category/${category.sub_category?.slug}`}
                            className="text-logobarElementBG whitespace-nowrap"
                        >
                            {category.sub_category?.name}
                        </Link>
                    </li>
                    <li>
                        <span className="mx-2 text-mutedText">/</span>
                    </li>
                    <li className="text-mutedText whitespace-nowrap">
                        {category.name}
                    </li>
                </ol>
            </div>
            <div className="grid grid-cols-4 gap-x-7.5 mt-5">
                <div className="hidden md:block">
                    <FilteringSidebar categories={categories} />
                </div>

                <div className="col-span-4 md:col-span-3">
                    {category && (
                        <p className="font-Poppins font-semibold text-3xl text-sliderHeading mb-3.25">
                            {category.name}
                        </p>
                    )}
                    <div className="w-12.5 h-1.5 bg-logobarElementBG rounded-lg mb-7.5"></div>
                    <div className="h-12.5 md:bg-topBarBG mb-7.5 md:px-5 flex justify-between items-center select-sorting">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                            <div className="flex items-center mb-4 md:mb-0">
                                <p className="font-Poppins font-semibold text-base text-topBarTextColor mr-4">
                                    Show
                                </p>
                                <Select
                                    value={productNumber}
                                    onChange={(option) =>
                                        setProductNumber(option)
                                    }
                                    options={productShowingOptions}
                                    placeholder="Select Sorting"
                                    isSearchable={false}
                                    isClearable={false}
                                    className="focus:outline-none"
                                    styles={stylesProductNumber}
                                />
                            </div>
                            <Select
                                value={sortingValue}
                                onChange={(option) =>
                                    dispatch(updateSortingValue(option))
                                }
                                options={options}
                                placeholder="Select Sorting"
                                isSearchable={false}
                                isClearable={false}
                                className="focus:outline-none"
                                styles={styles}
                            />
                        </div>
                        <button
                            className="flex flex-col h-10 w-10 justify-center items-center group md:hidden border-2"
                            onClick={() => setOpen((prevState) => !prevState)}
                            ref={hamburgerRef}
                        >
                            <IoMdMenu size={35} color="#222222" />
                        </button>
                    </div>
                    <div
                        className={open ? testActive : testHidden}
                        ref={sidebarRef}
                    >
                        <FilteringSidebar categories={categories} />
                    </div>
                    <FilteredProducts
                        products={sorted_FilteredProducts}
                        loading={loading}
                    />
                </div>
            </div>
            <div className="pagenation mt-8 mb-11"></div>
        </div>
    );
};

export default RunningShoePage;
