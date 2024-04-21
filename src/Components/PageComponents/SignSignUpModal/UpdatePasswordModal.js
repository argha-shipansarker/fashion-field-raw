import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ImSpinner9 } from "react-icons/im"
import axios from 'axios';

import { closeAndOpenUpdatePasswordModal, saveForgotPasswordToken, savingUpdatePasswordMobileNumber, closingAndOpeningLogInWithUserNameModal } from "../../../ReduxStore/LogInFolder/UserInfo"
import LoginLogo from "../../../Assets/Images/RegisterAndOtp/OTP.png"

const UpdatePasswordModal = () => {
    const { updatePasswordModal, updatePasswordMobileNumber, forgotPasswordToken } = useSelector(state => state.authInfo)

    const [newPassword, setNewPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(closeAndOpenUpdatePasswordModal())
        setErrorStatus(null)
        setErrorMessage(null)
    }

    const handleCompleteUpdatePassword = () => {
        setLoading(true)
        axios.post(`/customer/reset/update/${updatePasswordMobileNumber}/${forgotPasswordToken}`, {
            password: newPassword
        }, {
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            console.log(response)
            setLoading(false)
            setErrorStatus(null)
            setErrorMessage(null)
            dispatch(closeAndOpenUpdatePasswordModal())
            dispatch(saveForgotPasswordToken(""))
            dispatch(savingUpdatePasswordMobileNumber(null))
            dispatch(closingAndOpeningLogInWithUserNameModal())
        }).catch(errors => {
            console.log(errors)
            setLoading(false)
            setErrorStatus(errors?.response?.data?.errors)
            setErrorMessage(errors?.response?.data?.message)
        })
    }


    return (
        <Modal open={updatePasswordModal} onClose={onClose} blockScroll={false} center={true}>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">

                <div className="col-span-1 flex items-center">
                    <div>
                        <img src={LoginLogo} alt="register logo" />
                    </div>
                </div>

                <div className='col-span-2'>

                    <div className="px-8 py-8">

                        <p className="text-2xl font-Poppins font-medium text-logobarElementBG mb-8 text-center">Give New Password</p>

                        <div className='mb-3'>
                            <input type="password" className='border-1 border-gray-200 focus:outline-none focus:border-borderColor px-4 py-2 w-full font-Poppins font-normal text-xs2 mb-1' name='password' placeholder='Password' onChange={e => setNewPassword(e.target.value)} value={newPassword} />
                            <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorStatus?.password}</p>
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

                        {/* <p className="font-Poppins font-medium text-xs text-logobarElementBG mt-1 text-center">{errorMessage}</p> */}

                    </div>

                </div>

            </div>

        </Modal>
    )
}

export default UpdatePasswordModal
