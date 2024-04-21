import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import axios from 'axios';

import { ImSpinner9 } from "react-icons/im"

const AccountInfoEdit = () => {

    const [emailCheckbox, setEmailCheckbox] = useState(false);
    const [passwordCheckbox, setPasswordCheckbox] = useState(false)

    const [previousUserInfo, setPreviousInfo] = useState(null)

    const { token } = useSelector(state => state.authInfo)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        if (token != null) {
            axios.get("/customer/profile", {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log(response)
                // setPreviousInfo(response.data)
                setName(response.data.name)
                setEmail(response.data.email)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [token])

    useEffect(() => {
        console.log(previousUserInfo)
    }, [previousUserInfo])

    const handleSavingNameEmail = () => {
        setLoading(prevState => !prevState)
        const data = {
            name: name,
            email: email
        }
        axios.post("/customer/profile", data, {
            headers: {
                Authorization: "Bearer " + token,
                Accept: 'application/json',
            }
        }).then(response => {
            console.log(response.data)
            setLoading(prevState => !prevState)
            setStatus(response.data.message)
            setName("")
            setEmail("")
            setErrors(null)
        }).catch(errors => {
            console.log(errors.response)
            setLoading(prevState => !prevState)
            setStatus(errors.response.data.message)
            setErrors(errors.response.data.errors)
        })
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="default-info">
                    {status && <p className={`font-Poppins font-semibold text-base mb-4 ${status == "Profile Updated!" ? "text-green-700" : "text-logobarElementBG"}`}>{status}</p>}
                    <p className="font-Poppins font-normal text-sm mb-2">Account Information</p>

                    <hr className="mb-3" />

                    <label className="font-DMSans text-sm1" htmlFor="name">Full Name <span className="text-logobarElementBG">*</span></label>
                    <input type="text" id="name" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" value={name} onChange={e => setName(e.target.value)} />
                    <p className="font-Poppins font-medium text-xs text-logobarElementBG mb-3">{errors?.name}</p>

                    <label className="font-DMSans text-sm1" htmlFor="email">Email</label>
                    <input type="email" id="email" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-3" value={email} onChange={e => setEmail(e.target.value)} />

                    <div className="flex items-center mt-8 changed-checkbox">
                        <input type="checkbox" id="change-email" defaultChecked={emailCheckbox} onChange={() => setEmailCheckbox(prevState => !prevState)} />
                        <label className="font-DMSans text-sm1 ml-2" htmlFor="change-email">Change Email</label>
                    </div>

                    <div className="flex items-center mt-4 changed-checkbox">
                        <input type="checkbox" id="change-password" defaultChecked={passwordCheckbox} onChange={() => setPasswordCheckbox(prevState => !prevState)} />
                        <label className="font-DMSans text-sm1 ml-2" htmlFor="change-password">Change Password</label>
                    </div>
                </div>

                <div className="changing-part">

                    {
                        emailCheckbox && passwordCheckbox == false && <div className="change-email-only">
                            <p className="font-Poppins font-normal text-sm mb-2">Change Email</p>

                            <hr className="mb-3" />

                            <label className="font-DMSans text-sm1" htmlFor="email-change">Email <span className="text-logobarElementBG">*</span></label>
                            <input type="text" id="email-change" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-3" />

                            <label className="font-DMSans text-sm1" htmlFor="current-password">Current Password <span className="text-logobarElementBG">*</span></label>
                            <input type="text" id="current-password" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-3" />
                        </div>
                    }

                    {
                        passwordCheckbox && emailCheckbox == false && <div className="change-password-only">
                            <p className="font-Poppins font-normal text-sm mb-2">Change Password</p>

                            <hr className="mb-3" />

                            <label className="font-DMSans text-sm1" htmlFor="current-password">Current Password <span className="text-logobarElementBG">*</span></label>
                            <input type="text" id="current-password" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-3" />

                            <label className="font-DMSans text-sm1" htmlFor="new-password">New Password <span className="text-logobarElementBG">*</span></label>
                            <input type="text" id="new-password" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-3" />

                            <label className="font-DMSans text-sm1" htmlFor="confirm-password">Confirm New Password <span className="text-logobarElementBG">*</span></label>
                            <input type="text" id="confirm-password" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-3" />
                        </div>
                    }

                    {
                        emailCheckbox && passwordCheckbox && <div className="email-password-change">
                            <p className="font-Poppins font-normal text-sm mb-2">Change Email and Password</p>

                            <hr className="mb-3" />

                            <label className="font-DMSans text-sm1" htmlFor="email-change">Email <span className="text-logobarElementBG">*</span></label>
                            <input type="text" id="email-change" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-3" />

                            <label className="font-DMSans text-sm1" htmlFor="current-password">Current Password <span className="text-logobarElementBG">*</span></label>
                            <input type="text" id="current-password" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-3" />

                            <label className="font-DMSans text-sm1" htmlFor="new-password">New Password <span className="text-logobarElementBG">*</span></label>
                            <input type="text" id="new-password" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-3" />

                            <label className="font-DMSans text-sm1" htmlFor="confirm-password">Confirm New Password <span className="text-logobarElementBG">*</span></label>
                            <input type="text" id="confirm-password" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-3" />
                        </div>
                    }

                </div>
            </div>

            {
                loading ? (
                    <button className="font-Poppins text-base w-20 h-10 border-1 border-logobarElementBG text-logobarElementBG hover:bg-logobarElementBG hover:text-white rounded-lg mt-10 flex justify-center items-center">
                        <ImSpinner9 className="animate-spin" />
                    </button>
                ) : (
                    <button className="font-Poppins text-base w-20 h-10 border-1 border-logobarElementBG text-logobarElementBG hover:bg-logobarElementBG hover:text-white rounded-lg mt-10" onClick={handleSavingNameEmail}>SAVE</button>
                )
            }

        </div>
    )
}

export default AccountInfoEdit
