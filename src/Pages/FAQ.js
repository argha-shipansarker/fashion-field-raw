import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BiMinus, BiPlus } from "react-icons/bi"
import { Link, useLocation } from 'react-router-dom'

const FAQ = () => {

    const [faqResult, setFaqResult] = useState([])

    const [modifiedFaqResult, setModifiedFaqResult] = useState([])

    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    useEffect(() => {
        axios.get("/faqs", {
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            console.log(response)
            setFaqResult(response.data)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [])

    useEffect(() => {
        if (faqResult.length > 0) {
            setModifiedFaqResult([])
            faqResult.map(value => {
                setModifiedFaqResult(prevState => [...prevState, { ...value, open: false }])
            })
        }

    }, [faqResult])

    const handleShowingSubCategory = (menu) => {
        let testData = [...modifiedFaqResult]
        // testData.map(value => {
        //     if (value.open == true) {
        //         value.open = false
        //     }
        // })
        // console.log(testData)
        let specficMenu = testData.findIndex(value => value.id == menu.id)
        testData[specficMenu].open = !testData[specficMenu].open
        // console.log(testData)
        setModifiedFaqResult(testData)
    }

    return (
        <div className='container mx-auto pl-4 pr-4 md:pr-7'>
            <p className='font-Poppins font-bold text-orderTrack text-4xl text-center mt-20'>FAQ</p>
            <div className="mt-6 flex justify-center">
                <ol className="list-reset flex text-sm font-medium font-Poppins">
                    <li><Link to="/" className="text-logobarElementBG">Home</Link></li>
                    <li><span className="mx-2 text-mutedText">/</span></li>
                    <li className="text-mutedText">FAQ</li>
                </ol>
            </div>
            <div className='mt-10 md:px-20'>
                {
                    modifiedFaqResult.map((item, index) => (
                        <>
                            <div className="flex justify-between items-center h-12.5 border-1 px-4 rounded bg-topBarBG cursor-pointer mt-6 mb-1" key={index} onClick={() => handleShowingSubCategory(item)}>
                                <p className="font-Poppins font-bold text-lg overflow-hidden whitespace-nowrap">{item.question}</p>
                                <div className='cursor-pointer ml-4'>
                                    {item.open ? <BiMinus /> : <BiPlus />}
                                </div>
                            </div>
                            <div className={item.open ? "block mb-4" : "hidden"}>
                                <div className='py-4 border-1 px-4'>
                                    <p className="font-DMSans text-base">{item.answer}</p>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default FAQ
