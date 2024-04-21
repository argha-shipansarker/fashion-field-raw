import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'

import Tabs from '../../ReuseableComponents/Tabs'
import BestSellerSlider from './BestSellerSlider'
import WomenFashionSlider from './WomenFashionSlider'
import MenFashionSlider from './MenFashionSlider'


const BestSeller = () => {
    const bestSellerRef = useRef([])

    const [products, setProducts] = useState(null)
    const [propsData2, setPropsData2] = useState(null)

    useEffect(() => {
        axios.get(`/sub-categories/alexa-gislason-i/slider`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            // console.log(item.slug)
            // console.log(response.data)
            setProducts(response.data.product_categories)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [])

    let propsData = {}

    useEffect(() => {
        if (products != null) {
            products.map((item, index) => {
                propsData = { ...propsData, [`TabName${index}`]: item.name, [`TabValue${index}`]: <BestSellerSlider slug={item.slug} ref={element => { bestSellerRef.current[index] = element }} /> }
            })
            setPropsData2(propsData)
        }
    }, [products])




    return (
        <div className="container mx-auto mt-8 px-4">
            {
                propsData2 && <Tabs
                    tabType="Best Seller"
                    // firstTab="Men"
                    // firstTabValue={<BestSellerSlider ref={element => { bestSellerRef.current[0] = element }} />}
                    // secondTab="Women"
                    // secondTabValue={<WomenFashionSlider ref={element => { bestSellerRef.current[1] = element }} />}
                    // thirdTab="Kids"
                    // thirdTabValue={<MenFashionSlider ref={element => { bestSellerRef.current[2] = element }} />}
                    // fourthTab="Footwear"
                    // fourthTabValue={<BestSellerSlider ref={element => { bestSellerRef.current[3] = element }} />}
                    // fifthTab="Watches"
                    // fifthTabValue={<BestSellerSlider ref={element => { bestSellerRef.current[4] = element }} />}
                    // sixthTab="Watches"
                    // sixthTabValue={<BestSellerSlider ref={element => { bestSellerRef.current[5] = element }} />}
                    {...propsData2}
                    ref={bestSellerRef}
                />
            }
        </div>
    )
}

export default BestSeller


