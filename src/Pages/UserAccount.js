import React, { useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

import AccountSummary from '../Components/PageComponents/UserAccount/AccountSummary'
import OrderSummary from '../Components/PageComponents/UserAccount/OrderSummary'
import AddressSummary from '../Components/PageComponents/UserAccount/AddressSummary'
import ReviewSummary from '../Components/PageComponents/UserAccount/ReviewSummary'
import AccountInfoEdit from '../Components/PageComponents/UserAccount/AccountInfoEdit'
import WishlistSummary from '../Components/PageComponents/UserAccount/WishlistSummary'
import OrderReturns from '../Components/PageComponents/UserAccount/OrderReturns'
import OrderCancellation from '../Components/PageComponents/UserAccount/OrderCancellation'

import AddingNewAddress from '../Components/PageComponents/UserAccount/AddingNewAddress'

import ReviewedProducts from '../Components/PageComponents/UserAccount/ReviewedProducts'
import UnReviewedProducts from '../Components/PageComponents/UserAccount/UnReviewedProducts'

const UserAccount = () => {


    const { slug } = useParams()

    useEffect(() => {
        console.log(slug)
    }, [slug])


    const handlingLogOut = () => {
        localStorage.removeItem("FFtoken")
        window.location.replace("/")
    }



    return (
        <div className="my-account mt-20 md:mt-0">

            <div className="container mx-auto pl-4 pr-4 md:pr-11">

                <ol className="list-reset flex text-sm font-medium font-Poppins mt-4 mb-4">
                    <li><Link to="/" className="text-logobarElementBG">Home</Link></li>
                    <li><span className="mx-2 text-mutedText">/</span></li>
                    <li className="text-mutedText">My Account</li>
                </ol>

                <hr />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 gap-y-8 mt-8">

                    <div className="col-span-12 md:col-span-3">
                        <div className="border-1 rounded-lg border-borderColor">
                            <div className="h-7 bg-topBarBG rounded-tl-lg rounded-tr-lg">

                            </div>

                            <div className="px-4 py-4">
                                <Link
                                    className={`mb-4 font-Poppins text-sm block ${slug == "account-info" ? "font-semibold" : "font-normal"}`}
                                    to="/customer/account-info"
                                >
                                    My Account
                                </Link>
                                <Link
                                    className={`mb-4 font-Poppins text-sm block ${slug == "orders" ? "font-semibold" : "font-normal"}`}
                                    to="/customer/orders"
                                >
                                    My Orders
                                </Link>

                                {/* <Link
                                    className={`mb-3 ml-4 font-Poppins text-sm block ${slug == "returns" ? "font-semibold" : "font-normal"}`}
                                    to="/customer/returns"
                                >
                                    My Returns
                                </Link>

                                <Link
                                    className={`mb-4 ml-4 font-Poppins text-sm block ${slug == "cancellations" ? "font-semibold" : "font-normal"}`}
                                    to="/customer/cancellations"
                                >
                                    My Cancellations
                                </Link> */}

                                <Link
                                    className={`mb-4 font-Poppins text-sm block ${slug == "address" || slug == "address-new" ? "font-semibold" : "font-normal"}`}
                                    to="/customer/address"
                                >
                                    Address Book
                                </Link>

                                <Link
                                    className={`mb-4 font-Poppins text-sm block ${slug == "reviews" ? "font-semibold" : "font-normal"}`}
                                    to="/customer/reviews"
                                >
                                    Product Reviews
                                </Link>


                                <Link
                                    className={`mb-3 ml-4 font-Poppins text-sm block ${slug == "reviewed-products" ? "font-semibold" : "font-normal"}`}
                                    to="/customer/reviewed-products"
                                >
                                    Reviewed Products
                                </Link>

                                <Link
                                    className={`mb-4 ml-4 font-Poppins text-sm block ${slug == "unreviewed-products" ? "font-semibold" : "font-normal"}`}
                                    to="/customer/unreviewed-products"
                                >
                                    Write a Review
                                </Link>


                                <Link
                                    className={`mb-4 font-Poppins text-sm block ${slug == "account-info-edit" ? "font-semibold" : "font-normal"}`}
                                    to="/customer/account-info-edit"
                                >
                                    Account Information
                                </Link>
                                <Link
                                    className={`mb-4 font-Poppins text-sm block ${slug == "wishlist" ? "font-semibold" : "font-normal"}`}
                                    to="/customer/wishlist"
                                >
                                    My Wishlist
                                </Link>
                                <p className="font-Poppins text-sm cursor-pointer" onClick={handlingLogOut}>Logout</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-9">
                        {slug == "account-info" && <AccountSummary />}
                        {slug == "orders" && <OrderSummary />}
                        {slug == "address" && <AddressSummary />}
                        {slug == "reviews" && <ReviewSummary />}
                        {slug == "account-info-edit" && <AccountInfoEdit />}
                        {slug == "wishlist" && <WishlistSummary />}
                        {slug == "address-new" && <AddingNewAddress />}
                        {/* {slug == "returns" && <OrderReturns />}
                        {slug == "cancellations" && <OrderCancellation />} */}
                        {slug == "reviewed-products" && <ReviewedProducts />}
                        {slug == "unreviewed-products" && <UnReviewedProducts />}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserAccount
