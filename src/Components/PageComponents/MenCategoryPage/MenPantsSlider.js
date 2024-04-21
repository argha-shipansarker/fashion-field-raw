import React, { forwardRef } from 'react'

import Carousel from '../../ReuseableComponents/Carousel'

import MenPant1 from "../../../Assets/Images/MenCategory/MenPant1.png"
import MenPant2 from "../../../Assets/Images/MenCategory/MenPant2.png"
import MenPant3 from "../../../Assets/Images/MenCategory/MenPant3.png"
import MenPant4 from "../../../Assets/Images/MenCategory/MenPant4.png"

const data = [
    {
        category: "Cargo Pants",
        name: "Nam libero tempore cumjut soluta nobis est eligendi optio cumque",
        newPrice: 320,
        image: MenPant1,
    },
    {
        category: "Cargo Pants",
        name: "Nihil impedit quo minus idern quod maxime placeat face possimus, omnis",
        newPrice: 390,
        image: MenPant2,
    },
    {
        category: "Cargo Pants",
        name: "Voluptas assumenda estenm omnis dolor repellendus fre Temporibus autem rerum necessit",
        newPrice: 420,
        image: MenPant3,
    },
    {
        category: "Cargo Pants",
        name: "Quibusdam et aut officiis rety debitis aut rerum necessita fretynecessitatibus saepe eveniet ut et voluptates repudiandaemolestiae",
        newPrice: 560,
        image: MenPant4,
    },
    {
        category: "Cargo Pants",
        name: "Voluptas assumenda estenm omnis dolor repellendus fre Temporibus autem rerum necessit",
        newPrice: 675,
        image: MenPant2,
    },
]

const MenPantsSlider = forwardRef((props, forwardedRef) => {
    return (
        <div>
            <Carousel data={data} carouselType="commonCarousel" slidesToShow={4} arrows={false} mobileArrow={false} laptop={3} tab={2} mobile={1} dots={false} autoplay={false} centerMode={false} ref={forwardedRef} />
        </div>
    )
})

export default MenPantsSlider
