import React, { useEffect, useState } from 'react'
import dayjs from "dayjs";

import Carousel from '../../../ReuseableComponents/Carousel';

import Image1 from "../../../../Assets/Images/MenFootwear/DodImage1.png"
import Image2 from "../../../../Assets/Images/MenFootwear/DodImage2.png"

const data = [
    {
        name: "Neque porro quisquam estnaum",
        description: "At vero eos et accusamus et iusto odio dignissimo ducimus qui blanditiis praesentium voluptatum un deleniti atque corrupti quos dolores et quas gmyi lest excepturi sint occaecati cupiditate.",
        previousPrice: 2500,
        newPrice: 1250,
        available: 8,
        sold: 28,
        hours: 0,
        mins: 0,
        secs: 0,
        discount: 35,
        image: Image1,
        timeStamp: 1635388120,
    },
    {
        name: "Quis autem vel eum iure repredu",
        description: "Nemo enim ipsam voluptatem quia voluptas situm aspernatur aut odit aut fugit, sed quia consequunt magni dolores eos qui ratione voluptatem sequier nesciunt. Neque porro quisquam est.",
        previousPrice: 1580,
        newPrice: 1054,
        available: 10,
        sold: 36,
        hours: 0,
        mins: 0,
        secs: 0,
        discount: 55,
        image: Image2,
        timeStamp: 1633921905
    },
    {
        name: "Neque porro quisquam estnaum",
        description: "At vero eos et accusamus et iusto odio dignissimo ducimus qui blanditiis praesentium voluptatum un deleniti atque corrupti quos dolores et quas gmyi lest excepturi sint occaecati cupiditate.",
        previousPrice: 2500,
        newPrice: 1450,
        available: 18,
        sold: 28,
        hours: 0,
        mins: 0,
        secs: 0,
        discount: 35,
        image: Image1,
        timeStamp: 1635388120,
    },
    {
        name: "Quis autem vel eum iure repredu",
        description: "Nemo enim ipsam voluptatem quia voluptas situm aspernatur aut odit aut fugit, sed quia consequunt magni dolores eos qui ratione voluptatem sequier nesciunt. Neque porro quisquam est.",
        previousPrice: 1280,
        newPrice: 1154,
        available: 10,
        sold: 16,
        hours: 0,
        mins: 0,
        secs: 0,
        discount: 55,
        image: Image1,
        timeStamp: 1635388120
    },
]

const FootwearDealsOfTheDaySlider = () => {
    const [actualData, setActualData] = useState(data)

    const instantTime = dayjs()

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

    useEffect(() => {

        const intervelId = setInterval(() => {
            remainingtime()
        }, 1000)

        return () => clearInterval(intervelId)

    }, [actualData])

    return (
        <div className="dealsOfTheDay">
            <Carousel data={actualData} carouselType="dealsOfTheDay" slidesToShow={2} arrows={true} mobileArrow={true} laptop={1} tab={1} mobile={1} dots={false} autoplay={false} centerMode={false} />
        </div>
    )
}

export default FootwearDealsOfTheDaySlider
