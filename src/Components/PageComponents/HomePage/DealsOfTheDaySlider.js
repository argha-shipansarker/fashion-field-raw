import React, { useEffect, useState } from 'react'
import dayjs from "dayjs";

import Carousel from '../../ReuseableComponents/Carousel'

import ProductImage1 from "../../../Assets/Images/product-image1.png"
import ProductImage2 from "../../../Assets/Images/product-image2.png"

const data = [
    {
        name: "Neque porro quisquam estnaum",
        description: "At vero eos et accusamus et iusto odio dignissimo ducimus qui blanditiis praesentium voluptatum un deleniti atque corrupti quos dolores et quas gmyi lest excepturi sint occaecati cupiditate.",
        previousPrice: 540,
        newPrice: 351,
        available: 8,
        sold: 28,
        hours: 0,
        mins: 0,
        secs: 0,
        discount: 35,
        image: ProductImage1,
        timeStamp: 1633471530,
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
        image: ProductImage2,
        timeStamp: 1633485930
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
        image: ProductImage1,
        timeStamp: 1633471530,
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
        image: ProductImage2,
        timeStamp: 1633485930
    },
]

const DealsOfTheDaySlider = props => {

    const { dealsProduct } = props

    const [actualData, setActualData] = useState(data)

    useEffect(() => {
        let data = []
        dealsProduct?.products?.map((item, index) => {
            data = [...data, { ...item, timeStamp: dealsProduct.timeStamp }]
        })

        console.log(dealsProduct)
        setActualData(data)
 

    }, [dealsProduct])





    const instantTime = dayjs()

    useEffect(() => {

        const intervelId = setInterval(() => {
            remainingtime()
        }, 1000)

        return () => clearInterval(intervelId)

    }, [actualData])

    // The function which is executing the countdown

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

    // coutDown timer making finished

 

    return (
        <div className="dealsOfTheDay">
            <Carousel data={actualData} carouselType="dealsOfTheDay" slidesToShow={actualData.length < 2 ? actualData.length : 2} arrows={true} mobileArrow={true} laptop={1} tab={1} mobile={1} dots={false} autoplay={false} centerMode={false} desktopScroll={2} laptopScroll={1} />
        </div>
    )
}

export default DealsOfTheDaySlider
