import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'

import Tabs from '../../ReuseableComponents/Tabs'
import MenShirtSlider from './MenShirtSlider'

const MenShirt = props => {

    const { item } = props
    // console.log(item)

    const [subCategoryName, setSubCategoryName] = useState(null)
    const [productCategories, setProductCategories] = useState(null)
    const [propsData2, setPropsData2] = useState(null)
    const [slug, setSlug] = useState(null);

    useEffect(() => {
        axios.get(`/sub-categories/${item.slug}/slider`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            // console.log(item.slug)
            console.log(response.data)
            setSubCategoryName(response.data.name)
            setSlug(response.data.slug)
            setProductCategories(response.data.product_categories)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [item])


    const menShirtRef = useRef([])

    let propsData = {}

    useEffect(() => {
        // console.log(subCategoryName)
        // console.log(productCategories)
        if (productCategories != null) {
            productCategories.map((item, index) => {
                propsData = { ...propsData, [`TabName${index}`]: item.name, [`TabValue${index}`]: <MenShirtSlider slug={item.slug} ref={element => { menShirtRef.current[index] = element }} /> }
            })
            setPropsData2(propsData)
        }
        // console.log(propsData)
    }, [productCategories])

    useEffect(() => {
        // console.log(propsData2)
    }, [propsData2])

    const data = {
        firstTab: "Formal Shirts",
        firstTabValue: <MenShirtSlider ref={element => { menShirtRef.current[0] = element }} />,
        secondTab: "Casual Shirts",
        secondTabValue: <MenShirtSlider ref={element => { menShirtRef.current[1] = element }} />,
        thirdTab: "Denim Shirts",
        thirdTabValue: <MenShirtSlider ref={element => { menShirtRef.current[2] = element }} />,
        fourthTab: "Aloha Shirts",
        fourthTabValue: <MenShirtSlider ref={element => { menShirtRef.current[3] = element }} />,
        fifthTab: "Flannel Shirts",
        fifthTabValue: <MenShirtSlider ref={element => { menShirtRef.current[4] = element }} />,
        sixthTab: "Oxford Shirt",
        sixthTabValue: <MenShirtSlider ref={element => { menShirtRef.current[5] = element }} />,
    }


    return (
        <div className="container mx-auto mt-10 px-4">

            {
                subCategoryName && propsData2 && <Tabs
                    slug={slug}
                    linkType='subcategory'
                    tabType={subCategoryName}
                    {...propsData2}
                    ref={menShirtRef}
                />
            }

        </div>
    )
}

export default MenShirt


