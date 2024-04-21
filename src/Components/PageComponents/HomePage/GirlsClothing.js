import React, { useRef } from 'react'

import Tabs from '../../ReuseableComponents/Tabs'
import GirlsClothingSlider from './GirlsClothingSlider'

const GirlsClothing = () => {
    const girlClothingRef = useRef([])
    return (
        <div className="container mx-auto px-4 mt-7">
            <Tabs
                tabType="Girl's Clothing"
                firstTab="Dresses"
                firstTabValue={<GirlsClothingSlider ref={element => { girlClothingRef.current[0] = element }} />}
                secondTab="Tops"
                secondTabValue={<GirlsClothingSlider ref={element => { girlClothingRef.current[1] = element }} />}
                thirdTab="Tshirts"
                thirdTabValue={<GirlsClothingSlider ref={element => { girlClothingRef.current[2] = element }} />}
                fourthTab="Skirts"
                fourthTabValue={<GirlsClothingSlider ref={element => { girlClothingRef.current[3] = element }} />}
                fifthTab="Leggings"
                fifthTabValue={<GirlsClothingSlider ref={element => { girlClothingRef.current[4] = element }} />}
                sixthTab="Trousers"
                sixthTabValue={<GirlsClothingSlider ref={element => { girlClothingRef.current[5] = element }} />}
                ref={girlClothingRef}
            />
        </div>
    )
}

export default GirlsClothing
