import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import BillingAddress from "../Components/PageComponents/CheckoutPage/BillingAddress";
import OrderDetailsCheckout from "../Components/PageComponents/CheckoutPage/OrderDetailsCheckout";

const CheckoutPage = () => {
    const { pathname } = useLocation();
    const { token, customerData } = useSelector(state => state.authInfo)

    const [allAddress, setAllAddress] = useState(null)

    useEffect(() => {
        if (token != null && customerData != null) {
            axios.get(`/order/address-appear/${customerData.id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log("manto", response.data)
                setAllAddress(response.data)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [token, customerData])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="container mx-auto pl-4 pr-4 md:pr-7 mt-20 md:mt-0">
            <div className="container mx-auto mt-6">
                <ol className="list-reset flex text-sm font-medium font-Poppins">
                    <li>
                        <Link to="/" className="text-logobarElementBG">
                            Home
                        </Link>
                    </li>
                    <li>
                        <span className="mx-2 text-mutedText">/</span>
                    </li>
                    <li className="text-mutedText">Checkout</li>
                </ol>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
                <div className="col-span-10 xxs:col-span-11 xs:col-span-12 md:col-span-7">
                    <p className="font-Poppins font-semibold text-xl uppercase mb-4 text-center pt-4">
                        billing details
                    </p>
                    <BillingAddress allAddress={allAddress} />
                </div>

                <div className="col-span-10 xxs:col-span-11 xs:col-span-12 md:col-span-5">
                    <OrderDetailsCheckout />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
