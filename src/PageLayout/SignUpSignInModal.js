import React, { useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"

import RegisterPage from '../Components/PageComponents/SignSignUpModal/RegisterPage';
import OtpPage from '../Components/PageComponents/SignSignUpModal/OtpPage';

import { savingTokenValue, savingMobileNumber, savingTokenInLocalStorage, closingAndOpeningOfSignInModal } from "../ReduxStore/LogInFolder/UserInfo"


const SignUpSignInModal = props => {

    const { signInModal } = useSelector(state => state.authInfo)

    const [mobileNumber, setMobileNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [status, setStatus] = useState(null)
    const [otpStatus, setOtpStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(closingAndOpeningOfSignInModal())
    }

    const handleSubmitButton = () => {
        setLoading(true)
        axios.post("/customer/login",
            { phone: mobileNumber },
            {
                headers: {
                    Accept: 'application/json',
                }
            }).then(response => {
                // console.log(response)
                setLoading(false)
                setStatus(response.data.message)
            }).catch(errors => {
                console.log(errors.response)
                setLoading(false)
                setStatus(errors.response.data.message)
            })
    }

    const handleSubmitButtonWithEnterPress = event => {
        if (event.key === 'Enter') {
            setLoading(true)
            axios.post("/customer/login",
                { phone: mobileNumber },
                {
                    headers: {
                        Accept: 'application/json',
                    }
                }).then(response => {
                    // console.log(response)
                    setLoading(false)
                    setStatus(response.data.message)
                }).catch(errors => {
                    console.log(errors.response)
                    setLoading(false)
                    setStatus(errors.response.data.message)
                })
        }
    }

    const handleCompleteRegistrationButton = () => {
        setLoading(true)
        axios.post("/customer/login/token",
            {
                phone: mobileNumber,
                token: otp
            }, {
            headers: {
                Accept: 'application/json',
            }
        }).then(response => {
            console.log(response)
            setLoading(false)
            dispatch(savingTokenValue(response.data._token))
            dispatch(savingTokenInLocalStorage(response.data._token))
            dispatch(savingMobileNumber(response.data.phone))
            dispatch(closingAndOpeningOfSignInModal())
        }).catch(errors => {
            console.log(errors.response)
            setLoading(false)
            setOtpStatus(errors.response.data.message)
        })
    }

    const handleCompleteRegistrationButtonWithEnterPress = event => {
        if (event.key === 'Enter') {
            setLoading(true)
            axios.post("/customer/login/token",
                {
                    phone: mobileNumber,
                    token: otp
                }, {
                headers: {
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log(response)
                setLoading(false)
                dispatch(savingTokenValue(response.data._token))
                dispatch(savingTokenInLocalStorage(response.data._token))
                dispatch(savingMobileNumber(response.data.phone))
                dispatch(closingAndOpeningOfSignInModal())

            }).catch(errors => {
                console.log(errors.response)
                setLoading(false)
                setOtpStatus(errors.response.data.message)
            })
        }
    }

    useEffect(() => {
        // console.log(otp)
    }, [otp])

    return (
        <Modal open={signInModal} onClose={onClose} blockScroll={false} center={true}>

            {
                status == "success" ? (
                    <OtpPage otp={otp} setOtp={setOtp} handleCompleteRegistrationButton={handleCompleteRegistrationButton} mobileNumber={mobileNumber} otpStatus={otpStatus} loading={loading} handleCompleteRegistrationButtonWithEnterPress={handleCompleteRegistrationButtonWithEnterPress} />
                ) : (
                    <RegisterPage mobileNumber={mobileNumber} setMobileNumber={setMobileNumber} handleSubmitButton={handleSubmitButton} handleSubmitButtonWithEnterPress={handleSubmitButtonWithEnterPress} status={status} loading={loading} />
                )
            }

        </Modal>
    )
}

export default SignUpSignInModal
