import React from 'react'
import { Link } from 'react-router-dom'

const AllCategoryMenu = props => {
    const { setDisplayAllCategory, hidden } = props

    return (
        <div className="container mx-auto px-4 bg-white h-96" style={{ boxShadow: "0px 20px 46px 0 rgba(0, 0, 0, 0.15)" }}>
            <div className="grid gap-8 grid-cols-6 px-5">
                <div className="mt-7.75 mb-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Men</p>

                    <Link to="/sub-category/men-s-clothing" className="mt-5 inline-block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Men's Clothing</span></Link>

                    {/* <Link to="/sub-category/men-s-watches" className="mt-3 inline-block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Men's Watches</span></Link> */}

                    <Link to="/sub-category/men-s-footwear" className="mt-3 inline-block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Men's Footware</span></Link>

                    {/* <Link to="/sub-category/men-s-inner" className="mt-3 inline-block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Men's Inner</span></Link> */}

                    {/* <Link to="/sub-category/men-s-accessories" className="mt-3 inline-block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Men's Accessories</span></Link> */}

                </div>
                <div className="mt-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Women</p>

                    <Link to="/sub-category/women-s-clothing" className="mt-5 inline-block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Women's Clothing</span></Link>
                    <Link to="/sub-category/women-s-footwear" className="mt-3 inline-block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Women's Footwear</span></Link>

                    {/* <p className="mt-3"><span className="menu-text">Women's Footware</span></p>
                    <p className="mt-3"><span className="menu-text">Women's Watches</span></p>
                    <p className="mt-3"><span className="menu-text">Women's Accessories</span></p>
                    <p className="mt-3"><span className="menu-text">Women's Jwellery</span></p>
                    <p className="mt-3"><span className="menu-text">Women's Beauty & Care</span></p> */}

                </div>
                <div className="mt-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Boys</p>
                    <Link to="/sub-category/boy-s-clothing" className="mt-5 inline-block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Boy's Clothing</span></Link>

                    <p className="mt-5"><span className="menu-text hidden">Boy's Clothing</span></p>
                    <p className="mt-3"><span className="menu-text hidden">Girl's Clothing</span></p>
                    <p className="mt-3"><span className="menu-text hidden">Kids Footwear</span></p>
                    <p className="mt-3"><span className="menu-text hidden">Accessories</span></p>
                    <p className="mt-3"><span className="menu-text hidden">Toys</span></p>
                </div>

                <div className="mt-7.75">

                <p className="font-Poppins font-bold text-topBarTextColor text-base">Girls</p>

                <Link to="/sub-category/clothing" className="mt-5 block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Clothing</span></Link>
                <Link to="/sub-category/accessories" className="mt-3 block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}> Accessories </span></Link>

                    {/* <p className="font-Poppins font-bold text-topBarTextColor text-base">Mother's Care</p>


                    <Link to="/sub-category/clothing" className="mt-5 inline-block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Clothing</span></Link>

                    <Link to="/sub-category/accessories" className="mt-3 inline-block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Accessories</span></Link> */}


                    {/* <p className="mt-3"><span className="menu-text">Baby's Care</span></p>
                    <p className="mt-3"><span className="menu-text">Nursing & Feeding</span></p>
                    <p className="mt-3"><span className="menu-text">Baby Food</span></p> */}

                </div>

                {/* <div className="mt-7.75">
                    <p className="font-Poppins font-bold text-topBarTextColor text-base">Personal Care</p>

                    <Link to="/sub-category/clothing-2" className="mt-5 inline-block"><span className="menu-text" onClick={() => setDisplayAllCategory(hidden)}>Clothing</span></Link>

                </div> */}
                <div className="mt-7.75">

                </div>
            </div>
        </div>
    )
}

export default AllCategoryMenu
