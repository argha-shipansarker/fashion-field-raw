import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { urlHelper } from '../../urlHelper'

import { GoChevronRight, GoChevronDown } from "react-icons/go"

const SidebarProductCategoryDynamic = props => {
    const { productCategory, setIsOpen } = props

    // const [modifiedProductCategory, setModifiedProductCategory] = useState([])


    return (
        <div>

            {
                productCategory.map((menu, index) => (
                    <div className="flex mt-3 items-center justify-between" key={index}>
                        <Link to={urlHelper(menu.slug, menu.type)} onClick={() => setIsOpen(false)}>
                            <p className="font-Poppins font-medium overflow-hidden whitespace-nowrap">{menu.name}</p>
                        </Link>
                    </div>
                ))
            }

        </div>
    )
}

export default SidebarProductCategoryDynamic
