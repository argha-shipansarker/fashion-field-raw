import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { urlHelper } from '../../../../urlHelper'
import FilteringSidebarProductCategory from './FilteringSidebarProductCategory'


import { GoChevronRight, GoChevronDown } from "react-icons/go"

import { BiMinus, BiPlus } from "react-icons/bi"



const FilteringSidebarSubCategory = (props) => {

    const { subCategory } = props

    const [modifiedSubCategory, setModifiedSubCategory] = useState([])

    useEffect(() => {

        if (subCategory.length > 0) {
            setModifiedSubCategory([])
            subCategory.map(value => {
                setModifiedSubCategory(prevState => [...prevState, { ...value, open: false }])
            })
        }

    }, [subCategory])


    const handleShowingSubCategory = (menu) => {
        let testData = [...modifiedSubCategory]
        let specficMenu = testData.findIndex(value => value.id == menu.id)
        testData[specficMenu].open = !testData[specficMenu].open
        setModifiedSubCategory(testData)
    }


    return (
        <div>

            {
                modifiedSubCategory.map((menu, index) => (
                    <>
                        <div className="flex mt-4 items-center justify-between" key={index}>
                            <Link to={urlHelper(menu.slug, "sub-category")} target="_blank">
                                <p className="font-Poppins font-medium overflow-hidden whitespace-nowrap">{menu.name}</p>
                            </Link>
                            <div onClick={() => handleShowingSubCategory(menu)} className='cursor-pointer'>
                                {menu.open ? <BiMinus /> : <BiPlus />}
                            </div>
                        </div>
                        <div className={menu.open ? "block ml-4 mt-4" : "hidden"}>
                            <FilteringSidebarProductCategory productCategory={menu.product_category} />
                        </div>
                    </>
                ))
            }

        </div>
    )
}

export default FilteringSidebarSubCategory
