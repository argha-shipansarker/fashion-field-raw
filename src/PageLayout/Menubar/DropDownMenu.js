import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { urlHelper } from '../../urlHelper';
const DropDownMenu = (props) => {
    const [submenu, setSubMenu] = useState([])

    const { menuData, index, setDropDown, hidden } = props;

    useEffect(() => {
        const datas = menuData && menuData.filter(items => items.id === index);
        // console.log("hello hello argha hello", datas);
        setSubMenu(datas);
        // console.log("asddf",submenu&& submenu[0]?.items);
    }, [index])
    return (
        <div className="container mx-auto px-4 bg-white h-96 overflow-y-auto" style={{ boxShadow: "0px 20px 46px 0 rgba(0, 0, 0, 0.15)" }}>
            <div className="grid gap-8 grid-cols-6 px-5">

                {submenu[0]?.items?.map((data, index) => (
                    <div className="mt-7.75 mb-7.75" key={index}>
                        <Link to={urlHelper(data.slug, data.type)} className="font-Poppins font-bold text-topBarTextColor text-base" key={index} onClick={() => setDropDown(hidden)}>{data.name}</Link>

                        {data?.sub_items?.map((sub, index) => (
                            <Link to={urlHelper(sub.slug, sub.type)} className="mt-3 block" key={index} ><span className="menu-text" onClick={() => setDropDown(hidden)}>{sub.name}</span></Link>
                        ))}

                    </div>
                ))}


            </div>
        </div>
    )
}

export default DropDownMenu
