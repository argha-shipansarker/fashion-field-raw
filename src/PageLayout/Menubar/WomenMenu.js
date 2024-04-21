import React from 'react'
import { Link } from 'react-router-dom'

const WomenMenu = props => {

    const { setDisplayWomen, hidden } = props


    return (
        <div className="container mx-auto px-4 bg-white h-96" style={{ boxShadow: "0px 20px 46px 0 rgba(0, 0, 0, 0.15)" }}>
            <div className="grid gap-8 grid-cols-6 px-5">
                <div className="mt-7.75 mb-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Women's Clothing</p>


                    <Link to="/category/dress" className="mt-5 block" onClick={() => setDisplayWomen(hidden)}><span className="menu-text">Women's Innerwear</span></Link>
                    <Link to="/category/women-s-tops" className="mt-3 block" onClick={() => setDisplayWomen(hidden)}><span className="menu-text">Women's Tops</span></Link>
                    <Link to="/category/women-s-palazzo" className="mt-3 block" onClick={() => setDisplayWomen(hidden)}><span className="menu-text">Women's Palazzo</span></Link>


                    {/* <p className="mt-3"><span className="menu-text">Salwar Kameez</span></p>
                    <p className="mt-3"><span className="menu-text">Kurtis & Tops</span></p>
                    <p className="mt-3"><span className="menu-text">T-Shirts</span></p>
                    <p className="mt-3"><span className="menu-text">Leggings & Plazzo</span></p>
                    <p className="mt-3"><span className="menu-text">Pants & Pajama's</span></p>
                    <p className="mt-3"><span className="menu-text">Hijab & Khimar</span></p>
                    <p className="mt-3"><span className="menu-text">Innerwears</span></p> */}
                </div>
                <div className="mt-7.75 mb-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Women's Footwear</p>


                    <Link to="/category/sports-shoes" className="mt-5 inline-block" onClick={() => setDisplayWomen(hidden)}><span className="menu-text">Sports Shoes</span></Link>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Women's Footwear</p>
                    <p className="mt-5"><span className="menu-text">Flat Sandals</span></p>
                    <p className="mt-3"><span className="menu-text">Casual Shoes</span></p>
                    <p className="mt-3"><span className="menu-text">Sport Shoes</span></p>
                    <p className="mt-3"><span className="menu-text">Heels</span></p>
                    <p className="mt-3"><span className="menu-text">Flat Shoes</span></p>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Women's Watches</p>
                    <p className="mt-5"><span className="menu-text">Original Watches</span></p>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Accessories</p>
                    <p className="mt-5"><span className="menu-text">Hand Bags</span></p>
                    <p className="mt-3"><span className="menu-text">Sunglasses</span></p>
                    <p className="mt-3"><span className="menu-text">Purse & Wallets</span></p>
                    <p className="mt-3"><span className="menu-text">Mirror & Comb</span></p>
                    <p className="mt-3"><span className="menu-text">Women's Backpack</span></p>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Jwellery</p>
                    <p className="mt-5"><span className="menu-text">Rings</span></p>
                    <p className="mt-3"><span className="menu-text">Necklaces</span></p>
                    <p className="mt-3"><span className="menu-text">Pendants</span></p>
                    <p className="mt-3"><span className="menu-text">Earrings</span></p>
                    <p className="mt-3"><span className="menu-text">Jwellery Sets</span></p>
                    <p className="mt-3"><span className="menu-text">Bracelets</span></p>
                </div>
                <div className="mt-7.75 hidden">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Beauty & Care</p>
                    <p className="mt-5"><span className="menu-text">Women's Perfume</span></p>
                    <p className="mt-3"><span className="menu-text">Body Mist</span></p>
                    <p className="mt-3"><span className="menu-text">Deodorant</span></p>
                    <p className="mt-3"><span className="menu-text">Skin Care</span></p>
                    <p className="mt-3"><span className="menu-text">Hair Care</span></p>
                    <p className="mt-3"><span className="menu-text">Body Care</span></p>
                    <p className="mt-3"><span className="menu-text">Makeup</span></p>
                </div>
            </div>
        </div>
    )
}

export default WomenMenu
