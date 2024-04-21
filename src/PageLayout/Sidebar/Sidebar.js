import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import { GoChevronRight, GoChevronDown } from "react-icons/go"

const Sidebar = props => {

    const { isOpen, sidebarRef, setIsOpen } = props

    const testActive = "fixed top-0 left-0 h-screen w-3/4 bg-white transform transition-all duration-500 z-10 bg-white overflow-y-scroll pb-8 shadow-2xl md:hidden"
    const testHidden = "absolute top-0 left-0 h-screen w-40 transform transition-all duration-500 opacity-0 -translate-x-114 z-10"

    const [allCategory, setAllCategory] = useState(false)

    const [menCategoryOpen, setMenCategoryOpen] = useState(false)
    const [menClothingOpen, setMenClothingOpen] = useState(false)
    const [menWatch, setMenWatch] = useState(false)
    const [menFootware, setMenFootware] = useState(false)
    const [menCare, setMenCare] = useState(false)
    const [menAccessories, setMenAccessories] = useState(false)

    const [womenCategory, setWomenCategory] = useState(false)
    const [womenClothing, setWomenClothing] = useState(false)
    const [womenFootware, setWomenFootware] = useState(false)
    const [womenWatch, setWomenWatch] = useState(false)
    const [womenAccessories, setWomenAccessories] = useState(false)
    const [womenJwellery, setWomenJwellery] = useState(false)
    const [womenBeauty, setWomenBeauty] = useState(false)

    const [boysGirlsCategory, setBoysGirlsBabyCategory] = useState(false)
    const [boysClothing, setBoysClothing] = useState(false)
    const [girlsClothing, setGirlsClothing] = useState(false)
    const [kidsFootwear, setKidsFootwear] = useState(false)
    const [boysAccessories, setBoysAccessories] = useState(false)
    const [boysToys, setBoysToys] = useState(false)

    const [motherCare, setMotherCare] = useState(false)
    const [motherCareIndividual, setMotherCareIndividual] = useState(false)
    const [babyCare, setBabyCare] = useState(false)
    const [nursing, setNursing] = useState(false)
    const [babyFood, setBabyFood] = useState(false)

    const [personalCare, setPersonalCare] = useState(false)
    const [personalMenCare, setPersonalMenCare] = useState(false)
    const [personalWomenCare, setPersonalWomenCare] = useState(false)
    const [personalBabyCare, setPersonalBabyCare] = useState(false)
    const [personalMotherCare, setPersonalMotherCare] = useState(false)

    useEffect(() => {
        if (isOpen === false) {
            setAllCategory(false)
            setMenCategoryOpen(false)
            setMenClothingOpen(false)
            setMenWatch(false)
            setMenFootware(false)
            setMenCare(false)
            setMenAccessories(false)
            setWomenCategory(false)
            setWomenClothing(false)
            setWomenFootware(false)
            setWomenWatch(false)
            setWomenAccessories(false)
            setWomenJwellery(false)
            setWomenBeauty(false)
            setBoysGirlsBabyCategory(false)
            setBoysClothing(false)
            setGirlsClothing(false)
            setKidsFootwear(false)
            setBoysAccessories(false)
            setBoysToys(false)
            setMotherCare(false)
            setMotherCareIndividual(false)
            setBabyCare(false)
            setNursing(false)
            setBabyFood(false)
            setPersonalCare(false)
            setPersonalMenCare(false)
            setPersonalWomenCare(false)
            setPersonalBabyCare(false)
            setPersonalMotherCare(false)
        }
    }, [isOpen])

    return (
        <div className={isOpen ? testActive : testHidden} ref={sidebarRef}>
            <div className="mx-6 mt-8">
                <p className="text-3xl font-medium font-Poppins">Menu</p>

                {/* All Category Section Start */}

                <div className="flex mt-8 items-center justify-between" onClick={() => setAllCategory(prevState => !prevState)}>
                    <p className="font-Poppins font-bold text-base">All Categories</p>
                    {allCategory ? <GoChevronDown /> : <GoChevronRight />}
                </div>

                <div className={allCategory ? "block ml-4 mt-4" : "hidden"}>
                    <div className="flex justify-between items-center">
                        <Link to="/men" className="font-Poppins font-medium" onClick={() => setIsOpen(prevState => !prevState)}>Men's</Link>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-Poppins font-medium">Women's</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-Poppins font-medium">Boys & Girls</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-Poppins font-medium">Mother's Care</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-Poppins font-medium">Personal Care</p>
                    </div>
                </div>

                {/* All Category Section Finish */}


                {/* Mens Category Design Start*/}

                <div className="flex mt-4 items-center justify-between" onClick={() => setMenCategoryOpen(prevState => !prevState)}>
                    <Link to="/men" className="font-Poppins font-bold text-base" onClick={() => setIsOpen(prevState => !prevState)}>Men's</Link>
                    {menCategoryOpen ? <GoChevronDown /> : <GoChevronRight />}
                </div>

                <div className={menCategoryOpen ? "block ml-4 mt-4" : "hidden"}>

                    <div className="flex justify-between items-center" onClick={() => setMenClothingOpen(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Men's Clothing</p>
                        {menClothingOpen ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={menClothingOpen ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Men's Shirts</p>
                        <p className="mt-2">Men's T-Shirts</p>
                        <p className="mt-2">Men's Polo Shirts</p>
                        <p className="mt-2">Men's Ethnic</p>
                        <p className="mt-2">Men's Pants</p>
                        <p className="mt-2">Men's Innerwear</p>
                        <p className="mt-2">Men's Tank Top</p>
                        <p className="mt-2">Winter</p>
                    </div>

                    <div className="flex justify-between mt-2 items-center" onClick={() => setMenWatch(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Men's Watches</p>
                        {menWatch ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={menWatch ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Original Watches</p>
                        <p className="mt-2">Smart Watches</p>
                    </div>

                    <div className="flex justify-between mt-2 items-center" onClick={() => setMenFootware(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Men's Footware</p>
                        {menFootware ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={menFootware ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Sandals</p>
                        <p className="mt-2">Sports Sandals</p>
                        <p className="mt-2">Formal Shoes</p>
                        <p className="mt-2">Casual Shoes</p>
                        <p className="mt-2">Sports Shoes</p>
                        <p className="mt-2">Converse/ Sneakers</p>
                        <p className="mt-2">Boots</p>
                        <p className="mt-2">Loafers</p>
                    </div>

                    <div className="flex justify-between mt-2 items-center" onClick={() => setMenCare(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Men's Care</p>
                        {menCare ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={menCare ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Men's Perfume</p>
                        <p className="mt-2">Men's Deodorant</p>
                        <p className="mt-2">Skin Care</p>
                        <p className="mt-2">Hair Care</p>
                        <p className="mt-2">Body Care</p>
                        <p className="mt-2">Shaving & Grooming Needs</p>
                    </div>

                    <div className="flex justify-between mt-2 items-center" onClick={() => setMenAccessories(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Men's Accessories</p>
                        {menAccessories ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={menAccessories ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Belts</p>
                        <p className="mt-2">Wallets</p>
                        <p className="mt-2">Sunglasses</p>
                        <p className="mt-2">Hats & Caps</p>
                        <p className="mt-2">Ties & Bow Ties</p>
                        <p className="mt-2">Bags</p>
                    </div>
                </div>

                {/* Mens Category Design Finished */}

                {/* Womens Category Design Start*/}

                <div className="flex mt-4 items-center justify-between" onClick={() => setWomenCategory(prevState => !prevState)}>
                    <p className="font-Poppins font-bold text-base">Women</p>
                    {womenCategory ? <GoChevronDown /> : <GoChevronRight />}
                </div>

                <div className={womenCategory ? "block ml-4 mt-4" : "hidden"}>
                    <div className="flex justify-between items-center" onClick={() => setWomenClothing(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Women's Clothing</p>
                        {womenClothing ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={womenClothing ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Saree</p>
                        <p className="mt-2">Salwar Kameez</p>
                        <p className="mt-2">Kurtis & Tops</p>
                        <p className="mt-2">T-Shirts</p>
                        <p className="mt-2">Leggings & Plazzo</p>
                        <p className="mt-2">Pants & Pajama's</p>
                        <p className="mt-2">Hijab & Khimar</p>
                        <p className="mt-2">Innerwears</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setWomenFootware(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Footware</p>
                        {womenFootware ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={womenFootware ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Flat Sandals</p>
                        <p className="mt-2">Casual Shoes</p>
                        <p className="mt-2">Sport Shoes</p>
                        <p className="mt-2">Heels</p>
                        <p className="mt-2">Flat Shoes</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setWomenWatch(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Women's Watches</p>
                        {womenWatch ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={womenWatch ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Original Watches</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setWomenAccessories(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Women's Accessories</p>
                        {womenAccessories ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={womenAccessories ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Hand Bags</p>
                        <p className="mt-2">Sunglasses</p>
                        <p className="mt-2">Purse & Wallets</p>
                        <p className="mt-2">Mirror & Comb</p>
                        <p className="mt-2">Women's Backpack</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setWomenJwellery(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Jwellery</p>
                        {womenJwellery ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={womenJwellery ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Hand Bags</p>
                        <p className="mt-2">Rings</p>
                        <p className="mt-2">Necklaces</p>
                        <p className="mt-2">Pendants</p>
                        <p className="mt-2">Earrings</p>
                        <p className="mt-2">Jwellery Sets</p>
                        <p className="mt-2">Bracelets</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setWomenBeauty(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Beauty & Care</p>
                        {womenBeauty ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={womenBeauty ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Women's Perfumes</p>
                        <p className="mt-2">Body Mist</p>
                        <p className="mt-2">Deodorant</p>
                        <p className="mt-2">Skin Care</p>
                        <p className="mt-2">Hair Care</p>
                        <p className="mt-2">Body Care</p>
                        <p className="mt-2">Makeup</p>
                    </div>

                </div>

                {/* Womens Category Design Finished*/}

                {/* Boys and Girls Category Design Start*/}

                <div className="flex mt-4 items-center justify-between" onClick={() => setBoysGirlsBabyCategory(prevState => !prevState)}>
                    <p className="font-Poppins font-bold text-base">Boys & Girls</p>
                    {boysGirlsCategory ? <GoChevronDown /> : <GoChevronRight />}
                </div>

                <div className={boysGirlsCategory ? "block ml-4 mt-4" : "hidden"}>

                    <div className="flex justify-between items-center" onClick={() => setBoysClothing(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Boy's Clothing</p>
                        {boysClothing ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={boysClothing ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Boy's T-Shirts</p>
                        <p className="mt-2">Boy's Shirts</p>
                        <p className="mt-2">Boy's Polos</p>
                        <p className="mt-2">Boy's Panjabis</p>
                        <p className="mt-2">Boy's Pants</p>
                        <p className="mt-2">Boy's Tank Top</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setGirlsClothing(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Girls's Clothing</p>
                        {girlsClothing ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={girlsClothing ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Girl's Frock</p>
                        <p className="mt-2">Girl's T-shirt</p>
                        <p className="mt-2">Girl's Tops</p>
                        <p className="mt-2">Girl's Party Dresses</p>
                        <p className="mt-2">Girl's Pants</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setKidsFootwear(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Kids's Footware</p>
                        {kidsFootwear ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={kidsFootwear ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Boy's Footwear</p>
                        <p className="mt-2">Girls's Footwear</p>
                        <p className="mt-2">Baby's Footwear</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setBoysAccessories(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Accessories</p>
                        {boysAccessories ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={boysAccessories ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Kid's Bags</p>
                        <p className="mt-2">Kid's Sunglasses</p>
                        <p className="mt-2">Kid's Watches</p>
                        <p className="mt-2">School Tiffin Box</p>
                        <p className="mt-2">Water Pot</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setBoysToys(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Toys</p>
                        {boysToys ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={boysToys ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Indoor Toys</p>
                        <p className="mt-2">Outdoor Toys</p>
                        <p className="mt-2">Sports & Rocker Toys</p>
                        <p className="mt-2">Remote Control Toys</p>
                        <p className="mt-2">Educational Toys</p>
                        <p className="mt-2">Baby Chair & Table</p>
                        <p className="mt-2">Science Kits</p>
                        <p className="mt-2">Baby Walkers</p>
                    </div>

                </div>

                {/* Boys and Girls Category Design Finished*/}

                {/* Mothers Care Category Design start*/}

                <div className="flex mt-4 items-center justify-between" onClick={() => setMotherCare(prevState => !prevState)}>
                    <p className="font-Poppins font-bold text-base">Mother Care</p>
                    {motherCare ? <GoChevronDown /> : <GoChevronRight />}
                </div>

                <div className={motherCare ? "block ml-4 mt-4" : "hidden"}>

                    <div className="flex justify-between items-center" onClick={() => setMotherCareIndividual(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Mother's Care</p>
                        {motherCareIndividual ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={motherCareIndividual ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Maternity Clothes</p>
                        <p className="mt-2">Pregnancy Essentials</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setBabyCare(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Baby's Care</p>
                        {babyCare ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={babyCare ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Baby Toiletries</p>
                        <p className="mt-2">Baby Feeds</p>
                        <p className="mt-2">Skin Care</p>
                        <p className="mt-2">Hair Care</p>
                        <p className="mt-2">Potty Training</p>
                        <p className="mt-2">Health & Safety</p>
                        <p className="mt-2">Baby Grooming</p>
                        <p className="mt-2">Bathing Accessories</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setNursing(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Nursing & Feeding</p>
                        {nursing ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={nursing ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Baby Feeding Bottle</p>
                        <p className="mt-2">Nipple</p>
                        <p className="mt-2">Water Bottle, Flask & Glass</p>
                        <p className="mt-2">Teether, Pacifier & Spoon</p>
                        <p className="mt-2">Baby Plate, Bowl & Jar</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setBabyFood(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Baby Food</p>
                        {babyFood ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={babyFood ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Baby Cereal</p>
                        <p className="mt-2">Baby Milk</p>
                    </div>

                </div>

                {/* Mothers Care Category Design finish*/}

                {/* Personal Care Category Design start*/}

                <div className="flex mt-4 items-center justify-between" onClick={() => setPersonalCare(prevState => !prevState)}>
                    <p className="font-Poppins font-bold text-base">Personal Care</p>
                    {personalCare ? <GoChevronDown /> : <GoChevronRight />}
                </div>

                <div className={personalCare ? "block ml-4 mt-4" : "hidden"}>

                    <div className="flex justify-between items-center" onClick={() => setPersonalMenCare(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Men's Care</p>
                        {personalMenCare ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={personalMenCare ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Men's Perfume</p>
                        <p className="mt-2">Men's Deodorant</p>
                        <p className="mt-2">Skin Care</p>
                        <p className="mt-2">Hair Care</p>
                        <p className="mt-2">Body Care</p>
                        <p className="mt-2">Shaving & Grooming Needs</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setPersonalWomenCare(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Women's Care</p>
                        {personalWomenCare ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={personalWomenCare ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Women's Perfume</p>
                        <p className="mt-2">Body Mist</p>
                        <p className="mt-2">Deodorant</p>
                        <p className="mt-2">Skin Care</p>
                        <p className="mt-2">Hair Care</p>
                        <p className="mt-2">Body Care</p>
                        <p className="mt-2">Makeup</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setPersonalBabyCare(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Baby Care</p>
                        {personalBabyCare ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={personalBabyCare ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p>Baby Toiletries</p>
                        <p className="mt-2">Baby Feeds</p>
                        <p className="mt-2">Skin Care</p>
                        <p className="mt-2">Hair Care</p>
                        <p className="mt-2">Potty Training</p>
                        <p className="mt-2">Health & Safety</p>
                        <p className="mt-2">Baby Grooming</p>
                        <p className="mt-2">Bathing Accessories</p>
                    </div>

                    <div className="flex justify-between items-center mt-2" onClick={() => setPersonalMotherCare(prevState => !prevState)}>
                        <p className="font-Poppins font-medium">Mother's Care</p>
                        {personalMotherCare ? <GoChevronDown /> : <GoChevronRight />}
                    </div>
                    <div className={personalMotherCare ? "block ml-4 mt-4 font-Poppins" : "hidden"}>
                        <p className="mt-2">Maternity Clothes</p>
                        <p className="mt-2">Pregnancy Essentials</p>

                    </div>

                </div>

                {/* Personal Care Category Design Finish*/}

            </div>
        </div>
    )
}

export default Sidebar
