import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination';

const optionsForMonth = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
]

const optionsForStatus = [
    { value: "", label: "All" },
    { value: "Pending", label: "Pending" },
    { value: "Processing", label: "Processing" },
    { value: "Approve", label: "Approve" },
    { value: "Hold", label: "Hold" },
    { value: "On Shipping", label: "On Shipping" },
    { value: "Shipped", label: "Shipped" },
    { value: "Return", label: "Return" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Completed", label: "Completed" },
]

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: 16,
        fontFamily: "Poppins",
        color: state.isSelected ? "white" : "#252525",
        backgroundColor: state.isSelected ? "#e5371b" : "",
        '&:hover': { backgroundColor: state.isSelected ? "" : '#f6f6f6' },
    }),
    singleValue: (provided, state) => ({
        ...provided,
        fontSize: 16,
        fontFamily: "Poppins",
        color: "#252525",
    }),
    placeholder: (provided, state) => ({
        ...provided,
        fontSize: 14,
        fontFamily: "Poppins",
        color: "#252525",
    }),
    control: (provided, state) => ({
        ...provided,
        boxShadow: "none",
        backgroundColor: "#f6f6f6",
        width: 150,
        border: '1px solid #e5371b', // default border color
        '&:hover': { borderColor: '#e5371b' }, // border style on hover
        // You can also use state.isFocused to conditionally style based on the focus state
    })
}

