import { createSlice } from "@reduxjs/toolkit";

export const checkOutSlice = createSlice({
    name: "checkOutSlice",
    initialState: {
        shippingAddress: null,
        shippingAddressType: null,
        shippingCity: null,
        updateAddress: false,
    },

    reducers: {
        addingShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
        },

        addingShippingAddressType: (state, action) => {
            state.shippingAddressType = action.payload
        },

        addingShippingCity: (state, action) => {
            state.shippingCity = action.payload
        },

        handleUpdateAddress: (state, action) => {
            state.updateAddress = action.payload
        }
    }
})

export const { addingShippingAddress, addingShippingAddressType, addingShippingCity, handleUpdateAddress } = checkOutSlice.actions

export default checkOutSlice.reducer