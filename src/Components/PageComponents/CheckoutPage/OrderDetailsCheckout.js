import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import { ImSpinner9 } from "react-icons/im"

import { useHistory } from "react-router-dom"

import { removingAllProductsFromCartAfterCheckout, calculatingTotalPrice, calculatingTotalCartProducts, modifingCartArrayForOutOfStockProducts, openingCartSideBar } from "../../../ReduxStore/CartSystem/CartStore"
import { addingShippingAddress, addingShippingAddressType, addingShippingCity } from "../../../ReduxStore/CheckOutSystem/CheckOutStore"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Link } from 'react-router-dom'

// toast.configure()

const OrderDetailsCheckout = () => {

    const { cartArray, cartTotalPrice } = useSelector(state => state.testCart)
    const { token, customerData } = useSelector(state => state.authInfo)

    const history = useHistory()

    const dispatch = useDispatch()

    const { shippingAddress, shippingAddressType, shippingCity } = useSelector(state => state.checkOutData)

    const [shippingDetails, setShippingDetails] = useState(null)
    const [validCoupon, setValidCoupon] = useState(null)
    const [cuponCode, setCuponCode] = useState("")
    const [totalAfterCuponApplied, setTotalAfterCuponApplied] = useState(null)
    const [cuponResponseText, setcCuponResponseText] = useState(null)
    const [cuponResoonseCode, setCouponResponseCode] = useState(false)

    const [loading, setLoading] = useState(false)

    const [orderFinalCheckout, setOrderFinalCheckout] = useState(false)
    const [agreeCondition, setAgreeCondition] = useState(false)

    const [whenSomeProductIsOutOfStock, setWhenSomeProductIsOutOfStock] = useState(false)

    const onClose = () => {
        setOrderFinalCheckout(false)
    }

    useEffect(() => {
        console.log("tuhin", shippingAddress)
    }, [shippingAddress])

    useEffect(() => {
        setTotalAfterCuponApplied(null)
        setcCuponResponseText(null)
        setCouponResponseCode(false)
    }, [cartArray])

    useEffect(() => {
        // console.log("hello")
        if (shippingCity != null) {
            axios.get(`/shipping-charge/${shippingCity}`, {
                headers: {
                    // Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log(response)
                setShippingDetails(response.data[0])
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [shippingCity])

    const handlePlacingOrder = () => {
        if (agreeCondition) {
            setLoading(true)
            const data = {
                name: shippingAddress.name,
                phone: shippingAddress.phone,
                region: shippingAddress.region,
                city: shippingAddress.city,
                area: shippingAddress.area,
                address: shippingAddress.address,
                customer_note: shippingAddress?.customer_note,
                company_name: shippingAddress?.company_name == undefined ? "" : shippingAddress?.company_name,
                designation: shippingAddress?.designation == undefined ? "" : shippingAddress?.designation,
                department: shippingAddress?.department == undefined ? "" : shippingAddress?.department,
                sender_name: shippingAddress?.sender_name == undefined ? "" : shippingAddress?.sender_name,
                sender_number: shippingAddress?.sender_number == undefined ? "" : shippingAddress?.sender_number,
                sub_total: cartTotalPrice,
                shipping_total: shippingDetails.charge,
                shipping_class_id: shippingDetails.id,
                total: totalAfterCuponApplied ? totalAfterCuponApplied?.total_amount : parseFloat(cartTotalPrice) + parseFloat(shippingDetails.charge),
                carts: cartArray,
                discount_total: totalAfterCuponApplied ? totalAfterCuponApplied?.discount_amount : 0,
                coupon_code: validCoupon,
                address_type: shippingAddress.address_type,
                customer_id: customerData?.id
            }


            axios.post("/order", data, {
                headers: {
                    Authorization: token ? "Bearer " + token : null,
                    Accept: 'application/json',
                }
            }).then(response => {
                setLoading(false)
                dispatch(removingAllProductsFromCartAfterCheckout())
                dispatch(calculatingTotalPrice())
                dispatch(calculatingTotalCartProducts())

                dispatch(addingShippingAddress(null))
                dispatch(addingShippingAddressType(null))
                dispatch(addingShippingCity(null))
                setValidCoupon(null)

                setOrderFinalCheckout(false)

                localStorage.setItem("cart", "[]")

                history.push(`/order/${response.data.order.order_number}`)

            }).catch(errors => {
                if (errors.response.status === 404 || errors.response.status === 406) {
                    toast.error(errors.response.data.message, {
                        autoClose: 4000,
                    })
                    setLoading(false)
                    if (errors.response.data?.couponIssue) {
                        console.log('coupon');
                        setTotalAfterCuponApplied(null)
                        setcCuponResponseText(null)
                        setCouponResponseCode(false)
                        setOrderFinalCheckout(false)
                    }
                }
                else {
                    setLoading(false)
                    dispatch(modifingCartArrayForOutOfStockProducts(errors.response?.data?.data))
                    setWhenSomeProductIsOutOfStock(true)
                    dispatch(openingCartSideBar())
                    setOrderFinalCheckout(false)
                }
            })
        } else {
            toast.error(<b>You Need to Agree to the Condition</b>, {
                autoClose: 2000,
            })
        }
    }

    const agreeingToConditions = () => {
        if (shippingAddress != null && shippingDetails != null && cartTotalPrice != 0 && cartArray.length != 0) {
            setOrderFinalCheckout(true)
        } else {
            toast.error(<b>Requirments NOT Fulfilled</b>, {
                autoClose: 2000,
            })
        }
    }

    const handleAddingCoupon = (event) => {
        event.preventDefault();
        if (!shippingDetails) {
            toast.error(<b>Please provide the shipping address first</b>, {
                autoClose: 2000,
            })
        }
        else {
            if (cuponCode) {
                axios.post("/coupon", {
                    code: cuponCode,
                    amount: parseFloat(cartTotalPrice)
                }, {
                    headers: {
                        Accept: 'application/json',
                    }
                }).then(response => {
                    setTotalAfterCuponApplied(response.data)
                    setValidCoupon(cuponCode)
                    setCuponCode("")
                    setCouponResponseCode(false)
                    setcCuponResponseText("Coupon applied successfully")
                }).catch(errors => {
                    setCuponCode("")
                    setCouponResponseCode(true)
                    setcCuponResponseText(errors.response.data.message)
                })
            }
            else {
                toast.error(<b>Please enter coupon code</b>, {
                    autoClose: 2000,
                })
            }
        }
    }

    const handleWhenSomeProductIsOutOfStock = () => {
        setWhenSomeProductIsOutOfStock(false)
    }


    return (
        <div className="bg-topBarBG px-4 pb-8">

            <p className="font-Poppins font-semibold text-xl uppercase mb-4 text-center pt-4">Order details</p>

            <div className="bg-white p-4 mb-4">

                <div className="grid grid-cols-12 pb-2 px-2 border-b-2">

                    <div className="col-span-9">
                        <p className="font-Poppins font-medium text-lg uppercase">product</p>
                    </div>

                    <div className="col-span-3">
                        <p className="font-Poppins font-medium text-lg uppercase">total</p>
                    </div>

                </div>

                {
                    cartArray.map((item, index) => (
                        <div className="px-2 border-b-1 py-3 product-info" key={index}>

                            <div className="grid grid-cols-12">

                                <div className="col-span-9">

                                    <div className="grid grid-cols-12 gap-2">

                                        <div className="col-span-8">
                                            <p className="font-DMSans font-normal text-sm line-clamp-2">{item.productName}</p>
                                        </div>

                                        <div className="col-span-4">
                                            <div className="h-full flex items-center">
                                                <p className="font-DMSans font-normal text-sm">x {item.productQuantity}</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className="col-span-3">
                                    <div className="h-full flex items-center">
                                        <p className="font-DMSans font-normal text-sm">Tk. {item.productQuantity * item.productPrice}</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    ))
                }

                <div className="grid grid-cols-12 py-3 px-2 border-b-2">

                    <div className="col-span-9">
                        <p className="font-DMSans font-normal text-base">Sub-Total</p>
                    </div>

                    <div className="col-span-3">
                        <p className="font-DMSans font-normal text-base">Tk. {cartTotalPrice}</p>
                    </div>

                </div>

                <div className="grid grid-cols-12 py-3 px-2 border-b-2">

                    <div className="col-span-9">
                        <div className="grid grid-cols-12">

                            <div className="col-span-6">
                                <p className="font-DMSans font-normal text-base">Shipping</p>
                            </div>

                            <div className="col-span-6">
                                {shippingDetails && <p className="font-DMSans font-normal text-base">{shippingDetails?.name}</p>}
                            </div>

                        </div>

                    </div>

                    <div className="col-span-3">
                        {
                            shippingDetails && <p className="font-DMSans font-normal text-base">Tk. {shippingDetails?.charge}</p>
                        }
                    </div>

                </div>

                {
                    totalAfterCuponApplied && (
                        <div>

                            <div className="grid grid-cols-12 py-3 px-2 border-b-2">

                                <div className="col-span-9">
                                    <p className="font-DMSans font-normal text-base text-logobarElementBG">Discount</p>
                                </div>

                                <div className="col-span-3">
                                    <p className="font-DMSans font-normal text-base text-logobarElementBG">- Tk. {totalAfterCuponApplied?.discount_amount}</p>
                                </div>

                            </div>

                        </div>
                    )
                }

                <div className="grid grid-cols-12 py-3 px-2 border-b-2">

                    <div className="col-span-9">
                        <p className="font-DMSans font-normal text-base">In-Total</p>
                    </div>

                    <div className="col-span-3">
                        {
                            shippingDetails && totalAfterCuponApplied == null ? (
                                <p className="font-DMSans font-normal text-base">Tk. {parseFloat(cartTotalPrice) + parseFloat(shippingDetails?.charge)}</p>
                            ) : (
                                <p className="font-DMSans font-normal text-base">Tk. {(parseFloat(cartTotalPrice) + (shippingDetails?.charge ? shippingDetails.charge : 0)
                                ) - (totalAfterCuponApplied?.discount_amount ? totalAfterCuponApplied.discount_amount : 0)}</p>
                            )
                        }
                    </div>

                </div>


                {/* {
                    shippingAddress && <div className="address-details px-2 mt-3">
                        <p className="font-DMSans font-normal text-base mb-2">Shipping To: <b>{shippingAddressType}</b></p>

                        {
                            shippingAddressType == "Gift Address" && (
                                <div>
                                    <p className="font-DMSans font-normal text-base mb-1">Sender's Name: <b>{shippingAddress.sender_name == "" ? "Anonymous" : shippingAddress.sender_name}</b></p>
                                    <p className="font-DMSans font-normal text-base mb-1">Sender's Number: <b>{shippingAddress.sender_number == "" ? "" : shippingAddress.sender_number}</b></p>
                                    <p className="font-DMSans font-normal text-base mb-1 text-logobarElementBG">Recipient's Information :</p>
                                </div>
                            )
                        }

                        <p className="font-DMSans font-normal text-base mb-1">Name: <b>{shippingAddress.name}</b></p>
                        <p className="font-DMSans font-normal text-base mb-1">Mobile: <b>{shippingAddress.phone}</b></p>
                        {
                            shippingAddress?.company_name ? <p className="font-DMSans font-normal text-base mb-1">Company Name: <b>{shippingAddress?.company_name}</b></p> : ""
                        }
                        {
                            shippingAddress?.department ? <p className="font-DMSans font-normal text-base mb-1">Department Name: <b>{shippingAddress?.department}</b></p> : ""
                        }
                        {
                            shippingAddress?.designation ? <p className="font-DMSans font-normal text-base mb-1">Designation: <b>{shippingAddress?.designation}</b></p> : ""
                        }
                        <p className="font-DMSans font-normal text-base mb-1">Region: <b>{shippingAddress.region}</b></p>
                        <p className="font-DMSans font-normal text-base mb-1">City: <b>{shippingAddress.city}</b></p>
                        <p className="font-DMSans font-normal text-base mb-1">Area: <b>{shippingAddress.area}</b></p>
                        <p className="font-DMSans font-normal text-base mb-1">Street Address: <b>{shippingAddress.address}</b></p>
                        <p className="font-DMSans font-normal text-base">Customer Note: {shippingAddress.customer_note == "" ? "Nothing" : shippingAddress.customer_note}</p>

                    </div>
                } */}

            </div>

            {/* coupon portion */}

            <form onSubmit={handleAddingCoupon}>
                <div className="grid grid-cols-12 gap-4 py-3 px-2 border-b-2">
                    <div className="col-span-7">
                        <input type="text" id="cuponCode" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" value={cuponCode} onChange={e => setCuponCode(e.target.value)} placeholder="Enter Cupon" />
                    </div>
                    <div className="col-span-5 flex items-center pt-1">
                        <button type="submit" className="text-white font-Poppins font-bold text-base bg-topBarTextColor flex items-center justify-center h-9 w-full rounded cursor-pointer">
                            APPLY
                        </button>
                    </div>
                </div>
            </form>


            <p className={`${cuponResoonseCode ? 'text-red-600' : 'text-green-600'} px-2 mt-4`}>{cuponResponseText}</p>

            <div className="w-full h-10 bg-logobarElementBG rounded flex justify-center items-center cursor-pointer mt-8 mb-4" onClick={agreeingToConditions}>
                <p className="font-Poppins font-semibold text-xl text-white">PLACE ORDER</p>
            </div>

            <Modal open={orderFinalCheckout} onClose={onClose} blockScroll={false} center={true}>
                <div className='flex flex-col px-10 md:px-20'>
                    <Link to="/content-page/safe-payments-2" target="_blank" className='font-Poppins hover:text-logobarElementBG text-sm xs:text-xl md:text-4xl'>Terms and Conditions</Link>
                    <Link to="/content-page/happy-return-policy" target="_blank" className='font-Poppins hover:text-logobarElementBG mt-4 text-sm xs:text-xl md:text-4xl'>Happy Return Policy</Link>
                    <Link to="/content-page/privacy-policy" target="_blank" className='font-Poppins hover:text-logobarElementBG mt-4 text-sm xs:text-xl md:text-4xl'>Privacy Policy</Link>
                    <div className='mt-4 flex items-center'>
                        <input id='checkbox' type="checkbox" checked={agreeCondition} onChange={() => setAgreeCondition(prevState => !prevState)} style={{ height: 20, width: 20 }} />
                        <label htmlFor='checkbox' className='font-Poppins font-medium ml-4 text-sm xs:text-xl md:text-2xl'>I Agree</label>
                    </div>
                    {
                        loading ? (
                            <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white disabled mt-6">
                                <ImSpinner9 className="animate-spin" />
                            </button>
                        ) : (
                            <div className="w-full h-10 bg-logobarElementBG rounded flex justify-center items-center cursor-pointer mt-6" onClick={handlePlacingOrder}>
                                <p className="font-Poppins font-semibold text-xl text-white">CONTINUE</p>
                            </div>
                        )
                    }

                </div>
            </Modal>

            <Modal open={whenSomeProductIsOutOfStock} onClose={handleWhenSomeProductIsOutOfStock} blockScroll={false} center={true}>
                <div className='flex flex-col px-20'>
                    <p className='font-Poppins font-medium text-2xl'>Some Products Have gone out of Stock!!!</p>
                </div>
            </Modal>

        </div>
    )
}

export default OrderDetailsCheckout
