import React from 'react'

const OrderCancellation = () => {
    return (
        <div className="return argha-shipan-sarker">
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
                                <th className="font-Poppins font-medium text-sm w-1/6 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className="border-b h-12">
                                <td className="pl-2">
                                    <p className="font-DMSans text-sm1">171081849</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1">10/17/21</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1">Argha Shipan Sarker</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1 text-logobarElementBG">Tk.2059</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1">BKash</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1">Cancelled</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1 hover:text-logobarElementBG font-medium">View</p>
                                </td>
                            </tr>

                            <tr className="h-12">
                                <td className="pl-2">
                                    <p className="font-DMSans text-sm1">171099999</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1">12/06/18</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1">Argha Shipan Sarker</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1 text-logobarElementBG">Tk.1059</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1">Nagad</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1">Cancelled</p>
                                </td>
                                <td>
                                    <p className="font-DMSans text-sm1 hover:text-logobarElementBG font-medium">View</p>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                {/* For Responsiveness */}

                <div className="responsive-order-list md:hidden">
                    <div className="mb-4">
                        <p className="font-Poppins font-medium text-sm mb-1">Order Id: <span className="font-DMSans text-sm1 font-normal inline-block ml-2">171081849</span></p>
                        <p className="font-Poppins font-medium text-sm mb-1">Date: <span className="font-DMSans text-sm1 font-normal inline-block ml-2">10/17/21</span></p>
                        <p className="font-Poppins font-medium text-sm mb-1">Ship To:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">Argha Shipan Sarker</span></p>
                        <p className="font-Poppins font-medium text-sm mb-1">Order Total:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">Tk.2059</span></p>
                        <p className="font-Poppins font-medium text-sm mb-1">Status:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">Cancelled</span></p>
                        <p className="font-Poppins font-medium text-sm font-medium">View</p>
                    </div>
                    <hr className="mb-1" />
                    <hr className="mb-4" />
                    <div className="">
                        <p className="font-Poppins font-medium text-sm mb-1">Order Id: <span className="font-DMSans text-sm1 font-normal inline-block ml-2">171099999</span></p>
                        <p className="font-Poppins font-medium text-sm mb-1">Date: <span className="font-DMSans text-sm1 font-normal inline-block ml-2">12/06/18</span></p>
                        <p className="font-Poppins font-medium text-sm mb-1">Ship To:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">Argha Shipan Sarker</span></p>
                        <p className="font-Poppins font-medium text-sm mb-1">Order Total:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">Tk.1059</span></p>
                        <p className="font-Poppins font-medium text-sm mb-1">Status:  <span className="font-DMSans text-sm1 font-normal inline-block ml-2">Cancelled</span></p>
                        <p className="font-Poppins font-medium text-sm font-medium">View</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderCancellation
