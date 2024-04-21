import React, { useRef } from 'react'

import Tabs from '../../ReuseableComponents/Tabs'
import FashionAccessoriesCarousel from './FashionAccessoriesCarousel'

const FashionAccessoriesTab = () => {
    const menFashionAccessoriesRef = useRef([])
    return (
        <div className="container mx-auto mt-20 px-4">
            <Tabs
                tabType="Fashion Accessories"
                firstTab="Watches"
                firstTabValue={<FashionAccessoriesCarousel ref={element => { menFashionAccessoriesRef.current[0] = element }} />}
                secondTab="Backpacks"
                secondTabValue={<FashionAccessoriesCarousel ref={element => { menFashionAccessoriesRef.current[1] = element }} />}
                thirdTab="Sunglasses"
                thirdTabValue={<FashionAccessoriesCarousel ref={element => { menFashionAccessoriesRef.current[2] = element }} />}
                fourthTab="Belts"
                fourthTabValue={<FashionAccessoriesCarousel ref={element => { menFashionAccessoriesRef.current[3] = element }} />}
                fifthTab="Men's Care"
                fifthTabValue={<FashionAccessoriesCarousel ref={element => { menFashionAccessoriesRef.current[4] = element }} />}
                sixthTab="Hats & Caps"
                sixthTabValue={<FashionAccessoriesCarousel ref={element => { menFashionAccessoriesRef.current[5] = element }} />}
                ref={menFashionAccessoriesRef}
            />
        </div>
    )
}

export default FashionAccessoriesTab
