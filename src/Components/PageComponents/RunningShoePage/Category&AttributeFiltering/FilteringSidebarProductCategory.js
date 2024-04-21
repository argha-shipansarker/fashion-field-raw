import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { urlHelper } from '../../urlHelper'
import { urlHelper } from '../../../../urlHelper'



const FilteringSidebarProductCategory = (props) => {

    const { productCategory } = props


    return (
        <div>

            {
                productCategory.map((menu, index) => (
                    <div className="flex mt-3 items-center justify-between" key={index}>
                        <Link to={urlHelper(menu.slug, "product-category")} target="_blank">
                            <p className="font-Poppins font-normal overflow-hidden whitespace-nowrap">{menu.name}</p>
                        </Link>
                    </div>
                ))
            }

        </div>
    )
}

export default FilteringSidebarProductCategory
