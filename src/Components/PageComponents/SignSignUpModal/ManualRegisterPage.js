import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ImSpinner9 } from "react-icons/im"
import axios from 'axios';

import RegisterLogo from "../../../Assets/Images/RegisterAndOtp/Register.png"

import { closingAndOpeningRegisterModal, closingAndOpeningLogInWithUserNameModal, savingEmailAddress, closeAndOpenEmailCodeVerificationCodeModal } from "../../../ReduxStore/LogInFolder/UserInfo"

const ManualRegisterPage = () => {

    const { registerModal } = useSelector(state => state.authInfo)
    const dispatch = useDispatch()

    const [registerInfo, setRegisterInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(null)

    const onClose = () => {
        dispatch(closingAndOpeningRegisterModal())
        setErrorStatus(null)
        setRegisterInfo({})
    }

    const handleUpdatingRegisterInfo = e => {
        setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
    }

    const handleRegisterButton = () => {
        setLoading(true)
        axios.post("/customer/register", registerInfo, {
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            console.log(response)
            setLoading(false)
            setRegisterInfo({})
            dispatch(closingAndOpeningRegisterModal())
            dispatch(closeAndOpenEmailCodeVerificationCodeModal())
            setErrorStatus(null)
        }).catch(errors => {
            console.log(errors.response)
            setLoading(false)
            setErrorStatus(errors.response.data.errors)
        })
    }

    // useEffect(() => {
    //     console.log(emailAddress)

    // }, [emailAddress])

    const handleLogIn = () => {
        dispatch(closingAndOpeningLogInWithUserNameModal())
        dispatch(closingAndOpeningRegisterModal())
    }

    return (
        <Modal open={registerModal} onClose={onClose} blockScroll={false} center={true}>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">

                <div className="col-span-1 flex items-center">
                    <div>
                        <img src={RegisterLogo} alt="register logo" />
                    </div>
                </div>

                <div className='col-span-2'>
                    <div className="px-8 py-8">
                        <p className="text-2xl font-Poppins font-medium text-logobarElementBG mb-3 text-center">Register</p>
                        <p className="text-base font-DMSans font-normal text-topBarTextColor mb-4 text-center">Please enter your Information to Register</p>

                        <div className='mb-3'>
                            <input type="text" className='border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2 mb-1' name='username' placeholder='User Name' onChange={e => handleUpdatingRegisterInfo(e)} value={registerInfo?.username} />
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.username}</p>
                        </div>

                        <div className='mb-3'>
                            <input type="text" className='border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2 mb-1' name='name' placeholder='Name' onChange={e => handleUpdatingRegisterInfo(e)} value={registerInfo?.name} />
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.name}</p>
                        </div>

                        <div className='mb-3'>
                            <input type="email" className='border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2 mb-1' name='email' placeholder='Email' onChange={e => { handleUpdatingRegisterInfo(e); dispatch(savingEmailAddress(e.target.value)) }} value={registerInfo?.email} />
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.email}</p>
                        </div>


                        <div className='mb-3'>
                            <input type="tel" className='border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2 mb-1' name='phone' placeholder='Mobile Number' onChange={e => handleUpdatingRegisterInfo(e)} value={registerInfo?.phone} />
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.phone}</p>
                        </div>

                        <div className='mb-3'>
                            <input type="password" className='border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2 mb-1' name='password' placeholder='Password' onChange={e => handleUpdatingRegisterInfo(e)} value={registerInfo?.password} />
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.password}</p>
                        </div>

                        {
                            loading ? (
                                <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-3 disabled">
                                    <ImSpinner9 className="animate-spin" />
                                </button>
                            ) : (
                                <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-3" onClick={handleRegisterButton}>Register</button>
                            )
                        }

                        <p className="font-Poppins text-xs font-medium text-center">Already have an account?<span className='inline-block ml-2 cursor-pointer text-logobarElementBG' onClick={handleLogIn}>Login with User Name</span></p>

                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default ManualRegisterPage
