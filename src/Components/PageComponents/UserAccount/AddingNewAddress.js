import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import axios from 'axios'
import Select from 'react-select'

const AddingNewAddress = () => {

    const { token } = useSelector(state => state.authInfo)

    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [streetAddress, setStreetAddress] = useState("")

    const [districtOptionsAxios, setDistrictOptionsAxios] = useState([])
    const [districtOptionsCustom, setDistrictOptionsCustom] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState(null)

    const [citiesOptionsAxios, setCitiesOptionsAxios] = useState([])
    const [citiesOptionsCustom, setCitiesOptionsCustom] = useState([])
    const [selectedCity, setSelectedCity] = useState(null)

    const [areaOptionsAxios, setAreaOptionsAxios] = useState([])
    const [areaOptionCustom, setAreaOptionCustom] = useState([])
    const [selectedArea, setSelectedArea] = useState(null)

    const [addressOptionsAxios, setAddressOptionsAxios] = useState([])
    const [addressOptionsCustom, setAddressOptionsCustom] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)

    const [statusSuccess, setStatusSuccess] = useState(null)
    const [statusError, setStatusError] = useState(null)
    const [errors, setErrors] = useState({})


    // getting and making the options list for district
    useEffect(() => {
        if (token != null) {
            axios.get("/address/get-regions", {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                // console.log(response.data)
                setDistrictOptionsAxios(response.data)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [token])

    useEffect(() => {
        setDistrictOptionsCustom([])
        if (districtOptionsAxios.length > 0) {
            districtOptionsAxios.map((item, index) => {
                setDistrictOptionsCustom(prevState => [...prevState, { value: item.id, label: item.name }])
            })
        }

    }, [districtOptionsAxios])

    //getting and making the options list for cities
    useEffect(() => {
        if (token != null) {
            axios.get(`/address/${selectedDistrict?.value}/get-cities`, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                // console.log(response.data)
                setCitiesOptionsAxios(response.data)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [token, selectedDistrict])

    useEffect(() => {

        setCitiesOptionsCustom([])

        if (citiesOptionsAxios.length > 0) {
            citiesOptionsAxios.map((item, index) => {
                setCitiesOptionsCustom(prevState => [...prevState, { value: item.id, label: item.name }])
            })
        }

    }, [citiesOptionsAxios])

    //getting and making options list for areas
    useEffect(() => {
        if (token != null) {
            axios.get(`/address/${selectedCity?.value}/get-areas`, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                // console.log(response.data)
                setAreaOptionsAxios(response.data)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [token, selectedCity])

    useEffect(() => {

        setAreaOptionCustom([])

        if (areaOptionsAxios.length > 0) {
            areaOptionsAxios.map((item, index) => {
                setAreaOptionCustom(prevState => [...prevState, { value: item.id, label: item.name }])
            })
        }

    }, [areaOptionsAxios])


    //getting and making custom address types
    useEffect(() => {
        if (token != null) {
            axios.get("/address/address-type", {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                // console.log(response.data)
                setAddressOptionsAxios(response.data)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [token])

    useEffect(() => {
        setAddressOptionsCustom([])
        if (addressOptionsAxios.length > 0) {
            addressOptionsAxios.map((item, index) => {
                setAddressOptionsCustom(prevState => [...prevState, { value: item.id, label: item.name }])
            })
        }

    }, [addressOptionsAxios])



    useEffect(() => {
        // console.log(name)
        // console.log(email)
        // console.log(mobile)
        // console.log(streetAddress)
    }, [name, email, mobile, streetAddress])

    const handleSavingNewAddress = () => {
        const allData = {
            name: name,
            phone: mobile,
            email: email,
            address: streetAddress,
            region_id: selectedDistrict?.value,
            city_id: selectedCity?.value,
            area_id: selectedArea?.value,
            address_type_id: selectedAddress?.value
        }

        axios.post("/customer/addresses", allData, {
            headers: {
                Authorization: "Bearer " + token,
                Accept: 'application/json',
            }
        }).then(response => {
            console.log(response)
            setName("")
            setMobile("")
            setEmail("")
            setStreetAddress("")
            setSelectedDistrict(null)
            setSelectedCity(null)
            setSelectedArea(null)
            setSelectedAddress(null)
            setStatusSuccess(response.data.message)
            setStatusError({})
            setErrors(null)
        }).catch(errors => {
            console.log(errors.response)
            setErrors(errors.response.data.errors)
            setStatusError(errors.response.data.message)
        })
    }


    return (
        <div>
            {
                statusSuccess ? (
                    <p className="font-Poppins font-semibold text-green-700 text-base mb-4">{statusSuccess}</p>
                ) : (
                    <p className="font-Poppins font-semibold text-logobarElementBG text-base mb-4">{statusError}</p>
                )
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="basic-info">

                    <p className="font-Poppins font-normal text-sm mb-2">Contact Information</p>

                    <hr className="mb-3" />

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="name">Name <span className="text-logobarElementBG">*</span></label>
                        <input type="text" id="name" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" value={name} onChange={e => setName(e.target.value)} />
                        <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errors?.name}</p>
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="mobile">Mobile <span className="text-logobarElementBG">*</span></label>
                        <input type="tel" id="mobile" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" value={mobile} onChange={e => setMobile(e.target.value)} />
                        <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errors?.phone}</p>
                    </div>

                    <label className="font-DMSans text-sm1" htmlFor="email">Email</label>
                    <input type="email" id="email" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-3" value={email} onChange={e => setEmail(e.target.value)} />

                </div>

                <div className="address-info">

                    <p className="font-Poppins font-normal text-sm mb-2">Address</p>

                    <hr className="mb-3" />

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="street-address">Street Address <span className="text-logobarElementBG">*</span></label>
                        <input type="text" id="street-address" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" value={streetAddress} onChange={e => setStreetAddress(e.target.value)} />
                        <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errors?.address}</p>
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="district">Region <span className="text-logobarElementBG">*</span></label>
                        <Select
                            value={selectedDistrict}
                            onChange={option => { setSelectedDistrict(option); setSelectedCity(null); setSelectedArea(null) }}
                            options={districtOptionsCustom}
                            className="w-full selectTag font-Poppins font-normal text-sm1 mt-2 mb-1"
                            placeholder="Select District"
                            isClearable={true}
                            isSearchable={true}
                            id="district"
                        />
                        <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errors?.region_id}</p>
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="city">City <span className="text-logobarElementBG">*</span></label>
                        <Select
                            value={selectedCity}
                            onChange={option => { setSelectedCity(option); setSelectedArea(null) }}
                            options={citiesOptionsCustom}
                            className="w-full selectTag font-Poppins font-normal text-sm1 mt-2 mb-1"
                            placeholder="Select City"
                            isClearable={true}
                            isSearchable={true}
                            id="city"
                        />
                        <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errors?.city_id}</p>
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="area">Area <span className="text-logobarElementBG">*</span></label>
                        <Select
                            value={selectedArea}
                            onChange={option => { setSelectedArea(option) }}
                            options={areaOptionCustom}
                            className="w-full selectTag font-Poppins font-normal text-sm1 mt-2 mb-1"
                            placeholder="Select Area"
                            isClearable={true}
                            isSearchable={true}
                            id="area"
                        />
                        <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errors?.area_id}</p>
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="address-type">AddressType <span className="text-logobarElementBG">*</span></label>
                        <Select
                            value={selectedAddress}
                            onChange={option => { setSelectedAddress(option) }}
                            options={addressOptionsCustom}
                            className="w-full selectTag font-Poppins font-normal text-sm1 mt-2 mb-1"
                            placeholder="Select Address"
                            isClearable={true}
                            isSearchable={true}
                            id="address-type"
                        />
                        <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errors?.address_type_id}</p>
                    </div>

                </div>
            </div>

            <div className="mt-10 flex justify-end">
                <button className="font-Poppins text-base px-4 py-2 border-1 border-logobarElementBG text-logobarElementBG hover:bg-logobarElementBG hover:text-white rounded-lg" onClick={handleSavingNewAddress}>Save Address</button>
            </div>
        </div>
    )
}

export default AddingNewAddress
