import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { urlHelper } from '../../urlHelper'
import SidebarSubCategoryDynamic from './SidebarSubCategoryDynamic'
import { ImCross } from "react-icons/im"

import { GoChevronRight, GoChevronDown } from "react-icons/go"

const SidebarDynamic = props => {

    const { isOpen, sidebarRef, setIsOpen } = props

    const testActive = "fixed top-0 left-0 h-screen w-3/4 bg-white transform transition-all duration-500 z-10 overflow-y-scroll pb-8 shadow-2xl md:hidden"
    const testHidden = "fixed top-0 left-0 h-screen w-0 transform transition-all duration-500 opacity-0 overflow-hidden z-10"

    const [menuData, setMenuData] = useState([])

    const [modifiedMenuData, setModifiedMenuData] = useState([])

    const [showSubCategory, setShowSubCategory] = useState([])
    const [index, setIndex] = useState(null)

    useEffect(() => {
        axios.get("/navigation",
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        ).then((res) => {
            // console.log(res)
            setMenuData(res.data)
        })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])


    useEffect(() => {
        if (menuData.length > 0) {
            setModifiedMenuData([])
            menuData.map(value => {
                setModifiedMenuData(prevState => [...prevState, { ...value, open: false }])
            })
        }

    }, [menuData])



    useEffect(() => {
        // console.log(modifiedMenuData)
    }, [modifiedMenuData])




    const handleShowingSubCategory = (menu) => {
        let testData = [...modifiedMenuData]
        let specficMenu = testData.findIndex(value => value.id == menu.id)
        testData[specficMenu].open = !testData[specficMenu].open
        setModifiedMenuData(testData)
    }




    return (
        <div className={isOpen ? testActive : testHidden} ref={sidebarRef}>

            <div className="mx-6 mt-8">

                <div className='flex justify-between items-center'>
                    <p className="text-3xl font-medium font-Poppins">Menu</p>
                    <ImCross size={25} color="red" onClick={() => setIsOpen(false)} />
                </div>

                {
                    modifiedMenuData.map((menu, index) => (
                        <>
                            <div className="flex mt-8 items-center justify-between" key={index} onClick={() => handleShowingSubCategory(menu)}>
                                <div>
                                    <p className="font-Poppins font-bold text-base overflow-hidden whitespace-nowrap">{menu.name}</p>
                                </div>
                                <div>
                                    {menu.open ? <GoChevronDown /> : <GoChevronRight />}
                                </div>
                            </div>
                            <div className={menu.open ? "block ml-4" : "hidden"}>
                                <SidebarSubCategoryDynamic subCategory={menu.items} setIsOpen={setIsOpen} />
                            </div>
                        </>
                    ))
                }

            </div>

        </div>
    )
}

export default SidebarDynamic
