import React from 'react'
import { Link } from 'react-router-dom'

const PersonalMenu = props => {

    const { setDisplayPersonal, hidden } = props


    return (
        <div className="container mx-auto px-4 bg-white h-95" style={{ boxShadow: "0px 20px 46px 0 rgba(0, 0, 0, 0.15)" }}>
            <div className="grid gap-8 grid-cols-6 px-5">
                <div className="mt-7.75 mb-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Men's Care</p>


                    <Link to="/category/clothing-2" className="mt-5 inline-block"><span className="menu-text" onClick={() => setDisplayPersonal(hidden)}>Clothing</span></Link>


                    {/* <p className="mt-3"><span className="menu-text">Men's Deodorant</span></p>
                    <p className="mt-3"><span className="menu-text">Skin Care</span></p>
                    <p className="mt-3"><span className="menu-text">Hair Care</span></p>
                    <p className="mt-3"><span className="menu-text">Body Care</span></p>
                    <p className="mt-3"><span className="menu-text">Shaving & Grooming Needs</span></p> */}
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Women's Care</p>
                    <p className="mt-5"><span className="menu-text">Women's Perfume</span></p>
                    <p className="mt-3"><span className="menu-text">Body Mist</span></p>
                    <p className="mt-3"><span className="menu-text">Doedorant</span></p>
                    <p className="mt-3"><span className="menu-text">Skin Care</span></p>
                    <p className="mt-3"><span className="menu-text">Hair Care</span></p>
                    <p className="mt-3"><span className="menu-text">Body Care</span></p>
                    <p className="mt-3"><span className="menu-text">Makeup</span></p>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Baby Care</p>
                    <p className="mt-5"><span className="menu-text">Baby Toiletries</span></p>
                    <p className="mt-3"><span className="menu-text">Baby Feeds</span></p>
                    <p className="mt-3"><span className="menu-text">Skin Care</span></p>
                    <p className="mt-3"><span className="menu-text">Hair Care</span></p>
                    <p className="mt-3"><span className="menu-text">Potty Training</span></p>
                    <p className="mt-3"><span className="menu-text">Health & Safety</span></p>
                    <p className="mt-3"><span className="menu-text">Baby Grooming</span></p>
                    <p className="mt-3"><span className="menu-text">Bathing Accessories</span></p>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Mother's Care</p>
                    <p className="mt-5"><span className="menu-text">Maternity Clothes</span></p>
                    <p className="mt-3"><span className="menu-text">Pregnancy Essentials</span></p>
                </div>
                <div className="mt-7.75">

                </div>
                <div className="mt-7.75">

                </div>
            </div>
        </div>
    )
}

export default PersonalMenu
