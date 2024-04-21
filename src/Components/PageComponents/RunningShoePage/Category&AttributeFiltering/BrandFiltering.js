import React, { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { updateSorted_FilteredProducts, updateSelectedBrand, updateSortingValue } from "../../../../ReduxStore/FilteringSystem/FilterStore"


const BrandFiltering = () => {

    const { brands, sortingValue, selectedBrand } = useSelector(state => state.filter)

    const dispatch = useDispatch()

    const { slug } = useParams()

    // const [selectedBrand, setSelectedBrand] = useState(null)

    useEffect(() => {
        // console.log(slug)
    }, [slug])

    const handleGettingBrandProducts = item => {
        // setSelectedBrand(item.id)
        dispatch(updateSelectedBrand(item.slug))
        dispatch(updateSortingValue({ value: 1, label: "Default Sorting" }))

        // if (sortingValue.value == 1) {
        //     axios.get(`/product-categories/${slug}/products?brand=${item.slug}`, {
        //         headers: {
        //             Accept: 'application/json',
        //         }
        //     }).then(response => {
        //         console.log(response)
        //         dispatch(updateSorted_FilteredProducts(response.data.products))
        //     }).catch(errors => {
        //         console.log(errors.response)
        //     })
        // } else {
        //     axios.get(`/product-categories/${slug}/products?sort=${sortingValue.value}&brand=${item.slug}`, {
        //         headers: {
        //             Accept: 'application/json',
        //         }
        //     }).then(response => {
        //         console.log(response)
        //         dispatch(updateSorted_FilteredProducts(response.data.products))
        //     }).catch(errors => {
        //         console.log(errors)
        //     })
        // }
    }





    return (
        <div className="brandFiltering">
            <p className="font-Poppins font-semibold text-base text-topBarTextColor mb-2.75">Brand</p>
            <hr className="border-t-2 mb-4.5" />
            <Scrollbars style={{ height: 280 }}>
                {
                    brands?.map((item, index) => (
                        <p className="font-DMSans text-sm text-sliderDescription mb-3.25" onClick={() => handleGettingBrandProducts(item)}><span className={`cursor-pointer hover:text-logobarElementBG ${selectedBrand == item.slug ? "text-logobarElementBG" : ""}`} key={index}>{item.name}</span></p>
                    ))
                }
            </Scrollbars>
        </div>
    )
}

export default BrandFiltering
