import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { urlHelper } from '../../urlHelper';

import MenMenu from './MenMenu'
import WomenMenu from './WomenMenu'
import BoysAndGirlsMenu from './BoysAndGirlsMenu'
import MotherMenu from './MotherMenu'
import PersonalMenu from './PersonalMenu'
import AllCategoryMenu from './AllCategoryMenu'
import DropDownMenu from './DropDownMenu'

const Menubar = () => {

    const active = "container mx-auto pr-11 absolute visible opacity-100 translate-y-0 transition-all ease-linear duration-200"
    const hidden = "container mx-auto pr-11 absolute invisible opacity-0 transform translate-y-1 transition-all ease-linear duration-200"

    const [menuData, setMenuData] = useState([])

    const [dropdown, setDropDown] = useState(hidden);


    // useEffect(() => {
    //     axios.get("/categories", {
    //         headers: {
    //             Accept: 'application/json',
    //         }
    //     }).then(response => {
    //         console.log(response)
    //         setMenuData(response.data)
    //     }).catch(errors => {
    //         console.log(errors.response)
    //     })
    // }, [])


    // useEffect(() => {
    //     if (menuData != null) {
    //         menuData.map((item, index) => {
    //             const display = useRef()
    //         })
    //     }
    // }, [menuData])

    useEffect(() => {
        axios.get("/navigation", { headers: { Accept: 'application/json' } })
            .then((res) => setMenuData(res.data))
            .catch((err) => {
                console.log(err.message);
            })
    }, [])

    useEffect(() => {
        // console.log("99999999999999999999999999999999999", menuData);
    }, [menuData])


    const [displayAllCategory, setDisplayAllCategory] = useState(hidden)
    const [displayMen, setDisplayMen] = useState(hidden)
    const [displayWomen, setDisplayWomen] = useState(hidden)
    const [displayBoysGirls, setDisplayBoysGirls] = useState(hidden)
    const [displayMother, setDisplayMother] = useState(hidden)
    const [displayPersonal, setDisplayPersonal] = useState(hidden)


    const [index, setIndex] = useState(null);

    useEffect(() => {
        // console.log(index);
    }, [index])

    const [sticky, setSticky] = useState(false)
    const normalMenuStyle = "h-13 bg-logobarElementBG hidden md:block sticky top-0 z-10 transition-all ease-linear duration-200";
    const stickyMenuStyle = "h-13 bg-topBarTextColor hidden md:block sticky top-0 z-10 shadow-lg transition-all ease-linear duration-200";

    const normalMenuIndividualStyle = "h-full flex items-center hover:bg-menuHover cursor-pointer px-4"
    const stickyMenuIndividualStyle = "h-full flex items-center hover:bg-stickyHover cursor-pointer px-4"

    useEffect(() => {
        const toggleSticky = () => {
            if (window.scrollY > 146) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        }
        document.addEventListener("scroll", toggleSticky)
        return () => document.removeEventListener("scroll", toggleSticky)
    }, [])


    return (
        <div className={sticky ? stickyMenuStyle : normalMenuStyle}>
            <div className="container mx-auto px-4 h-full">
                <div className="h-full flex justify-between font-Poppins font-semibold text-white items-center">

                    {/* <Link to="/" className={sticky ? stickyMenuIndividualStyle : normalMenuIndividualStyle} onMouseEnter={() => { setDisplayAllCategory(active) }} onMouseLeave={() => { setDisplayAllCategory(hidden) }}>
                        <p>ALL CATEGORIES</p>
                    </Link>

                    <Link to="/main-category/men" className={sticky ? stickyMenuIndividualStyle : normalMenuIndividualStyle} onMouseEnter={() => { setDisplayMen(active) }} onMouseLeave={() => { setDisplayMen(hidden) }}>
                        <p onClick={() => setDisplayMen(hidden)}>MEN</p>
                    </Link>

                    <Link to="/main-category/women" className={sticky ? stickyMenuIndividualStyle : normalMenuIndividualStyle} onMouseEnter={() => { setDisplayWomen(active) }} onMouseLeave={() => { setDisplayWomen(hidden) }}>
                        <p onClick={() => setDisplayWomen(hidden)}>WOMEN</p>
                    </Link>

                    <Link to="/main-category/boys-girls" className={sticky ? stickyMenuIndividualStyle : normalMenuIndividualStyle} onMouseEnter={() => { setDisplayBoysGirls(active) }} onMouseLeave={() => { setDisplayBoysGirls(hidden) }}>
                        <p onClick={() => setDisplayBoysGirls(hidden)}>BOYS</p>
                    </Link>

                    <Link to="/main-category/mother-care" className={sticky ? stickyMenuIndividualStyle : normalMenuIndividualStyle} onMouseEnter={() => { setDisplayMother(active) }} onMouseLeave={() => { setDisplayMother(hidden) }}>
                        <p onClick={() => setDisplayMother(hidden)}>GIRLS</p>
                    </Link> */}

                    {menuData.map((menu, index) => {
                        // console.log("❤❤❤❤❤❤", menu)
                        if (menu.name == "ALL CATEGORIES") {
                            return (
                                <Link
                                    to={urlHelper(menu.slug, menu.type)} className={sticky ? stickyMenuIndividualStyle : normalMenuIndividualStyle} onMouseEnter={() => { setDropDown(active) }} onMouseLeave={() => { setDropDown(hidden) }} key={index}>
                                    <p onClick={() => { setDropDown(hidden); window.scrollTo(0, 0); }} onMouseEnter={(e) => { setIndex(menu.id) }}>{menu.name}</p>
                                </Link>
                            )
                        } else {
                            return (
                                <p
                                    className={sticky ? stickyMenuIndividualStyle : normalMenuIndividualStyle} onMouseEnter={() => { setDropDown(active) }} onMouseLeave={() => { setDropDown(hidden) }} key={index}>
                                    <p onClick={() => { setDropDown(hidden); window.scrollTo(0, 0); }} onMouseEnter={(e) => { setIndex(menu.id) }}>{menu.name}</p>
                                </p>
                            )
                        }

                    })}


                </div>

                <div onMouseEnter={() => { setDropDown(active) }} onMouseLeave={() => { setDropDown(hidden) }}>
                    <div className={dropdown}>
                        <DropDownMenu menuData={menuData} index={index} setDropDown={setDropDown} hidden={hidden} />
                    </div>
                </div>


                {/* <div onMouseEnter={() => { setDisplayAllCategory(active) }} onMouseLeave={() => { setDisplayAllCategory(hidden) }}>
                    <div className={displayAllCategory}>
                        <AllCategoryMenu setDisplayAllCategory={setDisplayAllCategory} hidden={hidden} />
                    </div>
                </div>

                <div className={displayMen} onMouseEnter={() => { setDisplayMen(active) }} onMouseLeave={() => { setDisplayMen(hidden) }}>
                
                    <MenMenu setDisplayMen={setDisplayMen} hidden={hidden} />
                   
                </div>

                <div onMouseEnter={() => { setDisplayWomen(active) }} onMouseLeave={() => { setDisplayWomen(hidden) }}>
                    <div className={displayWomen}>
                        <WomenMenu setDisplayWomen={setDisplayWomen} hidden={hidden} />
                    </div>
                </div>

                <div onMouseEnter={() => { setDisplayBoysGirls(active) }} onMouseLeave={() => { setDisplayBoysGirls(hidden) }}>
                    <div className={displayBoysGirls}>
                        <BoysAndGirlsMenu />
                    </div>
                </div>

                <div onMouseEnter={() => { setDisplayMother(active) }} onMouseLeave={() => { setDisplayMother(hidden) }}>
                    <div className={displayMother}>
                        <MotherMenu setDisplayMother={setDisplayMother} hidden={hidden} />
                    </div>
                </div> */}



            </div>
        </div>
    )
}

export default Menubar
