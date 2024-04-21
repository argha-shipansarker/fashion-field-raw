import React, { useState, forwardRef, useEffect } from 'react'

import { ImCross } from "react-icons/im";
import { BiDotsVertical } from "react-icons/bi";

import TabsContent from './TabsContent';
import { Link } from 'react-router-dom';

const Tabs = forwardRef((props, ref) => {

    // console.log(props)

    // const { tabType, firstTab, firstTabValue, secondTab, secondTabValue, thirdTab, thirdTabValue, fourthTab, fourthTabValue, fifthTab, fifthTabValue, sixthTab, sixthTabValue } = props

    // console.log(props)

    const [tabNames, setTabNames] = useState(null)
    const [tabValues, setTabValues] = useState(null)


    useEffect(() => {
        let a = Object.keys(props)
        // console.log(a)
        const tabNames = a.filter(value => value.includes("Name"))
        let tabNamesObj = {}
        tabNames.map((item, index) => {
            tabNamesObj = { ...tabNamesObj, [`TabName${index}`]: props[item] }
        })
        const tabValues = a.filter(value => value.includes("Value"))
        // console.log(tabNames)
        setTabNames(tabNamesObj)
        setTabValues(tabValues)
    }, [props])

    useEffect(() => {
        // console.log(tabNames)
        // console.log(tabValues)
    }, [tabNames, tabValues])






    const { tabType, TabName0, TabValue0, TabName1, TabValue1, TabName2, TabValue2, TabName3, TabValue3, TabName4, TabValue4, sixthTab, sixthTabValue, slug, linkType } = props
    const [openTab, setOpenTab] = React.useState(1);

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const testActive = "absolute top-16 right-0 h-70 w-32 bg-white transform transition-all duration-500 z-10 border-1 border-mutedText rounded-lg"
    const testHidden = "absolute top-16 -left-44 h-70 w-32 z-10 transform transition-all duration-500 opacity-0 -translate-x-80"

    const carouselStyle = "hidden md:flex lg:mr-28"
    const nonCarouselStyle = "hidden md:flex lg:mr-3"

    const handleCarouselNextButton = () => {
        ref.current[openTab - 1].nextButton()
    }

    const handleCarouselPrevButton = () => {
        ref.current[openTab - 1].prevButton()
    }

    return (
        <div className="flex flex-wrap">
            <div className="w-full">
                <ul
                    className="flex mb-0 list-none flex-wrap flex-row justify-between relative"
                    role="tablist"
                >
                    <div>
                        <p className="font-Poppins font-semibold text-base xs:text-xl text-sliderHeading mb-1.5">

                            {linkType == 'main' ? (<Link to={`/main-category/${slug}`}>{tabType}</Link>) : ''}
                            {linkType == 'subcategory' ? (<Link to={`/sub-category/${slug}`}>{tabType}</Link>) : ''}
                        </p>
                        <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg"></div>
                    </div>

                    {/* Modification Starts */}

                    <div className="flex items-center flex absolute right-9 top-1 md:right-6.5 md:top-2">

                        <div
                            onClick={handleCarouselPrevButton}
                            className="h-7.5 w-7.5 rounded-3.75 bg-timeBG flex justify-center items-center text-mutedText mr-4 cursor-pointer hover:bg-logobarElementBG hover:text-white"
                        >
                            <div style={{ fontSize: 17 }} className="custom-arrow-icon-div">
                                <i className="fas fa-angle-left custom-arrow-icon"></i>
                            </div>
                        </div>

                        <div
                            className="h-7.5 w-7.5 rounded-3.75 bg-timeBG flex justify-center items-center text-mutedText cursor-pointer hover:bg-logobarElementBG hover:text-white"
                            onClick={handleCarouselNextButton}
                        >
                            <div style={{ fontSize: 17 }} className="custom-arrow-icon-div">
                                <i className="fas fa-angle-right custom-arrow-icon"></i>
                            </div>
                        </div>

                    </div>

                    {/* Modification Ends */}

                    {/* Responsiveness Creation */}

                    <button
                        className="flex flex-col h-10 w-10 justify-center items-center group md:hidden"
                        onClick={() => setHamburgerOpen(!hamburgerOpen)}
                    >
                        {
                            hamburgerOpen ? <ImCross size={20} color="#e5371b" /> : <BiDotsVertical size={30} color="#222222" />
                        }

                    </button>

                    <div className={hamburgerOpen ? testActive : testHidden}>

                        {
                            tabNames && <TabsContent
                                // firstTab={firstTab}
                                // secondTab={secondTab}
                                // thirdTab={thirdTab}
                                // fourthTab={fourthTab}
                                // fifthTab={fifthTab}
                                // sixthTab={sixthTab}
                                // firstTab={TabName0}
                                // secondTab={TabName1}
                                // thirdTab={TabName2}
                                // fourthTab={TabName3}
                                // fifthTab={TabName4}
                                {...tabNames}
                                setOpenTab={setOpenTab}
                                openTab={openTab}
                                hamburgerOpen={hamburgerOpen}
                                setHamburgerOpen={setHamburgerOpen}
                            />
                        }

                    </div>



                    {/* Responsiveness ends */}

                    <div className={props.nonCarousel ? nonCarouselStyle : carouselStyle}>

                        {
                            tabNames && <TabsContent
                                // firstTab={firstTab}
                                // secondTab={secondTab}
                                // thirdTab={thirdTab}
                                // fourthTab={fourthTab}
                                // fifthTab={fifthTab}
                                // sixthTab={sixthTab}
                                // firstTab={TabName0}
                                // secondTab={TabName1}
                                // thirdTab={TabName2}
                                // fourthTab={TabName3}
                                // fifthTab={TabName4}
                                {...tabNames}
                                setOpenTab={setOpenTab}
                                openTab={openTab}
                            />
                        }

                    </div>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full rounded">
                    <div className="pt-5 flex-auto">
                        <div className="tab-content tab-space relative">
                            {
                                tabValues && tabValues.map((item, index) => {
                                    // console.log(props[item])
                                    return (
                                        <div className={openTab === index + 1 ? "opacity-100 duration-700 transition-all transform max-w-full" : "absolute top-0 right-7 opacity-0 transition-all transform duration-1000 w-0"} id={`link${index + 1}`} key={index}>
                                            {/* {secondTabValue} */}
                                            {
                                                openTab === index + 1 && <>
                                                    {
                                                        props[item]
                                                    }
                                                </>
                                            }
                                            {/* {props[item]} */}
                                        </div>
                                    )
                                })
                            }
                            {/* <div className={openTab === 1 ? "opacity-100 duration-700 transition-all transform max-w-full" : "absolute top-0 right-7 opacity-0 transition-all transform duration-1000 w-0"} id="link1">
                                {firstTabValue}
                                {TabValue0}
                            </div>
                            <div className={openTab === 2 ? "opacity-100 duration-700 transition-all transform max-w-full" : "absolute top-0 right-7 opacity-0 transition-all transform duration-1000 w-0"} id="link2">
                                {secondTabValue}
                                {TabValue1}
                            </div>
                            <div className={openTab === 3 ? "opacity-100 duration-700 transition-all transform max-w-full" : "absolute top-0 right-7 opacity-0 transition-all transform duration-1000 w-0"} id="link3">
                                {thirdTabValue}
                                {TabValue2}
                            </div>
                            <div className={openTab === 4 ? "opacity-100 duration-700 transition-all transform max-w-full" : "absolute top-0 right-7 opacity-0 transition-all transform duration-1000 w-0"} id="link4">
                                {fourthTabValue}
                                {TabValue3}
                            </div>
                            <div className={openTab === 5 ? "opacity-100 duration-700 transition-all transform max-w-full" : "absolute top-0 right-7 opacity-0 transition-all transform duration-1000 w-0"} id="link5">
                                {fifthTabValue}
                                {TabValue4}
                            </div> */}
                            {/* <div className={openTab === 6 ? "opacity-100 duration-700 transition-all transform max-w-full" : "absolute top-0 right-7 opacity-0 transition-all transform duration-1000 w-0"} id="link6">
                                {sixthTabValue}
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Tabs