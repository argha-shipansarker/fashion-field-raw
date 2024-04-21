import React from 'react'
import { Link } from 'react-router-dom'

const BoysAndGirlsMenu = (props) => {
    const { setDisplayWomen, hidden } = props

    return (
        <div className="container mx-auto px-4 bg-white h-95" style={{ boxShadow: "0px 20px 46px 0 rgba(0, 0, 0, 0.15)" }}>
            <div className="grid gap-8 grid-cols-6 px-5">
                <div className="mt-7.75 mb-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Boy's Clothing</p>
                    
                    <p className="mt-5"><span className="menu-text"><Link to='/category/hoody'>Hoody</Link></span></p>
                    <p className="mt-3"><span className="menu-text"><Link to='/category/shirt'>Shirt</Link></span></p>
                    <p className="mt-3"><span className="menu-text"><Link to='/category/t-shirt-2'>T-Shirt</Link></span></p>
                    <p className="mt-3"><span className="menu-text"><Link to='/category/joggers'>Joggers</Link></span></p>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Boy's Clothing</p>
                    <p className="mt-5"><span className="menu-text">Boy's T-Shirts</span></p>
                    <p className="mt-3"><span className="menu-text">Boy's Shirts</span></p>
                    <p className="mt-3"><span className="menu-text">Boy's Polos</span></p>
                    <p className="mt-3"><span className="menu-text">Boy's Panjabis</span></p>
                    <p className="mt-3"><span className="menu-text">Boy's Pants</span></p>
                    <p className="mt-3"><span className="menu-text">Boy's Tank Top</span></p>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Girl's Clothing</p>
                    <p className="mt-5"><span className="menu-text">Girl's Frock</span></p>
                    <p className="mt-3"><span className="menu-text">Girl's T-shirt</span></p>
                    <p className="mt-3"><span className="menu-text">Girl's Tops</span></p>
                    <p className="mt-3"><span className="menu-text">Girl's Party Dresses</span></p>
                    <p className="mt-3"><span className="menu-text">Girl's Pants</span></p>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Kids Footwear</p>
                    <p className="mt-5"><span className="menu-text">Boy's Footwear</span></p>
                    <p className="mt-3"><span className="menu-text">Girls's Footwear</span></p>
                    <p className="mt-3"><span className="menu-text">Baby's Footwear</span></p>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Accessories</p>
                    <p className="mt-5"><span className="menu-text">Kid's Bags</span></p>
                    <p className="mt-3"><span className="menu-text">Kid's Sunglasses</span></p>
                    <p className="mt-3"><span className="menu-text">Kid's Watches</span></p>
                    <p className="mt-3"><span className="menu-text">School Tiffin Box</span></p>
                    <p className="mt-3"><span className="menu-text">Water Pot</span></p>
                </div>
                <div className="mt-7.75 mb-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Toys</p>
                    <p className="mt-5"><span className="menu-text">Indoor Toys</span></p>
                    <p className="mt-3"><span className="menu-text">Outdoor Toys</span></p>
                    <p className="mt-3"><span className="menu-text">Sports & Rocker Toys</span></p>
                    <p className="mt-3"><span className="menu-text">Remote Control Toys</span></p>
                    <p className="mt-3"><span className="menu-text">Educational Toys</span></p>
                    <p className="mt-3"><span className="menu-text">Baby Chair & Table</span></p>
                    <p className="mt-3"><span className="menu-text">Science Kits</span></p>
                    <p className="mt-3"><span className="menu-text">Baby Walkers</span></p>
                </div>
                <div className="mt-7.75">

                </div>
            </div>
        </div>
    )
}

export default BoysAndGirlsMenu
