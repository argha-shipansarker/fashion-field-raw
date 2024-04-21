import { createSlice } from "@reduxjs/toolkit";

export const storeFilterSlice = createSlice({
    name: "storeFilter",

    initialState: {
        selectedAttribute: [],
        mainSelectedAttributeArray: [],
        attributes: [],
        brands: [],
        selectedBrand: "",
    },

    reducers: {
        updateAttributes: (state, action) => {
            state.attributes = action.payload
        },
        updateBrands: (state, action) => {
            state.brands = action.payload
        },
        updateSelectedAttribute: (state, action) => {

            const { payload } = action

            console.log(payload)

            let attributeId = payload.attribute_id
            let attributeValue = payload.value
            let attributeObject = { [attributeId]: attributeValue }


            let demoAttributeArray = [...state.selectedAttribute]

            let alreadyInDemoAttributeArray = demoAttributeArray.findIndex(item => Object.keys(item)[0] == attributeId)

            if (alreadyInDemoAttributeArray == -1) {
                console.log("hello")
                demoAttributeArray = [...demoAttributeArray, attributeObject]
            } else {
                console.log("hello sdf")
                demoAttributeArray[alreadyInDemoAttributeArray][attributeId] = attributeValue
            }

            let test = demoAttributeArray.map(value => Object.values(value)[0])

            console.log(test)
            console.log(demoAttributeArray)

            state.mainSelectedAttributeArray = test

            state.selectedAttribute = [...demoAttributeArray]
        },
        updateMainSelectedAttributeArray: (state, action) => {
            state.mainSelectedAttributeArray = []
        },
        updateSelectedBrand: (state, action) => {
            state.selectedBrand = action.payload
        },
    }
})

export const { updateAttributes, updateBrands, updateSelectedAttribute, updateMainSelectedAttributeArray, updateSelectedBrand } = storeFilterSlice.actions

export default storeFilterSlice.reducer