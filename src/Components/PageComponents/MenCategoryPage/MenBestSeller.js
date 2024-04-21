import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'

import Tabs from '../../ReuseableComponents/Tabs'
import MenBestSellerSlider from './MenBestSellerSlider'

const MenBestSeller = () => {
    const menBestSellerRef = useRef([])



    const [products, setProducts] = useState(null)
    const [propsData2, setPropsData2] = useState(null)

    useEffect(() => {
        axios.get(`/sub-categories/alexanne-turcotte/slider`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            setProducts(response.data.product_categories)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [])

    let propsData = {}

    useEffect(() => {
        if (products != null) {
            products.map((item, index) => {
                propsData = { ...propsData, [`TabName${index}`]: item.name, [`TabValue${index}`]: <MenBestSellerSlider slug={item.slug} ref={element => { menBestSellerRef.current[index] = element }} /> }
            })
            setPropsData2(propsData)
        }
    }, [products])





    return (
        <div className="container mx-auto px-4">
            {
                propsData2 && <Tabs
                    tabType="Best Seller"
                    {...propsData2}
                    ref={menBestSellerRef}
                />
            }
        </div>
    )
}

export default MenBestSeller
