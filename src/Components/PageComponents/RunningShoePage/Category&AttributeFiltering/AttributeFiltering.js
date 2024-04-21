import React, { useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

import { useSelector, useDispatch } from 'react-redux'

import { updateSelectedAttribute, updateSortingValue } from "../../../../ReduxStore/FilteringSystem/FilterStore"

export default function AttributeFiltering(props) {
    const { attribute } = props

    const dispatch = useDispatch()

    const { mainSelectedAttributeArray } = useSelector(state => state.filter)

    // const arr = { 'attributes[]': ["red", "L"] }

    // useEffect(() => {

    //     let a = (new URLSearchParams(arr)).toString()

    //     // console.log(()
    // }, [])

    const handleSettingAttribute = attribute => {
        dispatch(updateSortingValue({ value: 1, label: "Default Sorting" }))
        dispatch(updateSelectedAttribute(attribute))
    }




    return (
        <div className="colorFiltering mt-9">
            <p className="font-Poppins font-semibold text-base text-topBarTextColor mb-2.75">{attribute.type} Options</p>
            <hr className="border-t-2 mb-4.5" />
            <Scrollbars style={{ height: 220 }}>
                {
                    attribute?.values?.map((item, index) => (
                        <p className={`font-DMSans text-sm ${mainSelectedAttributeArray.includes(item.value) ? "text-logobarElementBG" : "text-sliderDescription"}  mb-3.25 hover:text-logobarElementBG cursor-pointer`} onClick={() => handleSettingAttribute(item)} key={index}><span>{item.value}</span></p>
                    ))
                }
            </Scrollbars>
        </div>
    )
}
