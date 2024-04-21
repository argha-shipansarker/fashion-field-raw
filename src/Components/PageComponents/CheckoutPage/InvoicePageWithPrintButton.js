import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import Barcode from "react-barcode"
import Moment from 'react-moment';

import { useReactToPrint } from 'react-to-print'

import CompanyLogo from "../../../Assets/Images/CompanyLogo.png"


const InvoicePageWithPrintButton = (props) => {

    const { slug } = useParams()
    const [orderData, setOrderData] = useState(null)

    const history = useHistory()

    const { token } = useSelector(state => state.authInfo)
    const { state } = props.location

    useEffect(() => {
        if (token != null) {
            axios.get(`/orders/${slug}`, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log(response.data)
                setOrderData(response.data)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [token])


    const invoiceRef = useRef()

    useEffect(() => {
        if (orderData != null) {
            let printContents = document.getElementById("invoice").innerHTML
            let originalContents = document.body.innerHTML
            document.body.innerHTML = printContents
            window.print()
            document.body.innerHTML = originalContents
            if (state == "orderSummary") {
                window.location.replace(`/customer/orders`)
            }

            if (state == "account-info") {
                window.location.replace(`/customer/account-info`)
            }
            // window.location.replace(`/order/invoice/${slug}`)
        }

    }, [orderData])




    return (
        <div className="container mx-auto pl-4 pr-4 md:pr-7" id="invoice">

            <div>
                <div className="flex justify-end">
                    <div>
                        <p className="">Elham Lifestyle Limited</p>
                        <p>House-45, Shah Makhdum Avenue, Sector-12, Uttare, Dhaka-1230</p>
                    </div>
                </div>

                <div className="flex justify-between mt-2">
                    <div>
                        <img src={CompanyLogo} className="ml-1" width="60" height="60" />
                        <p className="text-logobarElementBG font-bold">FASHION FIELD</p>
                    </div>
                    <div>
                        {orderData && <Barcode value={`${orderData?.order_number}`} height={30} />}
                    </div>
                </div>

                <div className="mt-2">
                    <p>Order Number: {orderData?.order_number}</p>
                    <p>Order Date : <Moment format="D MMM YYYY">{orderData?.created_at}</Moment></p>
                    <p>Delivered By: <span className="uppercase">{orderData?.courier?.name}</span></p>
                </div>

                <div className="grid grid-cols-2 mt-3 gap-y-4">

                    <div className="border-1 border-black">
                        <div className="mt">
                            <div className="border-b-1 border-black">
                                <p className="ml-2 font-bold">Sold To</p>
                            </div>
                            <div className="ml-2">

                                {
                                    orderData?.shipping?.sender_name ? (
                                        <p>{orderData?.shipping?.sender_name}</p>
                                    ) : (
                                        <div>
                                            <p>{orderData?.shipping?.name}</p>
                                            <p>{orderData?.shipping?.designation}</p>
                                            <p>{orderData?.shipping?.department}</p>
                                            <p>{orderData?.shipping?.company_name}</p>
                                            <p>{`${orderData?.shipping?.address}, ${orderData?.shipping?.area}`}</p>
                                            <p>{`${orderData?.shipping?.city}, ${orderData?.shipping?.region}`}</p>
                                            <p>Phone: {orderData?.shipping?.phone}</p>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                    <div className="border-t-1 border-r-1 border-b-1 border-l-1 border-black">
                        <div className="mt">
                            <div className="border-b-1 border-black">
                                <p className="ml-2 font-bold">Ship To</p>
                            </div>
                            <div className="ml-2">
                                <p>{orderData?.shipping?.name}</p>
                                <p>{orderData?.shipping?.designation}</p>
                                <p>{orderData?.shipping?.department}</p>
                                <p>{orderData?.shipping?.company_name}</p>
                                <p>{`${orderData?.shipping?.address}, ${orderData?.shipping?.area}`}</p>
                                <p>{`${orderData?.shipping?.city}, ${orderData?.shipping?.region}`}</p>
                                <p>Phone: {orderData?.shipping?.phone}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <p className="mt-3 font-bold">Product Details</p>

                <div className="mt-3 w-full overflow-x-auto">
                    <table className="w-full">
                        <thead className="">
                            <tr className="border-1 border-black h-9">
                                <th className="font-Poppins font-medium text-sm w-2/8 text-center border-1 border-black">Name</th>
                                <th className="font-Poppins font-medium text-sm w-1/8 text-center border-1 border-black">Style No</th>
                                <th className="font-Poppins font-medium text-sm w-1/8 text-center border-1 border-black">SKU</th>
                                <th className="font-Poppins font-medium text-sm w-.5/8 text-center border-1 border-black">Size</th>
                                <th className="font-Poppins font-medium text-sm w-1/8 text-center border-1 border-black">Color</th>
                                <th className="font-Poppins font-medium text-sm w-1/8 text-center border-1 border-black">Price</th>
                                <th className="font-Poppins font-medium text-sm w-.5/8 text-center border-1 border-black">Qty.</th>
                                <th className="font-Poppins font-medium text-sm w-1/8 text-center border-1 border-black">Total</th>
                            </tr>
                        </thead>
                        <tbody>

                            {orderData?.items?.map((item, index) => (
                                <tr key={index} className="h-8">
                                    <td className="border-1 border-black text-center">
                                        <Link to={`/product/${item?.product?.slug}`} target="_blank" className="font-DMSans text-sm1">{item?.product?.name}</Link>
                                    </td>
                                    <td className="border-1 border-black text-center">
                                        <p className="font-DMSans text-sm1">{item?.product?.style_no}</p>
                                    </td>
                                    <td className="border-1 border-black text-center">
                                        <p className="font-DMSans text-sm1">{item?.product?.SKU}</p>
                                    </td>
                                    <td className="border-1 border-black text-center">
                                        {
                                            item?.group?.attributes?.map(item => {
                                                if (item?.value?.attribute?.name == "Size") {
                                                    return item?.value?.value
                                                }
                                            })
                                        }
                                    </td>
                                    <td className="border-1 border-black text-center">
                                        {
                                            item?.group?.attributes?.map(item => {
                                                if (item?.value?.attribute?.name == "Color") {
                                                    return item?.value?.value
                                                }
                                            })
                                        }
                                    </td>
                                    <td className="border-1 border-black text-center">
                                        <p className="font-DMSans text-sm1">{item?.unit_price}</p>
                                    </td>
                                    <td className="border-1 border-black text-center">
                                        <p className="font-DMSans text-sm1">{item?.quantity}</p>
                                    </td>
                                    <td className="border-1 border-black text-center">
                                        <p className="font-DMSans text-sm1">{item?.line_total}</p>
                                    </td>

                                </tr>
                            ))}

                            <tr className="h-8">
                                <td className="border-1 border-black text-center">

                                </td>
                                <td className="border-1 border-black text-center">

                                </td>
                                <td className="border-1 border-black text-center">

                                </td>
                                <td className="border-1 border-black text-center">

                                </td>
                                <td className="border-1 border-black text-center">

                                </td>
                                <td className="border-1 border-black text-center">

                                </td>
                                <td className="border-1 border-black text-center">

                                </td>
                                <td className="border-1 border-black text-center">

                                </td>

                            </tr>

                            <tr className="h-8 border-1 border-black">
                                <td className="border-1 border-black text-center" colSpan="7">
                                    <p className="font-DMSans text-right mr-2">Total Weight :</p>
                                </td>
                                <td className="border-1 border-black text-center">
                                    <p className="font-DMSans text-sm1">null</p>
                                </td>

                            </tr>
                            <tr className="h-8 border-1 border-black">
                                <td className="border-1 border-black text-center" colSpan="7">
                                    <p className="font-DMSans text-right mr-2">Sub Total :</p>
                                </td>
                                <td className="border-1 border-black text-center">
                                    <p className="font-DMSans text-sm1">{orderData?.sub_total}</p>
                                </td>

                            </tr>
                            <tr className="h-8 border-1 border-black">
                                <td className="border-1 border-black text-center" colSpan="7">
                                    <p className="font-DMSans text-right mr-2">Discount on Order Total :</p>
                                </td>
                                <td className="border-1 border-black text-center">
                                    <p className="font-DMSans text-sm1">{orderData?.discount_total}</p>
                                </td>

                            </tr>
                            <tr className="h-8 border-1 border-black">
                                <td className="border-1 border-black text-center" colSpan="7">
                                    <p className="font-DMSans text-right mr-2">Shipping Charge :</p>
                                </td>
                                <td className="border-1 border-black text-center">
                                    <p className="font-DMSans text-sm1">{orderData?.shipping_total}</p>
                                </td>

                            </tr>
                            <tr className="h-8 border-1 border-black">
                                <td className="border-1 border-black text-center" colSpan="7">
                                    <p className="font-DMSans text-right mr-2">Total :</p>
                                </td>
                                <td className="border-1 border-black text-center">
                                    <p className="font-DMSans text-sm1">{orderData?.total}</p>
                                </td>

                            </tr>
                            <tr className="h-8 border-1 border-black">
                                <td className="border-1 border-black text-center" colSpan="7">
                                    <p className="font-DMSans text-right mr-2">Partial Paid :</p>
                                </td>
                                <td className="border-1 border-black text-center">

                                </td>

                            </tr>
                            <tr className="h-8 border-1 border-black">
                                <td className="border-1 border-black text-center" colSpan="7">
                                    <p className="font-DMSans text-right mr-2">Customer Payable :</p>
                                </td>
                                <td className="border-1 border-black text-center">
                                    <p className="font-DMSans text-sm1">{orderData?.set_paid == false ? orderData?.total : 0}</p>
                                </td>

                            </tr>

                        </tbody>
                    </table>

                </div>

                <div className="grid grid grid-cols-2 mt-6">

                    <div >

                    </div>

                    <div className="grid grid-cols-4">

                        <div className="col-span-3">
                            <div className="grid grid-cols-2">

                                <div>

                                </div>

                                <div className="border-1 border-black">
                                    <p className="text-right mr-3">Payment Status</p>
                                </div>

                            </div>

                        </div>

                        <div>
                            <div className="border-1 border-black">
                                <p className="ml-3">{orderData?.set_paid == false ? "Not Paid" : "Paid"}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-2">
                    <div>
                        <p className="font-bold">Conditions</p>
                        <p>Pay first then received the products.</p>
                        <p>Check the physical condition in front of delivery person.</p>
                        <p>We have 7days happy return policy.</p>
                        <p>You can change & return your products within 7 days.</p>
                        <p>If you get wrong products, size & color you can exchange free.</p>
                        <p>Hotline: 09612 250 250.</p>
                    </div>
                    <div>
                        {
                            orderData?.special_discount_note_checkbox == 1 && (
                                <div>
                                    <p className="font-bold">Special Note:</p>
                                    <p className="">{orderData?.special_discount_note}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default InvoicePageWithPrintButton
