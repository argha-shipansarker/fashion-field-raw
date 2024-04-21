import React, { useRef } from 'react'
import Tabs from '../../../ReuseableComponents/Tabs'
import HomeLifestyleCarousel from './HomeLifestyleCarousel'

const HomeLivingGridTab = () => {
    const homeLifestyleRef = useRef([])
    return (
        <div className="container mx-auto mt-20 px-4">
            <Tabs
                tabType="Home & Lifestyle"
                firstTab="Watches"
                firstTabValue={<HomeLifestyleCarousel ref={element => { homeLifestyleRef.current[0] = element }} />}
                secondTab="Bags"
                secondTabValue={<HomeLifestyleCarousel ref={element => { homeLifestyleRef.current[1] = element }} />}
                thirdTab="Eyewears"
                thirdTabValue={<HomeLifestyleCarousel ref={element => { homeLifestyleRef.current[2] = element }} />}
                fourthTab="Belts"
                fourthTabValue={<HomeLifestyleCarousel ref={element => { homeLifestyleRef.current[3] = element }} />}
                fifthTab="Home & Living"
                fifthTabValue={<HomeLifestyleCarousel ref={element => { homeLifestyleRef.current[4] = element }} />}
                sixthTab="Toys"
                sixthTabValue={<HomeLifestyleCarousel ref={element => { homeLifestyleRef.current[5] = element }} />}
                ref={homeLifestyleRef}
            />
        </div>
    )
}

export default HomeLivingGridTab
