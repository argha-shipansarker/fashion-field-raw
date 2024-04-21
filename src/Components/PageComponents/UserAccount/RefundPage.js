import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FaPen } from "react-icons/fa"

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const RefundPage = () => {

    const { token } = useSelector(state => state.authInfo)

    const { slug } = useParams()

    const [orderData, setOrderData] = useState(null)

    const [refundModal, setRefundModal] = useState(false)

    const [specficItem, setSpecfieItem] = useState(null)

    const [refundQuantity, setRefundQuantity] = useState(1)
    const [isAccountBalance, setIsAccountBalance] = useState(true)
    const [bankName, setBankName] = useState("")
    const [branchName, setBranchName] = useState("")
    const [accountName, setAccountName] = useState("")
    const [accountNumber, setAccountNumber] = useState("")

    const handleRefundModal = () => {
        setRefundModal(false)
        setSpecfieItem(null)
        setRefundQuantity(1)
        setIsAccountBalance(true)
        setBankName("")
        setBranchName("")
        setAccountName("")
        setAccountNumber("")
    }

    const openRefundModal = item => {
        setRefundModal(true)
        setSpecfieItem(item)
        console.log(item)
    }

    useEffect(() => {
        console.log(specficItem)
    }, [specficItem])

    useEffect(() => {
        console.log(isAccountBalance)
    }, [isAccountBalance])

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

    const handleRefundSubmit = () => {
        if (refundQuantity <= specficItem?.quantity) {
            axios.post("/customer/refound", {
                order_id: orderData?.id,
                shipping_address_id: parseInt(orderData?.shipping_address_id),
                order_item_id: specficItem?.id,
                unit_price: specficItem?.unit_price,
                quantity: refundQuantity,
                amount: refundQuantity * specficItem?.unit_price,
                is_account_balance: isAccountBalance ? 1 : 0,
                bank_name: bankName,
                branch_name: branchName,
                account_name: accountName,
                account_number: accountNumber
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log(response)
                setRefundModal(false)
                setSpecfieItem(null)
                setRefundQuantity(1)
                setIsAccountBalance(true)
                setBankName("")
                setBranchName("")
                setAccountName("")
                setAccountNumber("")
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
            }).catch(errors => {
                console.log(errors.response)
            })
        } else {
            setRefundQuantity(1)
        }
    }

    return (
        <div className="container mx-auto pl-4 pr-4 md:pr-7">

            <Modal open={refundModal} onClose={handleRefundModal} center={true} blockScroll={false}>

                <div className='grid grid-cols-12'>
                    <div className='col-span-3 flex items-center'>
                        <p>Quantity:</p>
                    </div>
                    <div className='col-span-9'>
                        <input type="number" className="border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2" min={0} max={parseInt(specficItem?.quantity)} value={refundQuantity} onChange={e => setRefundQuantity(e.target.value)} />
                        {/* {errorStatus && <p className="text-red-500 font-Poppins font-medium text-xs">{errorStatus?.name}</p>} */}
                    </div>
                </div>

                <div className='grid grid-cols-12'>
                    <div className='col-span-3 flex items-center'>
                        <p>Want to Add in Account Balance?</p>
                    </div>
                    <div className='col-span-9'>
                        {/* <input type="number" className="border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2" min={0} max={parseInt(specficItem?.quantity)} value={refundQuantity} onChange={e => setRefundQuantity(e.target.value)} /> */}
                        {/* {errorStatus && <p className="text-red-500 font-Poppins font-medium text-xs">{errorStatus?.name}</p>} */}
                        <input type="checkbox" checked={isAccountBalance} onChange={() => setIsAccountBalance(prevState => !prevState)} />
                    </div>
                </div>

                {
                    isAccountBalance == false && (
                        <div>

                            <div className='grid grid-cols-12'>
                                <div className='col-span-3 flex items-center'>
                                    <p>Bank Name:</p>
                                </div>
                                <div className='col-span-9'>
                                    <input type="text" className="border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2" value={bankName} onChange={e => setBankName(e.target.value)} />
                                    {/* {errorStatus && <p className="text-red-500 font-Poppins font-medium text-xs">{errorStatus?.name}</p>} */}
                                </div>
                            </div>

                            <div className='grid grid-cols-12'>
                                <div className='col-span-3 flex items-center'>
                                    <p>Branch Name:</p>
                                </div>
                                <div className='col-span-9'>
                                    <input type="text" className="border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2" value={branchName} onChange={e => setBranchName(e.target.value)} />
                                    {/* {errorStatus && <p className="text-red-500 font-Poppins font-medium text-xs">{errorStatus?.name}</p>} */}
                                </div>
                            </div>

                            <div className='grid grid-cols-12'>
                                <div className='col-span-3 flex items-center'>
                                    <p>Account Name:</p>
                                </div>
                                <div className='col-span-9'>
                                    <input type="text" className="border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2" value={accountName} onChange={e => setAccountName(e.target.value)} />
                                    {/* {errorStatus && <p className="text-red-500 font-Poppins font-medium text-xs">{errorStatus?.name}</p>} */}
                                </div>
                            </div>

                            <div className='grid grid-cols-12'>
                                <div className='col-span-3 flex items-center'>
                                    <p>Account Number:</p>
                                </div>
                                <div className='col-span-9'>
                                    <input type="text" className="border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
                                    {/* {errorStatus && <p className="text-red-500 font-Poppins font-medium text-xs">{errorStatus?.name}</p>} */}
                                </div>
                            </div>

                        </div>
                    )
                }


                <div className="w-full h-10 bg-logobarElementBG rounded flex justify-center items-center cursor-pointer" onClick={handleRefundSubmit}>
                    <p className="font-Poppins font-semibold text-xl text-white">Submit</p>
                </div>


            </Modal>

            <p className="mt-6">Product Details</p>

            <div className="mt-6 w-full overflow-x-auto">

                <table className="w-full">

                    <thead className="">
                        <tr className="border-1 border-black h-12">
                            <th className="font-Poppins font-medium text-sm w-1/8 text-center border-1 border-black">Name</th>
                            <th className="font-Poppins font-medium text-sm w-1/8 text-center border-1 border-black">Price</th>
                            <th className="font-Poppins font-medium text-sm w-1/8 text-center border-1 border-black">Qty.</th>
                            <th className="font-Poppins font-medium text-sm w-1/8 text-center border-1 border-black">Total</th>
                            <th className="font-Poppins font-medium text-sm w-1/8 text-center border-1 border-black">Refund</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orderData?.items?.map((item, index) => (
                            <tr key={index} className="h-12">
                                <td className="border-1 border-black text-center">
                                    <Link to={`/product/${item?.product?.slug}`} target="_blank" className="font-DMSans text-sm1">{item?.product?.name}</Link>
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

                                <td className="border-1 border-black text-center">

                                    {
                                        item?.is_refund == false && orderData?.status == "Completed" ? (
                                            <div className='h-full flex items-center justify-center'>
                                                <FaPen size={20} onClick={() => openRefundModal(item)} />
                                            </div>
                                        ) : (
                                            <p className="font-DMSans text-sm1">Not Refund Able</p>
                                        )
                                    }

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default RefundPage
