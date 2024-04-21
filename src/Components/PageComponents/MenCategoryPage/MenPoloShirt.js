import React, { useRef } from 'react'

import Tabs from '../../ReuseableComponents/Tabs'
import MenPoloShirtSlider from './MenPoloShirtSlider'

const MenPoloShirt = () => {
    const menPoloShirtRef = useRef([])
    return (
        <div className="container mx-auto mt-8 px-4">
            <Tabs
                tabType="Polo Shirts"
                firstTab="Short Sleeve"
                firstTabValue={<MenPoloShirtSlider ref={element => { menPoloShirtRef.current[0] = element }} />}
                secondTab="Long Sleeve"
                secondTabValue={<MenPoloShirtSlider ref={element => { menPoloShirtRef.current[1] = element }} />}
                thirdTab="Pima Cotton"
                thirdTabValue={<MenPoloShirtSlider ref={element => { menPoloShirtRef.current[2] = element }} />}
                fourthTab="Pique Polos"
                fourthTabValue={<MenPoloShirtSlider ref={element => { menPoloShirtRef.current[3] = element }} />}
                fifthTab="Wool Polos"
                fifthTabValue={<MenPoloShirtSlider ref={element => { menPoloShirtRef.current[4] = element }} />}
                sixthTab="Golf Polos"
                sixthTabValue={<MenPoloShirtSlider ref={element => { menPoloShirtRef.current[5] = element }} />}
                ref={menPoloShirtRef}
            />
        </div>
    )
}

export default MenPoloShirt
