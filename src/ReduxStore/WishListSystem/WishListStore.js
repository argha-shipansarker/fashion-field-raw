import { createSlice } from "@reduxjs/toolkit";

export const wishListSlice = createSlice({
    name: "wishList",

    initialState: {
        wishListArray: [],
        wishListItemNumber: 0
    },

    reducers: {
        addingProductInWishListArray: (state, action) => {
            state.wishListArray = action.payload
        },
        settingNumberOfWishListItems: (state, action) => {
            state.wishListItemNumber = action.payload
        }
    }
})

export const { addingProductInWishListArray, settingNumberOfWishListItems } = wishListSlice.actions

export default wishListSlice.reducer