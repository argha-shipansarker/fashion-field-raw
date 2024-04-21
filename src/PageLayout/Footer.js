import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPinterestP } from "react-icons/fa"
import SSLCommerz from "../Assets/Images/PaymentLogo/sslCommerz.png"

import CompanyLogo from "../Assets/Images/CompanyLogo.png"
import CompanyName from "../Assets/Images/CompanyName.png"
import EmailIcon from "../Assets/Images/EmailIcon.png"
import HelpLineIcon from "../Assets/Images/HelpLineIcon.png"
import LocationIcon from "../Assets/Images/LocationIcon.png"
import Bkash from "../Assets/Images/bkash.png"
import CityBank from "../Assets/Images/cityBank.png"
import Discover from "../Assets/Images/discover.png"
import MasterCard from "../Assets/Images/masterCard.png"
import Nagad from "../Assets/Images/nagad.png"
import PayPal from "../Assets/Images/payPal.png"
import Rocket from "../Assets/Images/rocket.png"
import Skrill from "../Assets/Images/skrill.png"
import Visa from "../Assets/Images/visa.png"
import { urlHelper } from '../urlHelper'


const Footer = ({ appearances, menus }) => {

    // console.log("===============================", appearances)

    return (
        <div className="container mx-auto px-4 mt-10">
            <div className="grid gap-y-8 grid-cols-1 md:grid-cols-2">
                <div>
                    <div className="flex items-center">
                        <div className="w-23 h-15 mr-4">
                            <img src={CompanyLogo} alt="Company Logo" />
                        </div>
                        <div className="w-59 h-8">
                            <img src={CompanyName} alt="Company Name" />
                        </div>
                    </div>

                    <div className="flex items-center mt-8">
                        <div className="w-5 h-7 mr-3.5">
                            <img src={LocationIcon} alt="Location Icon" className="w-full" />
                        </div>
                        {appearances.filter(item => item.key === 'address').map((data, index) => (<p className='font-DMSans text-topBarTextColor text-base font-medium' key={index}>{data.value}</p>))}
                        {/* <p className="font-DMSans text-topBarTextColor text-base font-medium">45, Shah Makhdum Avenue, Sector 12, Uttara, Dhaka</p> */}
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-5 h-7 mr-3.5">
                            <img src={HelpLineIcon} alt="Help line Icon" className="w-full" />
                        </div>
                        {appearances.filter(item => item.key === 'contact').map((data, index) => (<p className='font-DMSans text-topBarTextColor text-base font-medium'><a href={`tel:+${data.value}`}>{data.value}</a></p>))}
                        {/* <p className="font-DMSans text-topBarTextColor text-base font-medium">01713-344232, 01713-344232</p> */}
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-5 h-7 mr-3.5">
                            <img src={EmailIcon} alt="Email Icon" className="w-full" />
                        </div>
                        {appearances.filter(item => item.key === 'email').map((data, index) => (<p className='font-DMSans text-topBarTextColor text-base font-medium'>{data.value}</p>))}
                        {/* <p className="font-DMSans text-topBarTextColor text-base font-medium">support@fashionfield.net</p> */}
                    </div>

                    {/* <div className="flex items-center mt-4">
                        <div className="h-7 mr-3.5">
                            <p className='font-DMSans text-topBarTextColor text-base font-bold'>Registered Name:</p>
                        </div>
                        {
                            appearances.filter(item => item.key === "registered_name").map((data, index) => (
                                <p className='font-DMSans text-topBarTextColor text-base font-medium'>{data.value}</p>
                            ))
                        }
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="h-7 mr-3.5">
                            <p className='font-DMSans text-topBarTextColor text-base font-bold'>Incorporation No:</p>
                        </div>
                        {
                            appearances.filter(item => item.key === "incorporation_no").map((data, index) => (
                                <p className='font-DMSans text-topBarTextColor text-base font-medium'>{data.value}</p>
                            ))
                        }
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="h-7 mr-3.5">
                            <p className='font-DMSans text-topBarTextColor text-base font-bold'>Trade License Number:</p>
                        </div>
                        {
                            appearances.filter(item => item.key === "trade_license_number").map((data, index) => (
                                <p className='font-DMSans text-topBarTextColor text-base font-medium'>{data.value}</p>
                            ))
                        }
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="h-7 mr-3.5">
                            <p className='font-DMSans text-topBarTextColor text-base font-bold'>Vat Registration Number:</p>
                        </div>
                        {
                            appearances.filter(item => item.key === "vat_registration_number").map((data, index) => (
                                <p className='font-DMSans text-topBarTextColor text-base font-medium'>{data.value}</p>
                            ))
                        }
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="h-7 mr-3.5">
                            <p className='font-DMSans text-topBarTextColor text-base font-bold'>E-TIN:</p>
                        </div>
                        {
                            appearances.filter(item => item.key === "e_tin_number").map((data, index) => (
                                <p className='font-DMSans text-topBarTextColor text-base font-medium'>{data.value}</p>
                            ))
                        }
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="h-7 mr-3.5">
                            <p className='font-DMSans text-topBarTextColor text-base font-bold'>E-Cab Membership No:</p>
                        </div>
                        {
                            appearances.filter(item => item.key === "e-cab_membership_no").map((data, index) => (
                                <p className='font-DMSans text-topBarTextColor text-base font-medium'>{data.value}</p>
                            ))
                        }
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="h-7 mr-3.5">
                            <p className='font-DMSans text-topBarTextColor text-base font-bold'>BASIS Membership:</p>
                        </div>
                        {
                            appearances.filter(item => item.key === "BASIS_membership").map((data, index) => (
                                <p className='font-DMSans text-topBarTextColor text-base font-medium'>{data.value}</p>
                            ))
                        }
                    </div> */}


                    <div className="flex mt-8 items-center">
                        <p className='font-DMSans text-topBarTextColor text-base font-medium mr-6'>Social Media</p>
                        {appearances.filter((item) => item.key === "facebook").map((data, index) => (
                            <a href={data.value} target="_blank" className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                <FaFacebookF />
                            </a>
                        ))}
                        {/* <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                            <FaFacebookF />
                        </button> */}
                        {appearances.filter((item) => item.key === "twitter").map((data, index) => (
                            <a href={data.value} target="_blank" className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                <FaTwitter />
                            </a>
                        ))}
                        {/* <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                            <FaTwitter />
                        </button> */}

                        {appearances.filter((item) => item.key === "youtube").map((data, index) => (
                            <a href={data.value} target="_blank" className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                <FaYoutube />
                            </a>
                        ))}
                        {/* <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                            <FaYoutube />
                        </button> */}

                        {appearances.filter((item) => item.key === "instagram").map((data, index) => (
                            <a href={data.value} target="_blank" className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                <FaInstagram />
                            </a>
                        ))}
                        {/* <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                            <FaInstagram />
                        </button> */}
                        {appearances.filter((item) => item.key === "pinterest").map((data, index) => (
                            <a href={data.value} target="_blank" className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center mr-2.5 hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                                <FaPinterestP />
                            </a>
                        ))}
                        {/* <button className="w-10 h-10 border-1 border-topBarVerticalSeperator rounded-2.5xl flex justify-center items-center hover:bg-logobarElementBG hover:text-white text-topBarTextColor">
                            <FaPinterestP />
                        </button> */}
                    </div>
                </div>
                <div className="grid gap-y-8 gap-x-4 grid-cols-1 md:grid-cols-3">
                    {menus?.map((item, index) => (
                        <div>
                            <p className="font-Poppins text-topBarTextColor font-semibold text-lg">{item.title}</p>
                            <div className="w-13 h-1.5 bg-logobarElementBG rounded-lg mt-2"></div>

                            {item?.items?.map((menu, index) => {
                                return (
                                    <Link to={urlHelper(menu.slug, menu.type)}><p className="mt-3"><span className="footer-text">{menu.name}</span></p></Link>
                                )
                            })}
                            {/* <p className="mt-3"><span className="footer-text">About Us</span></p>
                        <p className="mt-6 md:mt-9"><span className="footer-text">Home</span></p>
                        <Link to="/content-page/about-us" className="mt-3 block"><span className="footer-text">About Us</span></Link>

                        <p className="mt-6 md:mt-9"><span className="footer-text">Home</span></p>
                        <Link to="/content-page/about-us" className="mt-3 block"><span className="footer-text">About Us</span></Link>

                        <Link to="/contact-us" className="mt-3 inline-block"><span className="footer-text">Contact Us</span></Link>
                        <p className="mt-3"><span className="footer-text">Our Blog</span></p>
                        <p className="mt-3"><span className="footer-text">Support Center</span></p>
                        <p className="mt-3"><span className="footer-text">Privacy Policy</span></p> */}
                        </div>
                    ))}

                    {/* <div>
                        <p className="font-Poppins text-topBarTextColor font-semibold text-lg">Support</p>
                        <div className="w-13 h-1.5 bg-logobarElementBG rounded-lg mt-2"></div>
                        <p className="mt-6 md:mt-9"><span className="footer-text">Delivery Product</span></p>
                        <Link to="/order/tracking/order-search" className="mt-3 inline-block"><span className="footer-text">Order Tracking</span></Link>
                        <p className="mt-3"><span className="footer-text">Return & Refund</span></p>
                        <p className="mt-3"><span className="footer-text">Shipping & Replacement</span></p>
                        <p className="mt-3"><span className="footer-text">Help Center</span></p>
                        <p className="mt-3"><span className="footer-text">Live Chat</span></p>
                    </div>
                    <div>
                        <p className="font-Poppins text-topBarTextColor font-semibold text-lg">Useful Links</p>
                        <div className="w-13 h-1.5 bg-logobarElementBG rounded-lg mt-2"></div>
                        <Link className="mt-6 md:mt-9 inline-block" to="/frequently-asking-questions"><span className="footer-text">FAQ</span></Link>
                        <p className="mt-3"><span className="footer-text">Privacy Policy</span></p>
                        <p className="mt-3"><span className="footer-text">Cookie Policy</span></p>
                        <p className="mt-3"><span className="footer-text">Safe Payments</span></p>
                        <p className="mt-3"><span className="footer-text">Purchasing Policy</span></p>
                        <p className="mt-3"><span className="footer-text">Terms of Service</span></p>
                    </div> */}
                </div>
            </div>
            {/* <div className="grid gap-y-4 grid-cols-1 md:grid-cols-2 mt-10">
                <div className="flex items-center justify-center md:ml-auto">
                    <img src={Bkash} alt="Bkash" className="mr-4" />
                    <img src={Nagad} alt="Bkash" className="mr-4" />
                    <img src={Rocket} alt="Bkash" className="mr-4" />
                    <img src={CityBank} alt="Bkash" className="mr-4" />
                    <img src={Visa} alt="Bkash" className="mr-4" />
                </div>
                <div className="flex items-center justify-center md:mr-auto">
                    <img src={MasterCard} alt="Bkash" className="mr-4" />
                    <img src={PayPal} alt="Bkash" className="mr-4" />
                    <img src={Discover} alt="Bkash" className="mr-4" />
                    <img src={Skrill} alt="Bkash" />
                </div>
            </div> */}
            <div className='flex justify-center mt-10'>
                <a target="_blank" href="https://www.sslcommerz.com/" title="SSLCommerz" alt="SSLCommerz">
                    <img src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-03.png" />
                </a>
            </div>

            {/* <div className='flex justify-center mt-10  md:hidden'>
                <a target="_blank" href="https://www.sslcommerz.com/" title="SSLCommerz" alt="SSLCommerz">
                    <img src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-04.png" />
                </a>
            </div> */}
        </div>
    )
}

export default Footer
