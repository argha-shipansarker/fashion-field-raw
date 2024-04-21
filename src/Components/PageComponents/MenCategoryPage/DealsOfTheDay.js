import React, { useState, useEffect } from 'react'
import dayjs from "dayjs";

import Carousel from '../../ReuseableComponents/Carousel'

import MenDod1 from "../../../Assets/Images/MenCategory/MenDod1.png"
import MenDod2 from "../../../Assets/Images/MenCategory/MenDod2.png"

const data = [
    {
        name: "Neque porro quisquam estnaum",
        description: "At vero eos et accusamus et iusto odio dignissimo ducimus qui blanditiis praesentium voluptatum un deleniti atque corrupti quos dolores et quas gmyi lest excepturi sint occaecati cupiditate.",
        previousPrice: 1620,
        newPrice: 1053,
        available: 8,
        sold: 28,
        hours: 0,
        mins: 0,
        secs: 0,
        discount: 35,
        image: MenDod1,
        timeStamp: 1633307446,
    },
    {
        name: "Quis autem vel eum iure repredu",
        description: "Nemo enim ipsam voluptatem quia voluptas situm aspernatur aut odit aut fugit, sed quia consequunt magni dolores eos qui ratione voluptatem sequier nesciunt. Neque porro quisquam est.",
        previousPrice: 280,
        newPrice: 154,
        available: 10,
        sold: 16,
        hours: 0,
        mins: 0,
        secs: 0,
        discount: 55,
        image: MenDod2,
        timeStamp: 1633321846,
    },
    {
        name: "Quis autem vel eum iure repredu",
        description: "At vero eos et accusamus et iusto odio dignissimo ducimus qui blanditiis praesentium voluptatum un deleniti atque corrupti quos dolores et quas gmyi lest excepturi sint occaecati cupiditate.",
        previousPrice: 540,
        newPrice: 351,
        available: 8,
        sold: 28,
        hours: 0,
        mins: 0,
        secs: 0,
        discount: 35,
        image: MenDod1,
        timeStamp: 1633307446,
    },
    {
        name: "Quis autem vel eum iure repredu",
        description: "Nemo enim ipsam voluptatem quia voluptas situm aspernatur aut odit aut fugit, sed quia consequunt magni dolores eos qui ratione voluptatem sequier nesciunt. Neque porro quisquam est.",
        previousPrice: 280,
        newPrice: 154,
        available: 10,
        sold: 16,
        hours: 0,
        mins: 0,
        secs: 0,
        discount: 55,
        image: MenDod2,
        timeStamp: 1633321846,
    },
]

const DealsOfTheDay = props => {

    const { dealsProduct } = props
    const [actualData, setActualData] = useState([])

    useEffect(() => {
        let data = []
        dealsProduct.products.map((item, index) => {
            data = [...data, { ...item, timeStamp: dealsProduct.timeStamp }]
        })

        console.log(data)
        setActualData(data)

    }, [dealsProduct])





    const instantTime = dayjs()

    useEffect(() => {

        const intervelId = setInterval(() => {
            remainingtime()
        }, 1000)

        return () => clearInterval(intervelId)

    }, [actualData])

    let remainingtime = () => {
        const modifiedData = actualData.map((item, index) => {
            const deadLine = dayjs.unix(item.timeStamp)
            if (dayjs(deadLine).unix() < dayjs(instantTime).unix()) {
                return {
                    ...item
                }
            } else {
                item.secs = deadLine.diff(instantTime, "seconds") % 60;
                item.mins = deadLine.diff(instantTime, "minutes") % 60;
                item.hours = deadLine.diff(instantTime, "hours") % 24;
                return {
                    ...item
                }
            }

        })
        setActualData(modifiedData)
    }

    return (
        <div className="container mx-auto px-4 mt-6 dealsOfTheDay">
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Deals of the Day</p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-7"></div>
            <Carousel data={actualData} carouselType="dealsOfTheDay" slidesToShow={actualData.length < 2 ? actualData.length : 2} arrows={true} mobileArrow={true} laptop={1} tab={1} mobile={1} dots={false} autoplay={false} centerMode={false} desktopScroll={2} laptopScroll={1} />
        </div>
    )
}

export default DealsOfTheDay
