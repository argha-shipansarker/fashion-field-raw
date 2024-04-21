import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const OrderTrackingResult = () => {

    const { slug } = useParams()

    const [trackDetails, setTrackDetails] = useState(null)
    const [active, setActive] = useState(null)

    useEffect(() => {
        if (slug != "") {
            axios.get(`/tracking/${slug}`, {
                headers: {
                    Accept: "application/json"
                }
            }).then(response => {
                console.log(response)
                setTrackDetails(response.data)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [slug])

    useEffect(() => {
        if (trackDetails != null) {
            const value = trackDetails.statuses.filter(value => value.status == true)
            // console.log(value.length)
            setActive(value.length)
        }

    }, [trackDetails])

    useState(() => {
        console.log(active)
        // console.log("hello")
    }, [active])

    return (
        <div className="container mx-auto pl-4 pr-4 md:pr-7 mt-20 md:mt-0">

            <p className="font-Poppins font-bold text-sliderDescription text-lg mt-4">Order Id: <span className="font-normal text-base text-black">{slug}</span></p>

            <p className="font-Poppins font-bold text-sliderDescription text-lg mt-4">Status: <span className="font-normal text-base text-black">{trackDetails?.order?.status}</span></p>


            <div className="flex justify-between flex-wrap mt-20">
                {
                    trackDetails?.statuses.map((value, index) => (
                        <div className="flex items-center justify-center flex-col" key={index}>
                            {
                                value?.status ? (
                                    <div className="w-12.5 h-12.5 bg-logobarElementBG flex justify-center items-center" style={{ borderRadius: "50%" }}>
                                        {
                                            value?.item == "Return" ? (
                                                <i class="fas fa-reply text-white"></i>
                                            ) : (
                                                <i class="fas fa-check text-white"></i>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <div className="w-12.5 h-12.5 flex justify-center items-center border-1" style={{ borderRadius: "50%" }}>

                                    </div>
                                )
                            }
                            <p className={`font-Poppins font-bold text-base mt-4 ${value?.status ? "" : "text-logobarElementBG"}`}>{value?.item}</p>
                        </div>
                    ))
                }

            </div>

            <div className="mt-20">
                {
                    trackDetails?.timelines.map((item, index) => (
                        <p className={`font-Poppins font-bold text-base mt-4`}>{index + 1}. {item?.text}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default OrderTrackingResult
