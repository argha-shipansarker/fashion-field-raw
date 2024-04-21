import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from "react-router-dom"
import axios from 'axios'

import VisaMaster from "../Assets/Images/PaymentLogo/visaMaster.png"

import Bkash from "../Assets/Images/PaymentLogo/bkash.svg"
import Nagad from "../Assets/Images/PaymentLogo/nagad.png"
import Rocket from "../Assets/Images/PaymentLogo/rocket.jpg"
import AccountBalance from "../Assets/Images/PaymentLogo/account-balance.jpg"
import COD from "../Assets/Images/PaymentLogo/COD.png"
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { savingAccountBalance } from "../ReduxStore/LogInFolder/UserInfo"

const OrderConfirmationPage = () => {

    const { token, accountBalance } = useSelector(state => state.authInfo)

    const { slug } = useParams()

    const [orderData, setOrderData] = useState(null)
    const [hasRestAmount, setRestAmountData] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token != null) {
            axios.get("/customer/profile",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        Accept: 'application/json',
                    }
                }).then(response => {
                    console.log(response)
                    dispatch(savingAccountBalance(response.data.balance))
                }).catch(errors => {
                    // console.log(errors.response)
                })
        }
    }, [token])

    const { pathname } = useLocation()
    // console.log(pathname)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    useEffect(() => {
        if (slug) {
            axios.get(`/orders/${slug}`, {
                headers: {
                    Accept: 'application/json',
                }
            }).then(response => {
                setOrderData(response.data)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [slug])

    const handlePaymentWithSSLCOMERZ = () => {
        const toastId = toast.info(<b>Payment processing....</b>, {
            autoClose: 5000,
        })
        axios.post("/payment-sslcommerz", {
            order_id: orderData.id
        }, {
            headers: {
                Accept: 'application/json',
            }
        }).then(response => {
            toast.dismiss(toastId);
            setRestAmountData(false)
            window.location.replace(response.data.GatewayPageURL)
        }).catch(errors => {
            console.log(errors.response)
        })
    }

    const handleCODPayment = () => {
        const toastId = toast.info(<b>Payment processing....</b>, {
            autoClose: 8000,
        })
        axios.post("/payment-cod", {
            order_id: orderData.id
        }, {
            headers: {
                Accept: 'application/json',
            }
        }).then(response => {
            toast.dismiss(toastId);
            setOrderData(response.data.order)
            setRestAmountData(false)
            toast.success(<b>Cash On Delivery Method Selected</b>, {
                autoClose: 2000,
            })
        }).catch(errors => {
            console.log(errors.response)
        })
    }

    const handleInvalidPayment = () => {
        toast.error(<b>Payment method not Supported</b>, {
            autoClose: 2000,
        })
    }


    const handleAccountBalancePayment = () => {
        axios.post("/payment-account-balance", { order_id: orderData.id }, {
            headers: {
                Authorization: "Bearer " + token,
                Accept: 'application/json',
            }
        }).then(response => {
            console.log(response)
            if (response.data['restAmount'] === 0) {
                setOrderData(response.data.order)
                dispatch(savingAccountBalance(response.data?.remainingBalance))
            }
            else {
                toast.warning(<b>{response.data.info}</b>)
                setOrderData(response.data.order)
                setRestAmountData(true)
                dispatch(savingAccountBalance(response.data?.remainingBalance))
            }
        }).catch(errors => {
            if (errors.response.status === 422) {
                Object.values(errors.response.data.errors).forEach(error => {
                    toast.error(<b>{error[0]}</b>, {
                        autoClose: 2000,
                    })
                });
            }
            else if (errors.response.status === 406 || errors.response.status === 411) {
                toast.error(<b>{errors.response.data.message}</b>, {
                    autoClose: 2000,
                })
            }
            else {
                toast.error(<b>Server issue occurred</b>, {
                    autoClose: 2000,
                })
            }
        })
    }


    return (
        <div className="container mx-auto pl-4 pr-4 md:pr-7 mt-20 md:mt-0">

            <div className="mt-6">
                <ol className="list-reset flex text-sm font-medium font-Poppins">
                    <li><Link to="/" className="text-logobarElementBG">Home</Link></li>
                    <li><span className="mx-2 text-mutedText">/</span></li>
                    <li className="text-mutedText">Order Summary</li>
                </ol>
            </div>

            <div className="h-20 mt-4 flex justify-center">
                <div>
                    {
                        (orderData && orderData.set_paid == false && orderData.payment_method == "") || hasRestAmount ? (
                            <p className="font-Poppins text-base font-bold">Choose a Payment Option from Below to Complete the Order</p>
                        ) : (
                            <div>
                                {
                                    orderData?.payment_method == "sslcommerz" && <>
                                        <p className="font-Poppins text-base"><span className="text-logobarElementBG font-medium">Thanks for the payment</span> your order is on your way.</p>
                                        <p className="font-Poppins text-base font-medium text-center mt-2">Order Number <span className="font-bold text-logobarElementBG">{slug}</span></p>
                                    </>
                                }
                                {
                                    orderData?.payment_method == "cod" && <>
                                        <p className='font-bold font-Poppins'>You have successfully placed an order!</p>
                                        <p className="font-Poppins text-base font-medium text-center mt-2">Order Number <span className="font-bold text-logobarElementBG">{slug}</span></p>
                                    </>
                                }

                                {
                                    orderData?.payment_method == "wallet" && <>
                                        <p className='font-bold font-Poppins'>You have successfully placed an order!</p>
                                        <p className="font-Poppins text-base font-medium text-center mt-2">Order Number <span className="font-bold text-logobarElementBG">{slug}</span></p>
                                    </>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            {
                orderData && <div className="mb-10 flex flex-col items-center justify-center">
                    {
                        (orderData.status == "Processing" && orderData.set_paid == false && orderData.payment_method == "") || hasRestAmount ? (
                            <div className='w-full'>
                                <p className="text-center font-bold text-xl text-logobarElementBG">Pay with</p>
                                <div className='h-40 flex justify-evenly w-full mt-6'>

                                    <div className="mt-3 cursor-pointer h-full w-40 border-1 rounded shadow-md" onClick={handleCODPayment}>
                                        <img src={COD} className='h-full w-full object-contain' />
                                    </div>

                                    <div className="mt-3 cursor-pointer h-full w-40 border-1 rounded shadow-md" onClick={handlePaymentWithSSLCOMERZ}>
                                        <img src={VisaMaster} className='h-full w-full object-contain' />
                                    </div>

                                    <div className="mt-3 cursor-pointer h-full w-40 border-1 rounded shadow-md" onClick={handleInvalidPayment}>
                                        <img src={Bkash} className='h-full w-full object-contain' />
                                    </div>

                                    <div className="mt-3 cursor-pointer h-full w-40 border-1 rounded shadow-md" onClick={handleInvalidPayment}>
                                        <img src={Nagad} className='h-full w-full object-contain' />
                                    </div>

                                    <div className="mt-3 cursor-pointer h-full w-40 border-1 rounded shadow-md" onClick={handleInvalidPayment}>
                                        <img src={Rocket} className='h-full w-full object-contain' />
                                    </div>


                                    {token && accountBalance && !hasRestAmount ? <div className="mt-3 cursor-pointer h-full w-40 border-1 rounded shadow-md" onClick={handleAccountBalancePayment}>
                                        <img src={AccountBalance} className='h-full w-full object-contain' />
                                    </div> : ""}

                                </div>
                            </div>
                        ) : <div>
                            {
                                orderData?.payment_method == "sslcommerz" && <p className='text-center font-bold text-xl text-logobarElementBG'>Money is successfully paid</p>
                            }
                            {
                                orderData?.payment_method == "wallet" && <p className='text-center font-bold text-xl text-logobarElementBG'>Money is successfully paid</p>
                            }
                            {
                                orderData?.payment_method == "cod" && <p className='text-center font-bold text-xl text-logobarElementBG'>Please pay to the Delivery Man when the product is at your DOORSTEP!</p>
                            }
                        </div>
                    }
                </div>
            }

            <div className="grid grid-cols-2 gap-4 mt-4">

                <div className="">
                    <div className="flex flex-col items-center">
                        <p className="mb-4">Delivery Address</p>
                        {orderData && <p>{`${orderData.shipping.address}, ${orderData.shipping.area}, ${orderData.shipping.city}, ${orderData.shipping.region}`}</p>}
                        {orderData && <p>Mobile Number: {orderData.shipping.phone}</p>}
                    </div>
                </div>

                <div className="">
                    <div className="flex flex-col">
                        <p className="text-center mb-4">Order Summary</p>

                        <div className="grid grid-cols-12 mb-2">

                            <div className="col-span-8">
                                <p>Sub-Total</p>
                            </div>

                            <div className="col-span-4">
                                {orderData && <p>{orderData.sub_total}</p>}
                            </div>

                        </div>

                        <div className="grid grid-cols-12 mb-2">

                            <div className="col-span-8">
                                <p>Shipping Cost</p>
                            </div>

                            <div className="col-span-4">
                                <div className='flex items-center h-full'>
                                    {orderData && <p>{orderData.shipping_total}</p>}
                                </div>
                            </div>

                        </div>


                        <div className="grid grid-cols-12 mb-2">

                            <div className="col-span-8">
                                <p>Total Amount To Be Paid</p>
                            </div>

                            <div className="col-span-4">
                                <div className='flex items-center h-full'>
                                    {orderData && <p>{orderData.total}</p>}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>


        </div>
    )
}

export default OrderConfirmationPage
