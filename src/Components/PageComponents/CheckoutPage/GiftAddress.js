import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    addingShippingAddress,
    addingShippingAddressType,
    addingShippingCity,
    handleUpdateAddress,
} from "../../../ReduxStore/CheckOutSystem/CheckOutStore";

const GiftAddress = (props) => {
    const { token, mobileNumber } = useSelector((state) => state.authInfo);
    const { shippingAddress } = useSelector((state) => state.checkOutData);
    const dispatch = useDispatch();

    const { openGift, setOpenGift, districtOptionsCustom, allAddress } = props;
    const giftAddressRef = useRef();
    const [sectionHeight, setSectionHeight] = useState(0);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [recipientName, setRecipientName] = useState("");
    const [recipientMobile, setRecipientMobile] = useState("");

    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const [citiesOptionsAxios, setCitiesOptionsAxios] = useState([]);
    const [citiesOptionsCustom, setCitiesOptionsCustom] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    const [areaOptionsAxios, setAreaOptionsAxios] = useState([]);
    const [areaOptionCustom, setAreaOptionCustom] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);

    const [streetAddress, setStreetAddress] = useState("");

    const [shortNotes, setShortNotes] = useState("");

    useEffect(() => {
        console.log(selectedCity);
    }, [selectedCity]);

    //getting and making the options list for cities
    useEffect(() => {
        // if (token != null) {
        axios
            .get(`address/${selectedDistrict?.value}/get-cities`, {
                headers: {
                    // Authorization: "Bearer " + token,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                // console.log(response.data)
                setCitiesOptionsAxios(response.data);
            })
            .catch((errors) => {
                console.log(errors.response);
            });
        // }
    }, [selectedDistrict]);

    useEffect(() => {
        setCitiesOptionsCustom([]);
        if (citiesOptionsAxios.length > 0) {
            citiesOptionsAxios.map((item, index) => {
                setCitiesOptionsCustom((prevState) => [
                    ...prevState,
                    { value: item.id, label: item.name },
                ]);
            });
        }
    }, [citiesOptionsAxios]);

    //getting and making options list for areas
    useEffect(() => {
        // if (token != null) {
        axios
            .get(`address/${selectedCity?.value}/get-areas`, {
                headers: {
                    // Authorization: "Bearer " + token,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                // console.log(response.data)
                setAreaOptionsAxios(response.data);
            })
            .catch((errors) => {
                console.log(errors.response);
            });
        // }
    }, [selectedCity]);

    useEffect(() => {
        setAreaOptionCustom([]);

        if (areaOptionsAxios.length > 0) {
            areaOptionsAxios.map((item, index) => {
                setAreaOptionCustom((prevState) => [
                    ...prevState,
                    { value: item.id, label: item.name },
                ]);
            });
        }
    }, [areaOptionsAxios]);

    //preparing the address data structure

    const [wholeAddress, setWholeAddress] = useState(null);
    const [errorsInAddress, setErrorsInAddress] = useState(null);

    //getting the mobile number
    useEffect(() => {
        if (shippingAddress != null) {
            setName(shippingAddress?.sender_name);
            setPhone(shippingAddress?.sender_number);
            setSelectedDistrict({
                label: shippingAddress?.region,
                value: shippingAddress?.region,
            });
            setSelectedCity({
                label: shippingAddress?.city,
                value: shippingAddress?.city,
            });
            setSelectedArea({
                label: shippingAddress?.area,
                value: shippingAddress?.area,
            });
            setStreetAddress(shippingAddress?.address);
            setShortNotes(shippingAddress?.customer_note);
            setRecipientName(shippingAddress?.name);
            setRecipientMobile(shippingAddress?.phone);
        } else {
            if (allAddress?.gift) {
                setName(allAddress?.gift?.sender_name);
                setPhone(allAddress?.gift?.sender_number);
                setSelectedDistrict({
                    label: allAddress?.gift?.region,
                    value: allAddress?.gift?.region,
                });
                setSelectedCity({
                    label: allAddress?.gift?.city,
                    value: allAddress?.gift?.city,
                });
                setSelectedArea({
                    label: allAddress?.gift?.area,
                    value: allAddress?.gift?.area,
                });
                setStreetAddress(allAddress?.gift?.address);
                setShortNotes(allAddress?.gift?.customer_note);
                setRecipientName(allAddress?.gift?.name);
                setRecipientMobile(allAddress?.gift?.phone);
            }
        }
    }, [shippingAddress]);

    const handlingWholeAddress = () => {
        let address = {};
        let errorsInAddress = {};

        address.name = recipientName;
        address.phone = recipientMobile.length == 11 ? recipientMobile : "";
        address.region = selectedDistrict?.label;
        address.city = selectedCity?.label;
        address.area = selectedArea?.label;
        address.address = streetAddress;
        address.customer_note = shortNotes;
        address.sender_name = name;
        address.sender_number = phone.length == 11 ? phone : "";
        address.address_type = "gift"

        // console.log(address)

        for (const key in address) {
            // console.log(key)
            // console.log(address[key])

            if (key == "customer_note") {
                continue;
            }
            if (address[key] == undefined || address[key] == "") {
                errorsInAddress[key] = `The ${key} field is required`;
            }
        }

        if (Object.keys(errorsInAddress).length == 0) {
            setWholeAddress(address);
            setErrorsInAddress(null);
            toast.success(<b>Address is added.</b>, {
                autoClose: 2000,
            });
        } else {
            setErrorsInAddress(errorsInAddress);
            toast.error(<b>Some Fields are Empty</b>, {
                autoClose: 2000,
            });
        }
    };

    useEffect(() => {
        if (wholeAddress != null) {
            dispatch(addingShippingAddress(wholeAddress));
            dispatch(addingShippingAddressType("Gift Address"));
            dispatch(addingShippingCity(selectedCity.value));
            dispatch(handleUpdateAddress(true));
            window.scrollTo(0, 0);
            setName("");
            setPhone("");
            setRecipientName("");
            setRecipientMobile("");
            setSelectedDistrict(null);
            setSelectedCity(null);
            setSelectedArea(null);
            setStreetAddress("");
            setShortNotes("");
        }
    }, [wholeAddress]);

    console.log("✨", wholeAddress);

    useEffect(() => {
        setSectionHeight(giftAddressRef.current.clientHeight);
    }, [openGift, errorsInAddress]);

    const handlingWholeAddressWithEnterPress = (event) => {
        if (event.key === "Enter") {
            let address = {};
            let errorsInAddress = {};

            address.name = recipientName;
            address.phone = recipientMobile.length == 11 ? recipientMobile : "";
            address.region = selectedDistrict?.label;
            address.city = selectedCity?.label;
            address.area = selectedArea?.label;
            address.address = streetAddress;
            address.customer_note = shortNotes;
            address.sender_name = name;
            address.sender_number = phone.length == 11 ? phone : "";

            // console.log(address)

            for (const key in address) {
                // console.log(key)
                // console.log(address[key])

                if (key == "customer_note") {
                    continue;
                }
                if (address[key] == undefined || address[key] == "") {
                    errorsInAddress[key] = `The ${key} field is required`;
                }
            }

            if (Object.keys(errorsInAddress).length == 0) {
                setWholeAddress(address);
                setErrorsInAddress(null);
                toast.success(<b>Address is added.</b>, {
                    autoClose: 2000,
                });
            } else {
                setErrorsInAddress(errorsInAddress);
                toast.error(<b>Some Fields are Empty</b>, {
                    autoClose: 2000,
                });
            }
        }
    };

    return (
        <div className="home-address">
            <div
                className="flex justify-between items-center h-12.5 border-1 px-4 rounded bg-topBarBG cursor-pointer"
            // onClick={() => setOpenGift(prevState => !prevState)}
            >
                <p className="font-Poppins font-medium text-lg">
                    Send as a Gift
                </p>
                <AiFillCaretDown />
            </div>

            <div
                className="collapse-pannel"
                style={openGift ? { height: sectionHeight } : { height: 0 }}
            >
                <div ref={giftAddressRef} className="px-4 pt-4 pb-10">
                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="name">
                            Sender's Name{" "}
                            <span className="text-logobarElementBG">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="sender_name"
                        />
                        {errorsInAddress && (
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">
                                {errorsInAddress?.sender_name}
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="phone">
                            Sender's Number{" "}
                            <span className="text-logobarElementBG">*</span>
                        </label>
                        <input
                            type="number"
                            id="phone"
                            className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1"
                            name="sender_number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errorsInAddress && (
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">
                                {errorsInAddress?.sender_number}
                            </p>
                        )}
                    </div>

                    {/* <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="mobile">Mobile <span className="text-logobarElementBG">*</span></label>
                        <input type="tel" id="mobile" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" value={mobile} onChange={e => setMobile(e.target.value)} />
                        <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errors?.phone}</p>
                    </div> */}

                    <p className="font-Poppins font-medium text-base mb-3">
                        Recipient's Information
                    </p>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="name">
                            Recipient's Name{" "}
                            <span className="text-logobarElementBG">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                        />
                        {errorsInAddress && (
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">
                                {errorsInAddress?.name}
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label
                            className="font-DMSans text-sm1"
                            htmlFor="mobile"
                        >
                            Recipient's Mobile{" "}
                            <span className="text-logobarElementBG">*</span>
                        </label>
                        <input
                            type="number"
                            id="mobile"
                            className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1"
                            value={recipientMobile}
                            onChange={(e) => setRecipientMobile(e.target.value)}
                        />
                        {errorsInAddress && (
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">
                                {errorsInAddress?.phone}
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label
                            className="font-DMSans text-sm1"
                            htmlFor="district"
                        >
                            Recipient's Division{" "}
                            <span className="text-logobarElementBG">*</span>
                        </label>
                        <Select
                            value={selectedDistrict}
                            onChange={(option) => {
                                setSelectedDistrict(option);
                                setSelectedCity(null);
                                setSelectedArea(null);
                            }}
                            options={districtOptionsCustom}
                            className="w-full selectTag font-Poppins font-normal text-sm1 mt-2 mb-1"
                            placeholder="Select Division"
                            isClearable={true}
                            isSearchable={true}
                            id="district"
                            maxMenuHeight={155}
                        />
                        {errorsInAddress && (
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">
                                {errorsInAddress?.region}
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="city">
                            Recipient's City{" "}
                            <span className="text-logobarElementBG">*</span>
                        </label>
                        <Select
                            value={selectedCity}
                            onChange={(option) => {
                                setSelectedCity(option);
                                setSelectedArea(null);
                            }}
                            options={citiesOptionsCustom}
                            className="w-full selectTag font-Poppins font-normal text-sm1 mt-2 mb-1"
                            placeholder="Select City"
                            isClearable={true}
                            isSearchable={true}
                            id="city"
                            maxMenuHeight={155}
                        />
                        {errorsInAddress && (
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">
                                {errorsInAddress?.city}
                            </p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="area">
                            Recipient's Area{" "}
                            <span className="text-logobarElementBG">*</span>
                        </label>
                        <Select
                            value={selectedArea}
                            onChange={(option) => {
                                setSelectedArea(option);
                            }}
                            options={areaOptionCustom}
                            className="w-full selectTag font-Poppins font-normal text-sm1 mt-2 mb-1"
                            placeholder="Select Area"
                            isClearable={true}
                            isSearchable={true}
                            id="area"
                            maxMenuHeight={150}
                        />
                        {errorsInAddress && (
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">
                                {errorsInAddress?.area}
                            </p>
                        )}
                    </div>

                    <div
                        className="mb-3"
                        onKeyPress={(event) =>
                            handlingWholeAddressWithEnterPress(event)
                        }
                    >
                        <label
                            className="font-DMSans text-sm1"
                            htmlFor="street-address"
                        >
                            Recipient's Street Address{" "}
                            <span className="text-logobarElementBG">*</span>
                        </label>
                        <input
                            type="text"
                            id="street-address"
                            className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1"
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            placeholder="House Number, Road Number, Sector Number"
                        />
                        {errorsInAddress && (
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">
                                {errorsInAddress?.address}
                            </p>
                        )}
                    </div>

                    {/* <div className="mb-3" onKeyPress={event => handlingWholeAddressWithEnterPress(event)}>
                        <label className="font-DMSans text-sm1" htmlFor="short-note">Special note</label>
                        <textarea id="short-note" className="border-1 block w-full focus:outline-none px-4 py-4 mt-2 rounded font-DMSans text-sm1" rows="5" value={shortNotes} onChange={(e) => setShortNotes(e.target.value)}></textarea>
                    </div> */}

                    <div className="mt-8">
                        <div
                            className="bg-logobarElementBG py-2 flex justify-center rounded cursor-pointer"
                            onClick={handlingWholeAddress}
                        >
                            <p className="font-Poppins font-semibold text-xl text-white">
                                Confirm Address
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftAddress;
