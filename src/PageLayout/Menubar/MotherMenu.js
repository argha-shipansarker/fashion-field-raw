import React from 'react'
import { Link } from 'react-router-dom'

const MotherMenu = props => {

    const { setDisplayMother, hidden } = props


    return (
        <div className="container mx-auto px-4 bg-white h-95" style={{ boxShadow: "0px 20px 46px 0 rgba(0, 0, 0, 0.15)" }}>
            <div className="grid gap-8 grid-cols-6 px-5">
                <div className="mt-7.75 mb-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Clothing</p>

                    <Link to="/category/clothing" className="mt-5 block"><span className="menu-text" onClick={() => setDisplayMother(hidden)}>T-Shirt</span></Link>
                    <Link to="/category/frock" className="mt-3 block"><span className="menu-text" onClick={() => setDisplayMother(hidden)}>Frock</span></Link>
                    <Link to="/category/short-pant" className="mt-3 block"><span className="menu-text" onClick={() => setDisplayMother(hidden)}>Short-Pant</span></Link>
                </div>
                <div className="mt-7.75 mb-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Accessories</p>

                    <Link to="/category/hand-bag" className="mt-5 block"><span className="menu-text" onClick={() => setDisplayMother(hidden)}>Hand Bag</span></Link>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Baby's Care</p>
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
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Nursing & Feeding</p>
                    <p className="mt-5"><span className="menu-text">Baby Feeding Bottle</span></p>
                    <p className="mt-3"><span className="menu-text">Nipple</span></p>
                    <p className="mt-3"><span className="menu-text">Water Bottle, Flask & Glass</span></p>
                    <p className="mt-3"><span className="menu-text">Teether, Pacifier & Spoon</span></p>
                    <p className="mt-3"><span className="menu-text">Baby Plate, Bowl & Jar</span></p>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Baby Food</p>
                    <p className="mt-5"><span className="menu-text">Baby Cereal</span></p>
                    <p className="mt-3"><span className="menu-text">Baby Milk</span></p>
                </div>
                <div className="mt-7.75">

                </div>
                <div className="mt-7.75">

                </div>
            </div>
        </div>
    )
}

export default MotherMenu
