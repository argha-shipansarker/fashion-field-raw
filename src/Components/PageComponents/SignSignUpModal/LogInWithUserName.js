import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ImSpinner9 } from "react-icons/im"
import axios from 'axios';

import LoginLogo from "../../../Assets/Images/RegisterAndOtp/OTP.png"

import { closingAndOpeningLogInWithUserNameModal, savingTokenValue, savingTokenInLocalStorage, closeAndOpenForgotPasswordModal } from "../../../ReduxStore/LogInFolder/UserInfo"

const LogInWithUserName = () => {

    const { logInWithUserNameModal } = useSelector(state => state.authInfo)

    const [registerInfo, setRegisterInfo] = useState({})
    const [errorStatus, setErrorStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(closingAndOpeningLogInWithUserNameModal())
        setErrorStatus(null)
        setMessage(null)
        setRegisterInfo({})
    }

    const handleUpdatingRegisterInfo = e => {
        setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
    }

    const handleLogin = () => {
        setLoading(true)
        axios.post("/customer/login/attempt", registerInfo, {
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            console.log(response)
            setLoading(false)
            setErrorStatus(null)
            setMessage(null)
            dispatch(savingTokenValue(response.data._token))
            dispatch(savingTokenInLocalStorage(response.data._token))
            dispatch(closingAndOpeningLogInWithUserNameModal())
        }).catch(errors => {
            console.log(errors.response)
            setLoading(false)
            setErrorStatus(errors.response.data.errors)
            setMessage(errors.response.data.message)
        })
    }

    useEffect(() => {
        // console.log(registerInfo)
    }, [registerInfo])

    const handleForgotPassword = () => {
        dispatch(closingAndOpeningLogInWithUserNameModal())
        dispatch(closeAndOpenForgotPasswordModal())
    }


    return (
        <Modal open={logInWithUserNameModal} onClose={onClose} blockScroll={false} center={true}>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <div className="col-span-1 flex items-center">
                    <div>
                        <img src={LoginLogo} alt="register logo" />
                    </div>
                </div>

                <div className='col-span-2'>

                    <div className="px-8 py-8">
                        <p className="text-2xl font-Poppins font-medium text-logobarElementBG mb-3 text-center">Login</p>
                        <p className="text-base font-DMSans font-normal text-topBarTextColor mb-4 text-center">Give your User Name/Email/Mobile number to Login</p>

                        <div className='mb-3'>
                            <input type="text" className='border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2 mb-1' name='username' placeholder='User Name/Email/Mobile Number' onChange={e => handleUpdatingRegisterInfo(e)} value={registerInfo?.username} />
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.username}</p>
                        </div>

                        <div className='mb-3'>
                            <input type="password" className='border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2 mb-1' name='password' placeholder='Password' onChange={e => handleUpdatingRegisterInfo(e)} value={registerInfo?.password} />
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.password}</p>
                        </div>

                        {message && <p className="font-Poppins font-medium text-xs text-logobarElementBG mb-3 text-center">{message}</p>}

                        {
                            loading ? (
                                <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-4 disabled">
                                    <ImSpinner9 className="animate-spin" />
                                </button>
                            ) : (
                                <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-4" onClick={handleLogin}>Login</button>
                            )
                        }

                        <p className="font-Poppins text-xs font-medium text-logobarElementBG text-center cursor-pointer" onClick={handleForgotPassword}>Forgot Password?</p>

                    </div>

                </div>

            </div>

        </Modal>
    )
}

export default LogInWithUserName
