import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ImSpinner9 } from "react-icons/im"
import axios from 'axios';

import { closeAndOpenForgotPasswordModal, savingMobileNumber, closeAndOpenForgotPasswordCodeVerifyModal, savingUpdatePasswordMobileNumber } from "../../../ReduxStore/LogInFolder/UserInfo"
import LoginLogo from "../../../Assets/Images/RegisterAndOtp/OTP.png"

const ForgotPasswordModal = () => {

    const { forgotPasswordModal, updatePasswordMobileNumber } = useSelector(state => state.authInfo)
    const [loading, setLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(closeAndOpenForgotPasswordModal())
        setErrorStatus(null)
        setErrorMessage(null)
    }

    const handleSubmitMobileNumber = () => {
        setLoading(true)
        axios.post("/customer/forgot", {
            phone: updatePasswordMobileNumber
        }, {
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            console.log(response)
            setLoading(false)
            dispatch(closeAndOpenForgotPasswordModal())
            dispatch(closeAndOpenForgotPasswordCodeVerifyModal())
            setErrorStatus(null)
            setErrorMessage(null)
        }).catch(errors => {
            console.log(errors.response)
            setLoading(false)
            setErrorStatus(errors?.response?.data?.errors)
            setErrorMessage(errors?.response?.data?.message)
        })
    }

    return (
        <Modal open={forgotPasswordModal} onClose={onClose} blockScroll={false} center={true}>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">

                <div className="col-span-1 flex items-center">
                    <div>
                        <img src={LoginLogo} alt="register logo" />
                    </div>
                </div>

                <div className='col-span-2'>

                    <div className="px-8 py-8">


                        <p className="text-2xl font-Poppins font-medium text-logobarElementBG mb-3 text-center">Fogot Password</p>
                        <p className="text-base font-DMSans font-normal text-topBarTextColor mb-4 text-center">Please enter your Mobile Number</p>

                        <div className='mb-3'>
                            <input type="tel" className='border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2 mb-1' name='phone' placeholder='Mobile Number' onChange={e => dispatch(savingUpdatePasswordMobileNumber(e.target.value))} value={updatePasswordMobileNumber} />
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.phone}</p>
                        </div>


                        {
                            loading ? (
                                <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-4 disabled">
                                    <ImSpinner9 className="animate-spin" />
                                </button>
                            ) : (
                                <button className="flex text-sm rounded-md shadow-lg font-Poppins justify-center items-center h-10 w-full bg-logobarElementBG text-white mb-4" onClick={handleSubmitMobileNumber}>Check Mobile Number</button>
                            )
                        }

                        <p className="font-Poppins font-medium text-xs text-logobarElementBG mt-1 text-center">{errorMessage}</p>


                    </div>

                </div>


            </div>

        </Modal>
    )
}

export default ForgotPasswordModal
