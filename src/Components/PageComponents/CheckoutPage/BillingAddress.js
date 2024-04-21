import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { handleUpdateAddress } from "../../../ReduxStore/CheckOutSystem/CheckOutStore";

import HomeAddress from "./HomeAddress";
import OfficeAddress from "./OfficeAddress";
import GiftAddress from "./GiftAddress";

const BillingAddress = ({ allAddress }) => {
    const { token } = useSelector((state) => state.authInfo);
    const {
        shippingAddress,
        shippingAddressType,
        shippingCity,
        updateAddress,
    } = useSelector((state) => state.checkOutData);

    const dispatch = useDispatch();

    const [districtOptionsAxios, setDistrictOptionsAxios] = useState([]);
    const [districtOptionsCustom, setDistrictOptionsCustom] = useState([]);

    // getting and making the options list for district
    useEffect(() => {
        // if (token != null) {
        axios
            .get("/address/get-regions", {
                headers: {
                    // Authorization: "Bearer " + token,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                // console.log(response.data)
                setDistrictOptionsAxios(response.data);
            })
            .catch((errors) => {
                console.log(errors.response);
            });
        // }
    }, []);

    useEffect(() => {
        setDistrictOptionsCustom([]);
        if (districtOptionsAxios.length > 0) {
            districtOptionsAxios.map((item, index) => {
                setDistrictOptionsCustom((prevState) => [
                    ...prevState,
                    { value: item.id, label: item.name },
                ]);
            });
        }
    }, [districtOptionsAxios]);

    const [openHome, setOpenHome] = useState(false);
    const [openOffice, setOpenOffice] = useState(false);
    const [openGift, setOpenGift] = useState(false);

    useEffect(() => {
        if (openHome) {
            setOpenOffice(false);
            setOpenGift(false);
        }
    }, [openHome]);

    useEffect(() => {
        if (openOffice) {
            setOpenHome(false);
            setOpenGift(false);
        }
    }, [openOffice]);

    useEffect(() => {
        if (openGift) {
            setOpenHome(false);
            setOpenOffice(false);
        }
    }, [openGift]);

    return (
        <div className="argha billing-address-pannel">
            {shippingAddress && updateAddress ? (
                <div className="flex justify-between">
                    <div className="address-details px-2 mt-3">
                        <p className="font-DMSans font-normal text-base mb-2">
                            Shipping To: <b>{shippingAddressType}</b>
                        </p>

                        {shippingAddressType == "Gift Address" && (
                            <div>
                                <p className="font-DMSans font-normal text-base mb-1">
                                    Sender's Name:{" "}
                                    <b>
                                        {shippingAddress.sender_name == ""
                                            ? "Anonymous"
                                            : shippingAddress.sender_name}
                                    </b>
                                </p>
                                <p className="font-DMSans font-normal text-base mb-1">
                                    Sender's Number:{" "}
                                    <b>
                                        {shippingAddress.sender_number == ""
                                            ? ""
                                            : shippingAddress.sender_number}
                                    </b>
                                </p>
                                <p className="font-DMSans font-normal text-base mb-1 text-logobarElementBG">
                                    Recipient's Information :
                                </p>
                            </div>
                        )}

                        <p className="font-DMSans font-normal text-base mb-1">
                            Name: <b>{shippingAddress.name}</b>
                        </p>
                        <p className="font-DMSans font-normal text-base mb-1">
                            Mobile: <b>{shippingAddress.phone}</b>
                        </p>
                        {shippingAddress?.company_name ? (
                            <p className="font-DMSans font-normal text-base mb-1">
                                Company Name:{" "}
                                <b>{shippingAddress?.company_name}</b>
                            </p>
                        ) : (
                            ""
                        )}
                        {shippingAddress?.department ? (
                            <p className="font-DMSans font-normal text-base mb-1">
                                Department Name:{" "}
                                <b>{shippingAddress?.department}</b>
                            </p>
                        ) : (
                            ""
                        )}
                        {shippingAddress?.designation ? (
                            <p className="font-DMSans font-normal text-base mb-1">
                                Designation:{" "}
                                <b>{shippingAddress?.designation}</b>
                            </p>
                        ) : (
                            ""
                        )}
                        <p className="font-DMSans font-normal text-base mb-1">
                            Region: <b>{shippingAddress.region}</b>
                        </p>
                        <p className="font-DMSans font-normal text-base mb-1">
                            City: <b>{shippingAddress.city}</b>
                        </p>
                        <p className="font-DMSans font-normal text-base mb-1">
                            Area: <b>{shippingAddress.area}</b>
                        </p>
                        <p className="font-DMSans font-normal text-base mb-1">
                            Street Address: <b>{shippingAddress.address}</b>
                        </p>
                        <p className="font-DMSans font-normal text-base">
                            Customer Note:{" "}
                            {shippingAddress.customer_note == ""
                                ? "Nothing"
                                : shippingAddress.customer_note}
                        </p>
                    </div>

                    <div>
                        <i
                            className="fas fa-edit cursor-pointer"
                            onClick={() => dispatch(handleUpdateAddress(false))}
                        ></i>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex justify-between mb-8">
                        <div className="flex items-center changed-checkbox">
                            <input
                                type="checkbox"
                                id="home-address"
                                checked={openHome}
                                onChange={() =>
                                    setOpenHome((prevState) => !prevState)
                                }
                            />
                            <label
                                className="font-Poppins font-medium text-base ml-2"
                                htmlFor="home-address"
                            >
                                Home Address
                            </label>
                        </div>

                        <div className="flex items-center changed-checkbox">
                            <input
                                type="checkbox"
                                id="office-address"
                                checked={openOffice}
                                onChange={() =>
                                    setOpenOffice((prevState) => !prevState)
                                }
                            />
                            <label
                                className="font-Poppins font-medium text-base ml-2"
                                htmlFor="office-address"
                            >
                                Office Address
                            </label>
                        </div>

                        <div className="flex items-center changed-checkbox">
                            <input
                                type="checkbox"
                                id="gift-address"
                                checked={openGift}
                                onChange={() =>
                                    setOpenGift((prevState) => !prevState)
                                }
                            />
                            <label
                                className="font-Poppins font-medium text-base ml-2"
                                htmlFor="gift-address"
                            >
                                Gift Address
                            </label>
                        </div>
                    </div>

                    {openHome && (
                        <HomeAddress
                            openHome={openHome}
                            setOpenHome={setOpenHome}
                            districtOptionsCustom={districtOptionsCustom}
                            allAddress={allAddress}
                        />
                    )}

                    {openOffice && (
                        <OfficeAddress
                            openOffice={openOffice}
                            setOpenOffice={setOpenOffice}
                            districtOptionsCustom={districtOptionsCustom}
                            allAddress={allAddress}
                        />
                    )}

                    {openGift && (
                        <GiftAddress
                            openGift={openGift}
                            setOpenGift={setOpenGift}
                            districtOptionsCustom={districtOptionsCustom}
                            allAddress={allAddress}
                        />
                    )}
                </>
            )}

            {/* <div className='flex justify-between mb-8'>
                <div className="flex items-center changed-checkbox">
                    <input type="checkbox" id="home-address" checked={openHome} onChange={() => setOpenHome(prevState => !prevState)} />
                    <label className="font-Poppins font-medium text-base ml-2" htmlFor="home-address">Home Address</label>
                </div>

                <div className="flex items-center changed-checkbox">
                    <input type="checkbox" id="office-address" checked={openOffice} onChange={() => setOpenOffice(prevState => !prevState)} />
                    <label className="font-Poppins font-medium text-base ml-2" htmlFor="office-address">Office Address</label>
                </div>

                <div className="flex items-center changed-checkbox">
                    <input type="checkbox" id="gift-address" checked={openGift} onChange={() => setOpenGift(prevState => !prevState)} />
                    <label className="font-Poppins font-medium text-base ml-2" htmlFor="gift-address">Gift Address</label>
                </div>
            </div>

            {
                openHome && <HomeAddress openHome={openHome} setOpenHome={setOpenHome} districtOptionsCustom={districtOptionsCustom} />
            }

            {
                openOffice && <OfficeAddress openOffice={openOffice} setOpenOffice={setOpenOffice} districtOptionsCustom={districtOptionsCustom} />
            }

            {
                openGift && <GiftAddress openGift={openGift} setOpenGift={setOpenGift} districtOptionsCustom={districtOptionsCustom} />
            } */}
        </div>
    );
};

export default BillingAddress;
