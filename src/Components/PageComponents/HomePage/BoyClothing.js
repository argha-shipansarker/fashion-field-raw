import React, { useRef } from 'react'

import Tabs from '../../ReuseableComponents/Tabs'
import BoyClothingSlider from './BoyClothingSlider'

const BoyClothing = () => {
    const boyClothingRef = useRef([])
    return (
        <div className="container mx-auto px-4 mt-20">
            <Tabs
                tabType="Boy's Clothing"
                firstTab="T-Shirts"
                firstTabValue={<BoyClothingSlider ref={element => { boyClothingRef.current[0] = element }} />}
                secondTab="Shirts"
                secondTabValue={<BoyClothingSlider ref={element => { boyClothingRef.current[1] = element }} />}
                thirdTab="Shorts"
                thirdTabValue={<BoyClothingSlider ref={element => { boyClothingRef.current[2] = element }} />}
                fourthTab="Sweat Shirts"
                fourthTabValue={<BoyClothingSlider ref={element => { boyClothingRef.current[3] = element }} />}
                fifthTab="Jeans"
                fifthTabValue={<BoyClothingSlider ref={element => { boyClothingRef.current[4] = element }} />}
                sixthTab="Trousers"
                sixthTabValue={<BoyClothingSlider ref={element => { boyClothingRef.current[5] = element }} />}
                ref={boyClothingRef}
            />
        </div>
    )
}

export default BoyClothing
