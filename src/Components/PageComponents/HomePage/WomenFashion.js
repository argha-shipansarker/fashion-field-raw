import React, { useRef } from 'react'

import Tabs from '../../ReuseableComponents/Tabs'
import WomenFashionSlider from './WomenFashionSlider'

const WomenFashion = () => {
    const womenFashionRef = useRef([])
    return (
        <div className="container mx-auto px-4 mt-7">
            <Tabs
                tabType="Women's Fashion"
                firstTab="Sarees"
                firstTabValue={<WomenFashionSlider ref={element => { womenFashionRef.current[0] = element }} />}
                secondTab="Kurtis"
                secondTabValue={<WomenFashionSlider ref={element => { womenFashionRef.current[1] = element }} />}
                thirdTab="Tops"
                thirdTabValue={<WomenFashionSlider ref={element => { womenFashionRef.current[2] = element }} />}
                fourthTab="Skirts"
                fourthTabValue={<WomenFashionSlider ref={element => { womenFashionRef.current[3] = element }} />}
                fifthTab="Jeans"
                fifthTabValue={<WomenFashionSlider ref={element => { womenFashionRef.current[4] = element }} />}
                sixthTab="Trousers"
                sixthTabValue={<WomenFashionSlider ref={element => { womenFashionRef.current[5] = element }} />}
                ref={womenFashionRef}
            />
        </div>
    )
}

export default WomenFashion
