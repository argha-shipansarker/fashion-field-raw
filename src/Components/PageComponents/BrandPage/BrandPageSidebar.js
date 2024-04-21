import React, { useState, useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { Scrollbars } from 'react-custom-scrollbars-2'

import { urlHelper } from '../../../urlHelper'

// import BrandFiltering from './Category&AttributeFiltering/BrandFiltering'
// import SizeFiltering from './Category&AttributeFiltering/SizeFiltering'
// import AttributeFiltering from './Category&AttributeFiltering/AttributeFiltering'


import { useSelector, useDispatch } from 'react-redux'

import FilteringSidebarSubCategory from '../RunningShoePage/Category&AttributeFiltering/FilteringSidebarSubCategory'

import { BiMinus, BiPlus } from "react-icons/bi"

import { updateSelectedAttribute } from "../../../ReduxStore/BrandFilteringSystem/BrandFilterStore"

const BrandPageSidebar = props => {

    const { categories } = props;

    const { brands, attributes, mainSelectedAttributeArray } = useSelector(state => state.brandFilter)

    const dispatch = useDispatch()

    const [modifiedMenuData, setModifiedMenuData] = useState([])

    useEffect(() => {
        if (categories?.length > 0) {
            setModifiedMenuData([])
            categories.map(value => {
                setModifiedMenuData(prevState => [...prevState, { ...value, open: false }])
            })
        }
    }, [categories])

    useEffect(() => {
        console.log(modifiedMenuData)
    }, [modifiedMenuData])

    const handleShowingSubCategory = (menu) => {
        let testData = [...modifiedMenuData]
        let specficMenu = testData.findIndex(value => value.id == menu.id)
        testData[specficMenu].open = !testData[specficMenu].open
        setModifiedMenuData(testData)
    }

    const handleSettingAttribute = attribute => {
        // dispatch(updateSortingValue({ value: 1, label: "Default Sorting" }))
        dispatch(updateSelectedAttribute(attribute))
    }

    // const handleSettingAttribute = attribute => {
    //     // dispatch(updateSortingValue({ value: 1, label: "Default Sorting" }))
    //     dispatch(updateSelectedAttribute(attribute))
    // }



    return (
        <div>
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-3.25">Categories</p>
            <div className="w-12.5 h-1.5 bg-logobarElementBG rounded-lg mb-5.5"></div>

            {
                modifiedMenuData.map((menu, index) => (
                    <>
                        <div className="flex mt-6 items-center justify-between" key={index}>
                            <Link to={urlHelper(menu.slug, "category")} target="_blank">
                                <p className="font-Poppins font-bold text-base overflow-hidden whitespace-nowrap">{menu.name}</p>
                            </Link>
                            <div onClick={() => handleShowingSubCategory(menu)} className='cursor-pointer'>
                                {menu.open ? <BiMinus /> : <BiPlus />}
                            </div>
                        </div>
                        <div className={menu.open ? "block ml-4" : "hidden"}>
                            <FilteringSidebarSubCategory subCategory={menu.sub_category} />
                        </div>
                    </>
                ))
            }

            {/* <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-3.25 mt-12.5">Shop By</p>
            <div className="w-12.5 h-1.5 bg-logobarElementBG rounded-lg mb-5.5"></div> */}

            {/* <div className="brandFiltering">
                <p className="font-Poppins font-semibold text-base text-topBarTextColor mb-2.75">Brand</p>
                <hr className="border-t-2 mb-4.5" />
                <Scrollbars style={{ height: 280 }}>
                    {
                        brands?.map((item, index) => (
                            <Link className="font-DMSans text-sm text-sliderDescription mb-3.25 block" to={`/brand/${item.slug}`}><span className={`cursor-pointer hover:text-logobarElementBG `} key={index}>{item.name}</span></Link>
                        ))
                    }
                </Scrollbars>
            </div> */}

            {/* {
                attributes?.map((item, index) => (
                    item.type == 'Size' ? (
                        <div className="sizeFiltering mt-11">
                            <p className="font-Poppins font-semibold text-base text-topBarTextColor mb-2.75">{item?.type} Options</p>
                            <hr className="border-t-2 mb-4.5" />
                            <div className="flex flex-wrap">
                                {
                                    item?.values?.map((item, index) => (
                                        <div className={`w-7.5 h-7.5 bg-topBarBG flex justify-center items-center mr-3.25 mb-3.25 cursor-pointer hover:bg-logobarElementBG hover:text-white ${mainSelectedAttributeArray.includes(item.value) ? "text-white bg-logobarElementBG" : "bg-topBarBG text-black"}`} style={{ borderRadius: "50%" }} key={index} onClick={() => handleSettingAttribute(item)}>
                                            <p className={`font-DMSans text-sm`}>{item.value}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        <div className="colorFiltering mt-9">
                            <p className="font-Poppins font-semibold text-base text-topBarTextColor mb-2.75">{item.type} Options</p>
                            <hr className="border-t-2 mb-4.5" />
                            <Scrollbars style={{ height: 220 }}>
                                {
                                    item?.values?.map((item, index) => (
                                        <p className={`font-DMSans text-sm ${mainSelectedAttributeArray.includes(item.value) ? "text-logobarElementBG" : "text-sliderDescription"}  mb-3.25 hover:text-logobarElementBG cursor-pointer`} onClick={() => handleSettingAttribute(item)} key={index}><span>{item.value}</span></p>
                                    ))
                                }
                            </Scrollbars>
                        </div>
                    )
                ))
            } */}

        </div>
    )
}

export default BrandPageSidebar
