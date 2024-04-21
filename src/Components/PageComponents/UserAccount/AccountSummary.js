import React from 'react'
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';

import AddressSummary from './AddressSummary';
import AccountBasicInfo from './AccountBasicInfo';
import ReviewSummary from './ReviewSummary';
import { useSelector } from 'react-redux';
import axios from 'axios';


const AccountSummary = () => {

    const { token, accountBalance } = useSelector(state => state.authInfo)

    const [orders, setOrders] = React.useState([]);

    // getting and making the options list for district
    React.useEffect(() => {
        if (token != null) {
            axios.get("/customer/orders", {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                // console.log(response.data)
                // setDistrictOptionsAxios(response.data)
                setOrders(response.data.data);
                console.log(response.data);
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [token])
    return (
        <div>

            <div className="account-info mb-8">
                <p className="font-Poppins text-lg">Account Information</p>
                <div className="border-1 border-borderColor px-4 py-4 rounded-lg mt-4">
                    <p className="font-DMSans text-sm font-medium mb-3">Contact Information</p>
                    <AccountBasicInfo />
                    <div className="flex">
                        <Link className="font-DMSans text-sm1 font-medium mr-2 cursor-pointer hover:text-logobarElementBG" to="/customer/account-info-edit">Edit</Link>
                        <div className="border-1 border-borderColor mr-2"></div>
                        <p className="font-DMSans text-sm1 font-medium cursor-pointer hover:text-logobarElementBG">Change Password</p>
                    </div>
                </div>
            </div>

            <div className="account-info mb-8">
                <p className="font-Poppins text-lg">Accounts Balance Information</p>
                <div className="border-1 border-borderColor px-4 py-4 rounded-lg mt-4">
                    <p className="font-DMSans text-sm1 mb-1"><b>Accounts Balance :</b> {accountBalance} Tk.</p>
                </div>
            </div>

            <div className="address-book mb-8">
                <div className="flex justify-between items-center mb-4">
                    <p className="font-Poppins text-lg">Address Book</p>
                    <button className="font-Poppins text-xs px-4 py-2 border-1 border-logobarElementBG text-logobarElementBG hover:bg-logobarElementBG hover:text-white rounded-lg">MANAGE ADDRESSES</button>
                </div>
                <AddressSummary summaryPage={true} />
            </div>

            <div className="review-list mb-8">
                <div className="flex justify-between items-center mb-4">
                    <p className="font-Poppins text-lg">My Recent Reviews</p>
                    <Link to="/customer/reviews" className="font-Poppins text-xs px-4 py-2 border-1 border-logobarElementBG text-logobarElementBG hover:bg-logobarElementBG hover:text-white rounded-lg">VIEW ALL</Link>
                </div>
                <ReviewSummary />
            </div>

            <div className="recent-orders">
                <div className="flex justify-between items-center">
                    <p className="font-Poppins text-lg">Recent Orders</p>
                    <Link to="/customer/orders" className="font-Poppins text-xs px-4 py-2 border-1 border-logobarElementBG text-logobarElementBG hover:bg-logobarElementBG hover:text-white rounded-lg">VIEW ALL</Link>
                </div>
                <div className="border-1 border-borderColor px-4 py-4 rounded-lg mt-4">
                    <div className="hidden md:block">
                        <table className="w-full table-fixed">
                            <thead className="">
                                <tr className="border-b h-12">
                                    <th className="font-Poppins font-medium text-sm w-1/6 text-left pl-2">Order Id</th>
                                    <th className="font-Poppins font-medium text-sm w-1/6 text-left">Date</th>
                                    <th className="font-Poppins font-medium text-sm w-1/6 text-left">Ship To</th>
                                    <th className="font-Poppins font-medium text-sm w-1/6 text-left">Order Total</th>
                                    <th className="font-Poppins font-medium text-sm w-1/6 text-left">Status</th>
                                    <th className="font-Poppins font-medium text-sm w-1/6 text-left">Invoice</th>
                                </tr>
                            </thead>
                            <tbody>

                                {orders?.map((item, index) => {
                                    if (index < 5) {
                                        return (
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
                                                    <p className="font-DMSans text-sm1">{item.status}</p>
                                                </td>
                                                <td>
                                                    <Link to={`/order/invoice/${item.order_number}`} className="font-DMSans text-sm1 hover:text-logobarElementBG font-medium">View</Link>
                                                    <Link to={{ pathname: `/order/invoice/print/${item.order_number}`, state: "account-info" }} className="font-DMSans text-sm1 inline-block ml-2">Print</Link>
                                                    {/* <Link to={{ pathname: `/order/invoice/print/${item.order_number}`, state: "account-info" }} className="font-DMSans text-sm1 inline-block ml-2">PDF</Link> */}
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}



                            </tbody>
                        </table>
                    </div>

                    {/* For Responsiveness */}

                    <div className="responsive-order-list md:hidden">

                        {
                            orders?.map((item, index) => {
                                if (index < 5) {
                                    return (
                                        <div key={index}>
                                            <div className="mb-4">
                                                <p className="font-Poppins font-medium text-sm mb-1">Order Id: <span className="font-DMSans text-sm1 font-normal inline-block ml-2">{item.order_number}</span></p>
                                                <p className="font-Poppins font-medium text-sm mb-1">Date: <span className="font-DMSans text-sm1 font-normal inline-block ml-2"><Moment format="D MMM YYYY">{item.created_at}</Moment></span></p>
                                                <p className="font-Poppins font-medium text-sm mb-1">Ship To:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">{item.shipping.name}</span></p>
                                                <p className="font-Poppins font-medium text-sm mb-1">Order Total:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">Tk.{item.total}</span></p>
                                                <p className="font-Poppins font-medium text-sm mb-1">Status:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">{item.status}</span></p>
                                                <Link to={`/order/invoice/${item.order_number}`} className="font-DMSans text-sm1 inline-block">View</Link>
                                                <Link to={{ pathname: `/order/invoice/print/${item.order_number}`, state: "account-info" }} className="font-DMSans text-sm1 inline-block ml-2">Print</Link>
                                            </div>
                                            {
                                                index == 4 ? "" : <hr className="mb-1" />
                                            }
                                            {
                                                index == 4 ? "" : <hr className="mb-4" />
                                            }
                                        </div>
                                    )
                                }
                            })
                        }


                    </div>

                </div>
            </div>
        </div>
    )
}

export default AccountSummary
