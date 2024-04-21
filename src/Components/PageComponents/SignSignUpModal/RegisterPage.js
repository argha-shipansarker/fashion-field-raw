import React from 'react'
import { ImSpinner9 } from "react-icons/im"
import { useDispatch } from 'react-redux'

import RegisterLogo from "../../../Assets/Images/RegisterAndOtp/Register.png"

import ManualRegisterPage from './ManualRegisterPage'
import { closingAndOpeningRegisterModal, closingAndOpeningLogInWithUserNameModal, closingAndOpeningOfSignInModal } from "../../../ReduxStore/LogInFolder/UserInfo"

const RegisterPage = props => {

    const dispatch = useDispatch()

    const registerPageOpen = () => {
        dispatch(closingAndOpeningOfSignInModal())
        dispatch(closingAndOpeningRegisterModal())
    }

    const logInWithEmailOpen = () => {
        dispatch(closingAndOpeningOfSignInModal())
        dispatch(closingAndOpeningLogInWithUserNameModal())
    }


    const { mobileNumber, setMobileNumber, handleSubmitButton, handleSubmitButtonWithEnterPress, status, loading } = props
    return (
        <div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <div className="col-span-1 flex items-center">
                    <div>
                        <img src={RegisterLogo} alt="register logo" />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="px-8 py-8">
                        <div className="h-78">
                            <p className="text-2xl font-Poppins font-medium text-logobarElementBG mb-8 text-center">Register/Login</p>
                            <p className="text-base font-DMSans font-normal text-topBarTextColor mb-6 text-center">Please enter your mobile number to Register/Login to your account</p>
                            <input type="text" className={`border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2 
                    ${status == "success" ? "mb-6" : ""}`} onChange={e => setMobileNumber(e.target.value)} value={mobileNumber} placeholder="Mobile Number" onKeyPress={event => handleSubmitButtonWithEnterPress(event)} />
                            {
                                status != "success" && <p className="text-xs text-logobarElementBG font-Poppins mt-2 mb-6">{status}</p>
                            }
                            {
                                loading ? (
                                    <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-6 disabled">
                                        <ImSpinner9 className="animate-spin" />
                                    </button>
                                ) : (
                                    <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-6" onClick={handleSubmitButton}>Continue</button>
                                )
                            }
                            <p className="font-Poppins text-xs font-medium text-logobarElementBG text-center"><span className='inline-block mr-1 cursor-pointer' onClick={registerPageOpen}>Register</span> / <span className='inline-block ml-1 cursor-pointer' onClick={logInWithEmailOpen}>Login with Email</span></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ManualRegisterPage /> */}
        </div>
    )
}

export default RegisterPage
