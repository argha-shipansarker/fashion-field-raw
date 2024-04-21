import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const AddressSummary = props => {

    const { summaryPage } = props

    const { token, customerData } = useSelector(state => state.authInfo)

    const [allAddressesFormAxios, setAllAddressesFromAxios] = useState(null)
    const [homeAddresses, setHomeAddresses] = useState(null)
    const [officeAddresses, setOfficeAddresses] = useState(null)
    const [giftAddress, setGiftAddress] = useState(null)


    useEffect(() => {
        if (token != null && customerData != null) {
            axios.get(`/order/address-appear/${customerData.id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log("manto", response.data)
                setAllAddressesFromAxios(response.data)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [token, customerData])

    useEffect(() => {
        if (allAddressesFormAxios != null) {
            let homeAddresses = allAddressesFormAxios.home
            let officAddresses = allAddressesFormAxios.office
            setHomeAddresses(homeAddresses)
            setOfficeAddresses(officAddresses)
            setGiftAddress(allAddressesFormAxios.gift)
        }
    }, [allAddressesFormAxios])



    return (
        <div className="address-book">
            {
                summaryPage ? "" : <p className="font-Poppins text-lg mb-4">Default Addresses</p>
            }
            <div className="border-1 border-borderColor px-4 py-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-8">

                    <div>
                        <p className="font-DMSans text-sm font-medium mb-3">Home Addresses</p>

                        {
                            homeAddresses && (
                                <div className="mb-4">
                                    <p className="font-DMSans text-sm1 mb-1">{homeAddresses.name}</p>
                                    <p className="font-DMSans text-sm1 mb-1">{homeAddresses.address}</p>
                                    <p className="font-DMSans text-sm1 mb-1">{`${homeAddresses.area}, ${homeAddresses.city}, ${homeAddresses.region}`}</p>
                                    <p className="font-DMSans text-sm1 mb-1">Bangladesh</p>
                                    <p className="font-DMSans text-sm1 mb-3">Mobile: {homeAddresses.phone}</p>
                                </div>
                            )
                        }
                    </div>

                    <div>
                        <p className="font-DMSans text-sm font-medium mb-3">Office Addresses</p>
                        {
                            officeAddresses && (
                                <div className="mb-4">
                                    <p className="font-DMSans text-sm1 mb-1">{officeAddresses.name}</p>
                                    <p className="font-DMSans text-sm1 mb-1">{officeAddresses.address}</p>
                                    <p className="font-DMSans text-sm1 mb-1">{`${officeAddresses.area}, ${officeAddresses.city}, ${officeAddresses.region}`}</p>
                                    <p className="font-DMSans text-sm1 mb-1">Bangladesh</p>
                                    <p className="font-DMSans text-sm1 mb-3">Mobile: {officeAddresses.phone}</p>
                                </div>
                            )
                        }
                    </div>

                    <div>
                        <p className="font-DMSans text-sm font-medium mb-3">Gift Addresses</p>
                        {
                            giftAddress && (
                                <div className="mb-4">
                                    <p className="font-DMSans text-sm1 mb-1">Sender's Name: {giftAddress.sender_name}</p>
                                    <p className="font-DMSans text-sm1 mb-1">Sender's Mobile: {giftAddress.sender_number}</p>
                                    <p className="font-DMSans text-sm1 mb-1">{giftAddress.name}</p>
                                    <p className="font-DMSans text-sm1 mb-1">{giftAddress.address}</p>
                                    <p className="font-DMSans text-sm1 mb-1">{`${giftAddress.area}, ${giftAddress.city}, ${giftAddress.region}`}</p>
                                    <p className="font-DMSans text-sm1 mb-1">Bangladesh</p>
                                    <p className="font-DMSans text-sm1 mb-3">Mobile: {giftAddress.phone}</p>
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
            {/* {
                summaryPage ? "" : (
                    <Link
                        className="inline-block font-Poppins text-sm px-4 py-2 border-1 border-logobarElementBG text-logobarElementBG hover:bg-logobarElementBG hover:text-white rounded-lg mt-8"
                        to="/customer/address-new"
                    >
                        Add New Address
                    </Link>
                )
            } */}
        </div>
    )
}

export default AddressSummary

