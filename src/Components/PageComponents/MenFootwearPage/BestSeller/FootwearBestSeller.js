import React, { useRef } from 'react'

import Tabs from '../../../ReuseableComponents/Tabs'
import FootwearBestSellerSlider from './FootwearBestSellerSlider'

const FootwearBestSeller = () => {
    const footwearBestSellerRef = useRef([])
    return (
        <div className="container mx-auto mt-18 px-4">
            <Tabs
                tabType="Best Seller"
                firstTab="Flip Flops"
                firstTabValue={<FootwearBestSellerSlider ref={element => { footwearBestSellerRef.current[0] = element }} />}
                secondTab="Flat Sandals"
                secondTabValue={<FootwearBestSellerSlider ref={element => { footwearBestSellerRef.current[1] = element }} />}
                thirdTab="Formal Shoes"
                thirdTabValue={<FootwearBestSellerSlider ref={element => { footwearBestSellerRef.current[2] = element }} />}
                fourthTab="Casual Shoes"
                fourthTabValue={<FootwearBestSellerSlider ref={element => { footwearBestSellerRef.current[3] = element }} />}
                fifthTab="Sneakers"
                fifthTabValue={<FootwearBestSellerSlider ref={element => { footwearBestSellerRef.current[4] = element }} />}
                sixthTab="Running Shoes"
                sixthTabValue={<FootwearBestSellerSlider ref={element => { footwearBestSellerRef.current[5] = element }} />}
                ref={footwearBestSellerRef}
            />
        </div>
    )
}

export default FootwearBestSeller
