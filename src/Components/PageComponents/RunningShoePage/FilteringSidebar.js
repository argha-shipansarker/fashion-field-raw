import React, { useState, useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { urlHelper } from '../../../urlHelper'

import BrandFiltering from './Category&AttributeFiltering/BrandFiltering'
import SizeFiltering from './Category&AttributeFiltering/SizeFiltering'
import AttributeFiltering from './Category&AttributeFiltering/AttributeFiltering'


import { useSelector } from 'react-redux'

import FilteringSidebarSubCategory from './Category&AttributeFiltering/FilteringSidebarSubCategory'

import { BiMinus, BiPlus } from "react-icons/bi"



const FilteringSidebar = (props) => {

    const { categories } = props;

    const { attributes } = useSelector(state => state.filter)

    const [modifiedMenuData, setModifiedMenuData] = useState([])

    useEffect(() => {
        if (categories?.length > 0) {
            setModifiedMenuData([])
            categories.map(value => {
                setModifiedMenuData(prevState => [...prevState, { ...value, open: false }])
            })
        }
    }, [categories])

    // useEffect(() => {
    //     console.log("lkjtksjtidjgfijgfisjgfej", attributes)
    // }, [attributes])

    const handleShowingSubCategory = (menu) => {
        let testData = [...modifiedMenuData]
        let specficMenu = testData.findIndex(value => value.id == menu.id)
        testData[specficMenu].open = !testData[specficMenu].open
        setModifiedMenuData(testData)
    }



    return (
        <div>
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-3.25">Categories</p>
            <div className="w-12.5 h-1.5 bg-logobarElementBG rounded-lg mb-5.5"></div>

            {
                modifiedMenuData.map((menu, index) => (
                    <>
                        <div className="flex mt-2 items-center justify-between" className="flex mt-8 items-center justify-between" key={index}>
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

            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-3.25 mt-12.5">Shop By</p>
            <div className="w-12.5 h-1.5 bg-logobarElementBG rounded-lg mb-5.5"></div>

            <BrandFiltering />

            {
                attributes?.map((item, index) => (
                    item.type == 'Size' ? <SizeFiltering attribute={item} /> : <AttributeFiltering attribute={item} />
                ))
            }

        </div>
    )
}

export default FilteringSidebar
