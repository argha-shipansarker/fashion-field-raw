import React from 'react'
import { updateSelectedAttribute, updateSortingValue } from "../../../../ReduxStore/FilteringSystem/FilterStore"
import { useDispatch, useSelector } from 'react-redux'


const SizeFiltering = ({ attribute }) => {

    const dispatch = useDispatch()

    const { mainSelectedAttributeArray } = useSelector(state => state.filter)

    const handleSettingAttribute = attribute => {
        dispatch(updateSortingValue({ value: 1, label: "Default Sorting" }))
        dispatch(updateSelectedAttribute(attribute))
    }



    return (
        <div className="sizeFiltering mt-11">
            <p className="font-Poppins font-semibold text-base text-topBarTextColor mb-2.75">{attribute?.type} Options</p>
            <hr className="border-t-2 mb-4.5" />
            <div className="flex flex-wrap">
                {
                    attribute?.values?.map((item, index) => (
                        <div className={`w-7.5 h-7.5 bg-topBarBG flex justify-center items-center mr-3.25 mb-3.25 cursor-pointer hover:bg-logobarElementBG hover:text-white ${mainSelectedAttributeArray.includes(item.value) ? "text-white bg-logobarElementBG" : "bg-topBarBG text-black"}`} style={{ borderRadius: "50%" }} key={index} onClick={() => handleSettingAttribute(item)}>
                            <p className={`font-DMSans text-sm`}>{item.value}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SizeFiltering
