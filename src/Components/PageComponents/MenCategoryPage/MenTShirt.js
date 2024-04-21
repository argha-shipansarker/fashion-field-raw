import React, { useRef } from 'react'

import Tabs from '../../ReuseableComponents/Tabs'
import MenTShirtSlider from './MenTShirtSlider'

const MenTShirt = () => {
    const menTshirtRef = useRef([])
    return (
        <div className="container mx-auto mt-8 px-4">
            <Tabs
                tabType="T Shirts"
                firstTab="Basic Half"
                firstTabValue={<MenTShirtSlider ref={element => { menTshirtRef.current[0] = element }} />}
                secondTab="Long Sleeve"
                secondTabValue={<MenTShirtSlider ref={element => { menTshirtRef.current[1] = element }} />}
                thirdTab="Round Neck"
                thirdTabValue={<MenTShirtSlider ref={element => { menTshirtRef.current[2] = element }} />}
                fourthTab="Wide Neck"
                fourthTabValue={<MenTShirtSlider ref={element => { menTshirtRef.current[3] = element }} />}
                fifthTab="Henley Collar"
                fifthTabValue={<MenTShirtSlider ref={element => { menTshirtRef.current[4] = element }} />}
                sixthTab="Baseball"
                sixthTabValue={<MenTShirtSlider ref={element => { menTshirtRef.current[5] = element }} />}
                ref={menTshirtRef}
            />
        </div>
    )
}

export default MenTShirt
