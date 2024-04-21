import React, { useRef, useState, useEffect } from 'react'

import Tabs from '../../ReuseableComponents/Tabs'
import MenFashionSlider from './MenFashionSlider'
import WomenFashionSlider from './WomenFashionSlider'

const MenFashion = props => {


    const { item } = props
    // console.log(item)
    const menFashionRef = useRef([])
    const [propsData2, setPropsData2] = useState(null)

    let propsData = {}

    useEffect(() => {
        if (item != null) {
            item.sub_category.filter((item, index) => index < 5).map((item, index) => {
                propsData = { ...propsData, [`TabName${index}`]: item.name, [`TabValue${index}`]: <MenFashionSlider slug={item.slug} ref={element => { menFashionRef.current[index] = element }} /> }
            })
            setPropsData2(propsData)
        }

        return () => {
            setPropsData2(null)
        }

    }, [item])

    useEffect(() => {
        console.log("hellloooooo men fashion slider is loaded")
    }, [])




    return (
        <div className="container mx-auto px-4 mt-11">
            {
                propsData2 && <Tabs
                    tabType={item?.alias ? item?.alias : item?.name}
                    slug={item?.slug}
                    linkType='main'
                    // firstTab="Shirts"
                    // firstTabValue={<MenFashionSlider ref={element => { menFashionRef.current[0] = element }} />}
                    // secondTab="Polo Shirts"
                    // secondTabValue={<WomenFashionSlider ref={element => { menFashionRef.current[1] = element }} />}
                    // thirdTab="Kurtas"
                    // thirdTabValue={<MenFashionSlider ref={element => { menFashionRef.current[2] = element }} />}
                    // fourthTab="Trousers"
                    // fourthTabValue={<MenFashionSlider ref={element => { menFashionRef.current[3] = element }} />}
                    // fifthTab="Jeans"
                    // fifthTabValue={<MenFashionSlider ref={element => { menFashionRef.current[4] = element }} />}
                    // sixthTab="Shorts"
                    // sixthTabValue={<MenFashionSlider ref={element => { menFashionRef.current[5] = element }} />}
                    {...propsData2}
                    ref={menFashionRef}
                />
            }
        </div>
    )
}

export default MenFashion
