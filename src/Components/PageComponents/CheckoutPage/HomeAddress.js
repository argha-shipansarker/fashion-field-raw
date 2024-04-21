import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import {
    addingShippingAddress,
    addingShippingAddressType,
    addingShippingCity,
    handleUpdateAddress,
} from "../../../ReduxStore/CheckOutSystem/CheckOutStore";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeAddress = (props) => {
    const { token, mobileNumber } = useSelector((state) => state.authInfo);

    const { shippingAddress } = useSelector((state) => state.checkOutData);

    const dispatch = useDispatch();

    const { openHome, setOpenHome, districtOptionsCustom, allAddress } = props;
    const homeAddressRef = useRef();
    const [sectionHeight, setSectionHeight] = useState(0);

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [streetAddress, setStreetAddress] = useState("");

    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const [citiesOptionsAxios, setCitiesOptionsAxios] = useState([]);
    const [citiesOptionsCustom, setCitiesOptionsCustom] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    const [areaOptionsAxios, setAreaOptionsAxios] = useState([]);
    const [areaOptionCustom, setAreaOptionCustom] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);

    const [shortNotes, setShortNotes] = useState("");

    useEffect(() => {
        console.log("shipan", shippingAddress, allAddress)
    }, [shippingAddress, allAddress])

    //getting the mobile number
    useEffect(() => {
        if (shippingAddress != null) {
            setName(shippingAddress?.name);
            setMobile(shippingAddress?.phone);
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
        } else {
            if (allAddress?.home != null) {
                setName(allAddress?.home?.name);
                setMobile(allAddress?.home?.phone);
                setSelectedDistrict({
                    label: allAddress?.home?.region,
                    value: allAddress?.home?.region,
                });
                setSelectedCity({
                    label: allAddress?.home?.city,
                    value: allAddress?.home?.city,
                });
                setSelectedArea({
                    label: allAddress?.home?.area,
                    value: allAddress?.home?.area,
                });
                setStreetAddress(allAddress?.home?.address);
                setShortNotes(allAddress?.home?.customer_note);
            }
        }
    }, [shippingAddress]);

    useEffect(() => {
        // console.log(selectedCity)
    }, [selectedCity]);

    //getting and making the options list for cities
    useEffect(() => {
        // if (token != null) {
        axios
            .get(`/address/${selectedDistrict?.value}/get-cities`, {
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
            .get(`/address/${selectedCity?.value}/get-areas`, {
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

    const handlingWholeAddress = () => {
        let address = {};
        let errorsInAddress = {};

        address.name = name;
        address.phone = mobile.length == 11 ? mobile : "";
        address.region = selectedDistrict?.label;
        address.city = selectedCity?.label;
        address.area = selectedArea?.label;
        address.address = streetAddress;
        address.customer_note = shortNotes;
        address.address_type = "home"

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
            dispatch(addingShippingAddressType("Home Address"));
            dispatch(addingShippingCity(selectedCity.value));
            dispatch(handleUpdateAddress(true));
            window.scrollTo(0, 0);
            setName("");
            setMobile("");
            setSelectedDistrict(null);
            setSelectedCity(null);
            setSelectedArea(null);
            setStreetAddress("");
            setShortNotes("");
        }
    }, [wholeAddress]);

    const handlingWholeAddressWithEnterPress = (event) => {
        if (event.key === "Enter") {
            let address = {};
            let errorsInAddress = {};

            address.name = name;
            address.phone = mobile.length == 11 ? mobile : "";
            address.region = selectedDistrict?.label;
            address.city = selectedCity?.label;
            address.area = selectedArea?.label;
            address.address = streetAddress;
            address.customer_note = shortNotes;

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

    useEffect(() => {
        setSectionHeight(homeAddressRef.current.clientHeight);
    }, [openHome, errorsInAddress]);

    return (
        <div className="home-address">
            <div
                className="flex justify-between items-center h-12.5 border-1 px-4 rounded bg-topBarBG cursor-pointer"
            // onClick={() => setOpenHome(prevState => !prevState)}
            >
                <p className="font-Poppins font-medium text-lg">
                    Default Home Address
                </p>
                <AiFillCaretDown />
            </div>

            <div
                className="collapse-pannel"
                style={openHome ? { height: sectionHeight } : { height: 0 }}
            >
                <div ref={homeAddressRef} className="px-4 pt-4 pb-4">
                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="name">
                            Name{" "}
                            <span className="text-logobarElementBG">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            Mobile{" "}
                            <span className="text-logobarElementBG">*</span>
                        </label>
                        <input
                            type="number"
                            id="mobile"
                            className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
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
                            Division{" "}
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
                            City{" "}
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
                            Area{" "}
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
                            maxMenuHeight={155}
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
                            Street Address{" "}
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

                    {/* <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="email">Email</label>
                        <input type="email" id="email" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1" value={email} onChange={e => setEmail(e.target.value)} />
                    </div> */}

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

export default HomeAddress;
