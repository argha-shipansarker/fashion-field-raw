import React from 'react'
import { Link } from "react-router-dom"

const MenMenu = props => {
    const { setDisplayMen, hidden } = props
    return (
        <div className="container mx-auto px-4 bg-white h-96" style={{ boxShadow: "0px 20px 46px 0 rgba(0, 0, 0, 0.15)" }}>
            <div className="grid gap-8 grid-cols-6 px-5">
                <div className="mt-7.75 mb-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Men's Clothing</p>
                    <Link to="/category/men-s-shirt" className="mt-5 inline-block" onClick={() => setDisplayMen(hidden)}><span className="menu-text">Men's Shirts</span></Link>
                    {/* <p className="mt-3"><span className="menu-text">Men's T-Shirts</span></p> */}
                    <Link to="/category/men-s-polo-shirt" className="mt-3 inline-block" onClick={() => setDisplayMen(hidden)}><span className="menu-text">Men's Polo Shirt</span></Link>

                    <Link to="/category/men-s-t-shirt" className="mt-3 inline-block" onClick={() => setDisplayMen(hidden)}><span className="menu-text">Men's T-Shirt</span></Link>

                    <Link to="/category/men-s-pant" className="mt-3 inline-block" onClick={() => setDisplayMen(hidden)}><span className="menu-text">Men's Pant</span></Link>
                  
                </div>
                <div className="mt-7.75 mb-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Men's Footwear</p>
                    <Link to="/category/formal-shoes" className="mt-5 inline-block" onClick={() => setDisplayMen(hidden)}><span className="menu-text">Formal Shoes</span></Link>

                    <Link to="/category/casual-shoes" className="mt-3 inline-block" onClick={() => setDisplayMen(hidden)}><span className="menu-text">Casual Shoes</span></Link>
                    <Link to="/category/sports-shoes-2" className="mt-3 inline-block" onClick={() => setDisplayMen(hidden)}><span className="menu-text">Sports Shoes</span></Link>
                  
                </div>
                <div className="mt-7.75">

                </div>
            </div>
        </div>
    )
}

export default MenMenu
