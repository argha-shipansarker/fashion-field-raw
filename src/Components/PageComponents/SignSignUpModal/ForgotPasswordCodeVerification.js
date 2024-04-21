import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ImSpinner9 } from "react-icons/im"
import axios from 'axios';
import OtpInput from 'react-otp-input';

import { closeAndOpenForgotPasswordCodeVerifyModal, saveForgotPasswordToken, closeAndOpenUpdatePasswordModal } from "../../../ReduxStore/LogInFolder/UserInfo"
import LoginLogo from "../../../Assets/Images/RegisterAndOtp/OTP.png"

const ForgotPasswordCodeVerification = () => {

    const { forgotPasswordCodeVerifyModal, updatePasswordMobileNumber, forgotPasswordToken } = useSelector(state => state.authInfo)
    const [mobileVerificationCode, setMobileVerificationCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(closeAndOpenForgotPasswordCodeVerifyModal())
        setErrorStatus(null)
        setErrorMessage(null)
    }

    const handleCompleteUpdatePassword = () => {
        setLoading(true)
        axios.post(`/customer/reset/check/${updatePasswordMobileNumber}`, {
            token: forgotPasswordToken
        }, {
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            console.log(response)
            setLoading(false)
            setErrorStatus(null)
            setErrorMessage(null)
            dispatch(closeAndOpenForgotPasswordCodeVerifyModal())
            dispatch(closeAndOpenUpdatePasswordModal())
        }).catch(errors => {
            console.log(errors.response)
            setLoading(false)
            setErrorStatus(errors?.response?.data?.errors)
            setErrorMessage(errors?.response?.data?.message)
        })
    }

    return (
        <Modal open={forgotPasswordCodeVerifyModal} onClose={onClose} blockScroll={false} center={true}>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">

                <div className="col-span-1 flex items-center">
                    <div>
                        <img src={LoginLogo} alt="register logo" />
                    </div>
                </div>

                <div className='col-span-2'>

                    <div className="px-8 py-8">

                        <p className="text-2xl font-Poppins font-medium text-logobarElementBG mb-8 text-center">Two-Step Verification</p>
                        <p className="text-base font-DMSans font-normal text-topBarTextColor mb-6 text-center">Please enter the OTP (One Time Password) to verify your account. A code has been sent to <span className="font-bold">{updatePasswordMobileNumber}</span></p>

                        <div className='flex flex-col items-center mb-8'>
                            <OtpInput
                                value={forgotPasswordToken}
                                onChange={otp => dispatch(saveForgotPasswordToken(otp))}
                                numInputs={6}
                                separator={<span className="px-1"></span>}
                                isInputNum={true}
                                shouldAutoFocus={true}

                                inputStyle={{
                                    border: "1px solid #252525",
                                    borderRadius: "8px",
                                    width: "40px",
                                    height: "40px",
                                    fontSize: "16px",
                                    color: "#000",
                                    fontWeight: "500",
                                    caretColor: "#252525",
                                    // marginBottom: 20
                                }}
                                focusStyle={{
                                    border: "1px solid #e5371b",
                                    outline: "none"
                                }}
                            />
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG mt-2">{errorStatus?.token}</p>
                        </div>

                        {
                            loading ? (
                                <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-4 disabled" >
                                    <ImSpinner9 className="animate-spin" />
                                </button>
                            ) : (
                                <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-4" onClick={handleCompleteUpdatePassword}>Continue</button>
                            )
                        }

                        <p className="font-Poppins font-medium text-xs text-logobarElementBG mt-1 text-center">{errorMessage}</p>

                    </div>

                </div>

            </div>

        </Modal>
    )
}

export default ForgotPasswordCodeVerification
