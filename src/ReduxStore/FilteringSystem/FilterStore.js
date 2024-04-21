import { createSlice, current } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filterSlice",

    initialState: {
        sortingValue: { value: 1, label: "Default Sorting" },
        sorted_FilteredProducts: [],
        attributes: [],
        brands: [],
        selectedBrand: "",
        selectedAttribute: [],
        mainSelectedAttributeArray: [],
    },

    reducers: {
        updateSortingValue: (state, action) => {
            state.sortingValue = action.payload
        },
        updateSorted_FilteredProducts: (state, action) => {
            state.sorted_FilteredProducts = action.payload
        },
        updateAttributes: (state, action) => {
            state.attributes = action.payload
        },
        updateBrands: (state, action) => {
            state.brands = action.payload
        },
        updateSelectedBrand: (state, action) => {
            state.selectedBrand = action.payload
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
        updateSelectedAttributeArrayToInitial: (state, action) => {
            state.selectedAttribute = []
        }
    }
})

export const { updateSortingValue, updateSorted_FilteredProducts, updateAttributes, updateBrands, updateSelectedBrand, updateSelectedAttribute, updateMainSelectedAttributeArray, updateSelectedAttributeArrayToInitial } = filterSlice.actions

export default filterSlice.reducer