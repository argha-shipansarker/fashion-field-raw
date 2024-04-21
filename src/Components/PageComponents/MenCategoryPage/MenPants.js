import React, { useRef } from 'react'

import Tabs from '../../ReuseableComponents/Tabs'
import MenPantsSlider from './MenPantsSlider'

const MenPants = () => {
    const menPantsRef = useRef([])
    return (
        <div className="container mx-auto mt-8 px-4">
            <Tabs
                tabType="Pants"
                firstTab="Jeans"
                firstTabValue={<MenPantsSlider ref={element => { menPantsRef.current[0] = element }} />}
                secondTab="Gabardine"
                secondTabValue={<MenPantsSlider ref={element => { menPantsRef.current[1] = element }} />}
                thirdTab="Formal"
                thirdTabValue={<MenPantsSlider ref={element => { menPantsRef.current[2] = element }} />}
                fourthTab="Trousers"
                fourthTabValue={<MenPantsSlider ref={element => { menPantsRef.current[3] = element }} />}
                fifthTab="Cargo Pants"
                fifthTabValue={<MenPantsSlider ref={element => { menPantsRef.current[4] = element }} />}
                sixthTab="Sweat Pants"
                sixthTabValue={<MenPantsSlider ref={element => { menPantsRef.current[5] = element }} />}
                ref={menPantsRef}
            />
        </div>
    )
}

export default MenPants
