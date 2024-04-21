import React, { useRef } from 'react'

import Tabs from '../../ReuseableComponents/Tabs'
import MenShoeSlider from './MenShoeSlider'

const MenShoe = () => {
    const menShoeRef = useRef([])
    return (
        <div className="container mx-auto mt-8 px-4">
            <Tabs
                tabType="Footwears"
                firstTab="Formal Shoes"
                firstTabValue={<MenShoeSlider ref={element => { menShoeRef.current[0] = element }} />}
                secondTab="Casual Shoes"
                secondTabValue={<MenShoeSlider ref={element => { menShoeRef.current[1] = element }} />}
                thirdTab="Sports Shoes"
                thirdTabValue={<MenShoeSlider ref={element => { menShoeRef.current[2] = element }} />}
                fourthTab="Sandals"
                fourthTabValue={<MenShoeSlider ref={element => { menShoeRef.current[3] = element }} />}
                fifthTab="Sneakers"
                fifthTabValue={<MenShoeSlider ref={element => { menShoeRef.current[4] = element }} />}
                sixthTab="Loafers"
                sixthTabValue={<MenShoeSlider ref={element => { menShoeRef.current[5] = element }} />}
                ref={menShoeRef}
            />
        </div>
    )
}

export default MenShoe