const OrderSummary = () => {

    const [month, setMonth] = useState("")
    const [status, setStatus] = useState({ value: "", label: "All" })

    const [orderSearch, setOrderSearch] = useState("")


    const { token } = useSelector(state => state.authInfo)

    const [orders, setOrders] = React.useState([]);

    // getting and making the options list for district

    // React.useEffect(() => {
    //     if (token != null) {
    //         axios.get("/customer/orders", {
    //             headers: {
    //                 Authorization: "Bearer " + token,
    //                 Accept: 'application/json',
    //             }
    //         }).then(response => {
    //             // console.log(response.data)
    //             // setDistrictOptionsAxios(response.data)
    //             setOrders(response.data);
    //             console.log(response.data);
    //         }).catch(errors => {
    //             console.log(errors.response)
    //         })
    //     }
    // }, [token])

    useEffect(() => {
        if (token != null) {
            axios.get(`/customer/orders?status=${status?.value}&orderid=${orderSearch}&date=${month}`, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log(response.data);
                setOrders(response.data);
            }).catch(errors => {
                console.log(errors.response)
            })
        }

    }, [month, status, token, orderSearch])

    // useEffect(() => {
    //     console.log(month)
    // }, [month])

    const updatePage = (url) => {
        if (token != null) {
            axios.get(url, {
                headers: {
                    Authorization: token,
                    Authorization: "Bearer " + token,
                }
            }).then(response => {
                setOrders(response.data)
                console.log(response)
            })
        }
    }


    return (
        <div className="recent-orders">
            <div className="bg-topBarBG rounded-lg mb-4 flex flex-col md:flex-row md:items-center px-4 py-2 justify-between">

                <div className="flex flex-col md:flex-row">
                    <div className="flex items-center mb-3 md:mb-0">
                        <p className="font-Poppins font-semibold text-logobarElementBG text-base mr-2">Month</p>
                        {/* <div style={{ width: 150 }}> */}
                        {/* <Select
                                value={month}
                                onChange={option => setMonth(option)}
                                options={optionsForMonth}
                                placeholder="Select Month"
                                isSearchable={false}
                                isClearable={false}
                                className="focus:outline-none"
                                styles={styles}
                            /> */}
                        <input type="month" className='border-1 border-logobarElementBG rounded focus:outline-none pl-1' style={{ width: 170, height: 38 }} value={month} onChange={(e) => setMonth(e.target.value)} />
                        {/* </div> */}
                    </div>

                    <div className="mb-3 md:mb-0 flex items-center md:ml-4">
                        <p className="font-Poppins font-semibold text-logobarElementBG text-base mr-2">Status</p>
                        <div style={{ width: 150 }}>
                            <Select
                                value={status}
                                onChange={option => setStatus(option)}
                                options={optionsForStatus}
                                placeholder="Select status"
                                isSearchable={false}
                                isClearable={false}
                                className="focus:outline-none"
                                styles={styles}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <input className="border-1 h-9 w-60 focus:outline-none font-DMSans font-medium pl-4" placeholder="Search By Order Id" value={orderSearch} onChange={(e) => setOrderSearch(e.target.value)} />
                </div>

            </div>
            <div className="border-1 border-borderColor px-4 py-4 rounded-lg">
                <div className="hidden md:block">
                    <table className="w-full table-fixed">
                        <thead className="">
                            <tr className="border-b h-12">
                                <th className="font-Poppins font-medium text-sm w-1/6 text-left pl-2">Order Id</th>
                                <th className="font-Poppins font-medium text-sm w-1/6 text-left">Date</th>
                                <th className="font-Poppins font-medium text-sm w-1/6 text-left">Ship To</th>
                                <th className="font-Poppins font-medium text-sm w-1/6 text-left">Amount</th>
                                <th className="font-Poppins font-medium text-sm w-1/6 text-left">Payment Method</th>
                                <th className="font-Poppins font-medium text-sm w-1/6 text-left">Status</th>
                                <th className="font-Poppins font-medium text-sm w-1/6 text-left">Invoice</th>
                                {/* <th className="font-Poppins font-medium text-sm w-1/6 text-left">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            {orders?.data?.map((item, index) => (
                                <tr key={index} className="border-b h-12">
                                    <td className="pl-2">
                                        <p className="font-DMSans text-sm1">{item.order_number}</p>
                                    </td>
                                    <td>
                                        <p className="font-DMSans text-sm1"><Moment format="D MMM YYYY">{item.created_at}</Moment></p>
                                    </td>
                                    <td>
                                        <p className="font-DMSans text-sm1">{item.shipping.name}</p>
                                    </td>
                                    <td>
                                        <p className="font-DMSans text-sm1 text-logobarElementBG">Tk. {item.total}</p>
                                    </td>
                                    <td>
                                        <p className="font-DMSans text-sm1 text-logobarElementBG uppercase">{item.payment_method}</p>
                                    </td>
                                    <td>
                                        <p className="font-DMSans text-sm1 text-logobarElementBG">{item.status}</p>
                                    </td>
                                    <td>
                                        <Link to={`/order/invoice/${item.order_number}`} className="font-DMSans text-sm1 inline-block">View</Link>
                                        <Link to={{ pathname: `/order/invoice/print/${item.order_number}`, state: "orderSummary" }} className="font-DMSans text-sm1 inline-block ml-2">Print</Link>
                                    </td>
                                    {/* <td>
                                        <Link to={`/order-refund/${item.order_number}`} className="font-DMSans text-sm1 inline-block">Refund</Link>
                                    </td> */}
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>



                {/* For Responsiveness */}

                <div className="responsive-order-list md:hidden">


                    {
                        orders?.data?.map((item, index) => (
                            <div key={index}>
                                <div className="mb-4">
                                    <p className="font-Poppins font-medium text-sm mb-1">Order Id: <span className="font-DMSans text-sm1 font-normal inline-block ml-2">{item.order_number}</span></p>
                                    <p className="font-Poppins font-medium text-sm mb-1">Date: <span className="font-DMSans text-sm1 font-normal inline-block ml-2"><Moment format="D MMM YYYY">{item.created_at}</Moment></span></p>
                                    <p className="font-Poppins font-medium text-sm mb-1">Ship To:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">{item.shipping.name}</span></p>
                                    <p className="font-Poppins font-medium text-sm mb-1">Order Total:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">Tk.{item.total}</span></p>
                                    <p className="font-Poppins font-medium text-sm mb-1">Status:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">{item.status}</span></p>
                                    <Link to={`/order/invoice/${item.order_number}`} className="font-DMSans text-sm1 inline-block">View</Link>
                                    <Link to={{ pathname: `/order/invoice/print/${item.order_number}`, state: "orderSummary" }} className="font-DMSans text-sm1 inline-block ml-2">Print</Link>
                                    {/* <Link to={{ pathname: `/order/invoice/print/${item.order_number}`, state: "orderSummary" }} className="font-DMSans text-sm1 inline-block ml-2">PDF</Link> */}
                                </div>
                                {
                                    orders.length - 1 == index ? "" : <hr className="mb-1" />
                                }
                                {
                                    orders.length - 1 == index ? "" : <hr className="mb-4" />
                                }
                            </div>
                        ))
                    }
                </div>

            </div>

            <div className='mt-6 flex justify-end'>
                <Pagination sellers={orders} setUpdate={updatePage} />
            </div>
        </div>
    )
}

export default OrderSummary
