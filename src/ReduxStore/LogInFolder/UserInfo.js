import { createSlice } from "@reduxjs/toolkit";

export const logInSlice = createSlice({
    name: "logInSystem",

    initialState: {
        token: null,
        mobileNumber: null,
        accountBalance: 0,
        emailAddress: null,
        updatePasswordMobileNumber: null,
        signInModal: false,
        registerModal: false,
        logInWithUserNameModal: false,
        emailCodeVerificationModal: false,
        forgotPasswordModal: false,
        forgotPasswordCodeVerifyModal: false,

        forgotPasswordToken: "",
        updatePasswordModal: false,

        searchingValue: "",
        customerData: null
    },

    reducers: {
        savingTokenValue: (state, action) => {
            state.token = action.payload
        },
        savingAccountBalance: (state, action) => {
            state.accountBalance = action.payload
        },
        savingMobileNumber: (state, action) => {
            state.mobileNumber = action.payload
        },
        savingUpdatePasswordMobileNumber: (state, action) => {
            state.updatePasswordMobileNumber = action.payload
        },
        savingEmailAddress: (state, action) => {
            state.emailAddress = action.payload
        },
        savingTokenInLocalStorage: (state, action) => {
            localStorage.setItem("FFtoken", JSON.stringify(action.payload))
        },
        closingAndOpeningOfSignInModal: (state, action) => {
            state.signInModal = !state.signInModal
        },
        closingAndOpeningRegisterModal: (state, action) => {
            state.registerModal = !state.registerModal
        },
        closingAndOpeningLogInWithUserNameModal: (state, action) => {
            state.logInWithUserNameModal = !state.logInWithUserNameModal
        },
        closeAndOpenEmailCodeVerificationCodeModal: (state, action) => {
            state.emailCodeVerificationModal = !state.emailCodeVerificationModal
        },
        closeAndOpenForgotPasswordModal: (state, action) => {
            state.forgotPasswordModal = !state.forgotPasswordModal
        },
        closeAndOpenForgotPasswordCodeVerifyModal: (state, action) => {
            state.forgotPasswordCodeVerifyModal = !state.forgotPasswordCodeVerifyModal
        },

        saveForgotPasswordToken: (state, action) => {
            state.forgotPasswordToken = action.payload
        },

        closeAndOpenUpdatePasswordModal: (state, action) => {
            state.updatePasswordModal = !state.updatePasswordModal
        },

        updateSearchingValue: (state, action) => {
            state.searchingValue = action.payload
        },
        setCustomerData: (state, action) => {
            state.customerData = action.payload
        }
    }
})

export const { savingTokenValue, savingMobileNumber, savingTokenInLocalStorage, closingAndOpeningOfSignInModal, closingAndOpeningRegisterModal, closingAndOpeningLogInWithUserNameModal, savingEmailAddress, closeAndOpenEmailCodeVerificationCodeModal, closeAndOpenForgotPasswordModal, closeAndOpenForgotPasswordCodeVerifyModal, savingUpdatePasswordMobileNumber, saveForgotPasswordToken, closeAndOpenUpdatePasswordModal, savingAccountBalance, updateSearchingValue, setCustomerData } = logInSlice.actions

export default logInSlice.reducer