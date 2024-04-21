import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ImSpinner9 } from "react-icons/im"

const SellerRegistration = () => {
    const [sellerInfo, setSellerInfo] = useState({})

    const [preivew, setPreview] = useState('');
    const [logo, setLogo] = useState('');
    const [loading, setLoading] = useState(false)

    const [errorMessage, setErrorMessage] = useState(null)

    const [errorStatus, setErrorStatus] = useState(null)

    const removeImage = () => {
        setLogo('');
        setPreview('');
    }

    const setImage = (e) => {
        const [file] = e.target.files;

        if (file) {
            setPreview(URL.createObjectURL(file));
            setLogo(file);
        } else {
            setLogo('');
        }
    }

    const handleUpdatingSellerInfo = e => {
        setSellerInfo({ ...sellerInfo, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        console.log(sellerInfo?.name)
    }, [sellerInfo])


    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [store_name, setStore_name] = useState("")
    const [store_description, setStore_description] = useState("")





    const handleSubmit = () => {
        setLoading(true)
        const data = new FormData();

        data.append('name', name);
        data.append('mobile', mobile);
        data.append('email', email);
        data.append('password', password);
        data.append('store_name', store_name);
        data.append('store_description', store_description);
        data.append('logo', logo);

        axios.post("/vendor/registration", data, {
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            console.log(response)
            setLoading(false)
            setSellerInfo(null)
            setLogo('');
            setPreview('');
            setName("")
            setMobile("")
            setEmail("")
            setPassword("")
            setStore_name("")
            setStore_description("")
            setErrorMessage(response.data.message)
            setErrorStatus(null)
        }).catch(errors => {
            console.log(errors.response)
            setLoading(false)
            setErrorMessage(errors.response.data.message)
            setErrorStatus(errors.response.data.errors)
        })
    }




    return (
        <div className='container mx-auto pl-4 pr-4 md:pr-7 mt-20 md:mt-0'>
            <p className='font-Poppins font-bold text-xl text-logobarElementBG text-center mt-8'>Seller Registration</p>

            <div className='grid grid-cols-12 mt-4'>

                <div className='col-span-3'>
                    <div className='flex items-center h-full'>
                        <label className="font-DMSans text-sm1" htmlFor="name">Name <span className="text-logobarElementBG">*</span></label>
                    </div>
                </div>

                <div className='col-span-9'>
                    <input type="text" id='name' className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" name='name' value={name} onChange={e => setName(e.target.value)} />
                    <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.name}</p>
                </div>

            </div>

            <div className='grid grid-cols-12 mt-4'>

                <div className='col-span-3'>
                    <div className='flex items-center h-full'>
                        <label className="font-DMSans text-sm1" htmlFor="mobile">Mobile <span className="text-logobarElementBG">*</span></label>
                    </div>
                </div>

                <div className='col-span-9'>
                    <input type="tel" id='mobile' className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" name='mobile' value={mobile} onChange={e => setMobile(e.target.value)} />
                    <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.mobile}</p>
                </div>

            </div>

            <div className='grid grid-cols-12 mt-4'>

                <div className='col-span-3'>
                    <div className='flex items-center h-full'>
                        <label className="font-DMSans text-sm1" htmlFor="email">Email <span className="text-logobarElementBG">*</span></label>
                    </div>
                </div>

                <div className='col-span-9'>
                    <input type="email" id='email' className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" name='email' value={email} onChange={e => setEmail(e.target.value)} />
                    <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.email}</p>
                </div>

            </div>

            <div className='grid grid-cols-12 mt-4'>

                <div className='col-span-3'>
                    <div className='flex items-center h-full'>
                        <label className="font-DMSans text-sm1" htmlFor="password">Password <span className="text-logobarElementBG">*</span></label>
                    </div>
                </div>

                <div className='col-span-9'>
                    <input type="password" id='password' className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" name='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.password}</p>
                </div>

            </div>

            <div className='grid grid-cols-12 mt-4'>

                <div className='col-span-3'>
                    <div className='flex items-center h-full'>
                        <label className="font-DMSans text-sm1" htmlFor="store_name">Store Name <span className="text-logobarElementBG">*</span></label>
                    </div>
                </div>

                <div className='col-span-9'>
                    <input type="text" id='store_name' className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" name='store_name' value={store_name} onChange={e => setStore_name(e.target.value)} />
                    <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.store_name}</p>
                </div>

            </div>

            <div className='grid grid-cols-12 mt-4'>

                <div className='col-span-3'>
                    <div className='flex items-center h-full'>
                        <label className="font-DMSans text-sm1" htmlFor="store_description">Store Description <span className="text-logobarElementBG">*</span></label>
                    </div>
                </div>

                <div className='col-span-9'>
                    <textarea id='store_description' className="border-1 block w-full focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" name='store_description' value={store_description} onChange={e => setStore_description(e.target.value)} rows="5"></textarea>
                    <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.store_description}</p>
                </div>

            </div>

            <div className='grid grid-cols-12 mt-4'>

                <div className='col-span-3'>
                    <div className='flex items-center h-full'>
                        <label className="font-DMSans text-sm1" htmlFor="file_upload">Store Logo <span className="text-logobarElementBG">*</span></label>
                    </div>
                </div>

                <div className='col-span-9'>


                    {(preivew) ? (
                        <>
                            <div className="relative w-full h-72.25 flex justify-center items-center">
                                <button onClick={() => removeImage()} className="bg-red-600 text-white p-1 rounded-full absolute right-24 top-0 mr-2 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <img className="w-60 h-60" src={preivew} alt="..." />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="">
                                <label htmlFor="file_upload" className="w-full h-54 flex justify-center items-center border-2 border-dashed">Select Logo</label>
                                <input id="file_upload" onChange={(e) => setImage(e)} type="file" className="hidden" />
                                <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.logo}</p>
                            </div>
                        </>
                    )}



                </div>

            </div>

            {/* <div className="mt-8">
                <div className="bg-logobarElementBG py-2 flex justify-center rounded cursor-pointer" onClick={handleSubmit}>
                    <p className="font-Poppins font-semibold text-xl text-white">Submit</p>
                </div>
            </div> */}

            {
                loading ? (
                    <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-4 disabled mt-8">
                        <ImSpinner9 className="animate-spin" />
                    </button>
                ) : (
                    <div className="w-full h-10 bg-logobarElementBG rounded flex justify-center items-center cursor-pointer mt-8 mb-4" onClick={handleSubmit}>
                        <p className="font-Poppins font-semibold text-xl text-white">Submit</p>
                    </div>
                )
            }

            <p className="font-Poppins font-medium text-xs text-logobarElementBG mt-4 text-center">{errorMessage}</p>

        </div>
    )
}

export default SellerRegistration
