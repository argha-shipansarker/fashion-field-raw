import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { ImSpinner9 } from "react-icons/im"
import dayjs from "dayjs";
import axios from 'axios';
import { useDispatch } from 'react-redux';

import OTPImage from "../../../Assets/Images/RegisterAndOtp/OTP.png"
import { closingAndOpeningRegisterModal, closingAndOpeningLogInWithUserNameModal, closingAndOpeningOfSignInModal } from "../../../ReduxStore/LogInFolder/UserInfo"

const OtpPage = props => {
    const { otp, setOtp, handleCompleteRegistrationButton, handleCompleteRegistrationButtonWithEnterPress, mobileNumber, otpStatus, loading } = props

    const dispatch = useDispatch()

    const registerPageOpen = () => {
        dispatch(closingAndOpeningOfSignInModal())
        dispatch(closingAndOpeningRegisterModal())
    }

    const logInWithEmailOpen = () => {
        dispatch(closingAndOpeningOfSignInModal())
        dispatch(closingAndOpeningLogInWithUserNameModal())
    }

    // const instantTime = dayjs()

    // let futureTime = instantTime + 3 * 60000;

    // var minutesToAdd = 3;
    // var currentDate = new Date();
    // var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

    // useEffect(() => {
    //     console.log(dayjs(currentDate).unix())
    //     console.log(dayjs(futureDate).unix())
    // }, [])

    const [loadingOTP, setLoadingOTP] = useState(false)
    const [errorStatus, setErrorStatus] = useState(null)

    const handleSubmitButton = () => {
        setLoadingOTP(true)
        axios.post("/customer/login",
            { phone: mobileNumber },
            {
                headers: {
                    Accept: 'application/json',
                }
            }).then(response => {
                setLoadingOTP(false)
                setErrorStatus(1)
            }).catch(errors => {
                console.log(errors.response)
                setLoadingOTP(false)
                setErrorStatus(-1)
            })
    }

    useEffect(() => {
        console.log(errorStatus)
    }, [])






    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 flex items-center">
                <div>
                    <img src={OTPImage} alt="OTP Logo" />
                </div>
            </div>
            <div className="col-span-2">
                <div className="px-8 py-8">
                    <p className="text-2xl font-Poppins font-medium text-logobarElementBG mb-8 text-center">Two-Step Verification</p>
                    <p className="text-base font-DMSans font-normal text-topBarTextColor mb-6 text-center">Please enter the OTP (One Time Password) to verify your account. A code has been sent to <span className="font-bold">{mobileNumber}</span></p>
                    <div className={`flex justify-center ${otpStatus != "Invalid OTP" ? "mb-6" : ""}`}>
                        <div onKeyPress={event => handleCompleteRegistrationButtonWithEnterPress(event)}>
                            <OtpInput
                                value={otp}
                                onChange={otp => setOtp(otp)}
                                numInputs={4}
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
                        </div>
                    </div>
                    {
                        otpStatus == "Invalid OTP" && <p className="text-xs text-logobarElementBG font-Poppins mt-2 mb-6">{otpStatus}</p>
                    }
                    {
                        loading ? (
                            <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-4 disabled" >
                                <ImSpinner9 className="animate-spin" />
                            </button>
                        ) : (
                            <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-4" onClick={handleCompleteRegistrationButton}>Continue</button>
                        )
                    }

                    {
                        loadingOTP ? (
                            <p className="font-Poppins text-xs font-medium text-logobarElementBG text-center">Code is being sent to your Mobile...</p>
                        ) : (
                            <>
                                {errorStatus == null && ""}
                                {
                                    errorStatus < 0 && <p className="font-Poppins text-xs font-medium text-logobarElementBG text-center">Please press the Resend button again!</p>
                                }
                                {
                                    errorStatus > 0 && <p className="font-Poppins text-xs font-medium text-logobarElementBG text-center">Enter the OTP</p>
                                }
                            </>
                        )
                    }


                    <p className="font-Poppins text-base mb-4 text-center">Not recieved your code? <span className="text-logobarElementBG font-medium cursor-pointer" onClick={handleSubmitButton}>Resend code</span></p>
                    <p className="font-Poppins text-xs font-medium text-logobarElementBG text-center"><span className='inline-block mr-1 cursor-pointer' onClick={registerPageOpen}>Register</span> / <span className='inline-block ml-1 cursor-pointer' onClick={logInWithEmailOpen}>Login with Email</span></p>
                </div>
            </div>
        </div>
    )
}

export default OtpPage
