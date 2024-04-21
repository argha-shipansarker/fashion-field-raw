import { createSlice, current } from "@reduxjs/toolkit"

export const testingCartSlice = createSlice({
    name: "testingCart",

    initialState: {
        cartItem: 0,
        cartArray: [],
        cartTotalPrice: 0,
        cartOpenClose: false,
        addedToCartNotification: false,
    },

    reducers: {
        addingProduct: (state, action) => {
            const { payload } = action

            console.log(payload.variantData)
            console.log(payload.allVariants)
            // console.log(payload.argha)

            console.log(payload)
            // let demoCartArray = state.cartArray

            state.cartTotalPrice = 0

            let demoCartArray = [...state.cartArray]

            let productVariantData = payload.variantData
            let productImage
            let productStock

            if (productVariantData == null) {
                productImage = payload.thumbnail
                productStock = payload.stock
            } else {
                // productImage = payload.thumbnail
                let temp
                payload.allVariants.map(item => {
                    productVariantData.attributes.map(value => {
                        if (value.value == item.value) {
                            temp = item
                        }
                    })
                })
                console.log(temp)
                productImage = temp?.thumbnails[0]?.thumbnail
                productStock = productVariantData.stock
            }

            const productId = payload.id
            const productName = payload.name
            const productPrice = payload.selling_price
            let productQuantity = payload.productQuantity
            let productType = payload.type
            let productGroupId = payload.groupId
            let productOutOfStock = payload.outOfStock

            let productSlug = payload.slug

            let alreadyInCart = demoCartArray.findIndex(item => item.productId == productId)

            if (alreadyInCart == -1) {
                demoCartArray = [...demoCartArray, { productId: productId, productName: productName, productImage: productImage, productPrice: productPrice, productQuantity: productQuantity, productType: productType, productGroupId: productGroupId, productVariantData: productVariantData, productStock: productStock, productOutOfStock: productOutOfStock, productSlug }]

            } else {

                if (productVariantData == null) {
                    if (demoCartArray[alreadyInCart].productQuantity <= productStock) {
                        demoCartArray[alreadyInCart].productQuantity = productQuantity
                    }
                } else {
                    let sameVarient = demoCartArray.findIndex(item => item.productVariantData?.id == productVariantData.id)
                    if (sameVarient == -1) {
                        demoCartArray = [...demoCartArray, { productId: productId, productName: productName, productImage: productImage, productPrice: productPrice, productQuantity: productQuantity, productType: productType, productGroupId: productGroupId, productVariantData: productVariantData, productStock: productStock, productOutOfStock: productOutOfStock, productSlug }]
                    } else {
                        if (demoCartArray[sameVarient].productQuantity <= productStock) {
                            demoCartArray[sameVarient].productQuantity = productQuantity
                        }
                    }
                }

            }

            state.cartArray = [...demoCartArray]

            localStorage.setItem("cart", JSON.stringify(state.cartArray))

        },

        removingProduct: (state, action) => {
            const { payload } = action

            console.log(payload)

            let demoCartArray = [...state.cartArray]

            // demoCartArray = demoCartArray.filter(item => item.productId != payload.productId)


            if (payload.productVariantData == null) {
                demoCartArray = demoCartArray.filter(item => item.productId != payload.productId)
            } else {
                demoCartArray = demoCartArray.filter(item => item.productVariantData?.id != payload.productVariantData.id)
                // demoCartArray[sameVarient].productQuantity += 1
            }







            state.cartArray = [...demoCartArray]

            localStorage.setItem("cart", JSON.stringify(state.cartArray))
        },

        increasingQuantityOfProduct: (state, action) => {
            const { payload } = action

            let demoCartArray = [...state.cartArray]

            let specificProduct = demoCartArray.findIndex(item => item.productId == payload.productId)




            if (payload.productVariantData == null) {
                if (demoCartArray[specificProduct].productQuantity < demoCartArray[specificProduct].productStock) {
                    demoCartArray[specificProduct].productQuantity += 1
                }
            } else {
                let sameVarient = demoCartArray.findIndex(item => item.productVariantData?.id == payload.productVariantData.id)
                if (demoCartArray[sameVarient].productQuantity < demoCartArray[sameVarient].productStock) {
                    demoCartArray[sameVarient].productQuantity += 1
                }
            }






            // demoCartArray[specificProduct].productQuantity += 1

            state.cartArray = [...demoCartArray]

            localStorage.setItem("cart", JSON.stringify(state.cartArray))
        },

        decreaseingQuantityOfProduct: (state, action) => {
            const { payload } = action

            if (payload.productQuantity > 1) {

                let demoCartArray = [...state.cartArray]

                let specificProduct = demoCartArray.findIndex(item => item.productId == payload.productId)

                // demoCartArray[specificProduct].productQuantity -= 1



                if (payload.productVariantData == null) {
                    demoCartArray[specificProduct].productQuantity -= 1
                } else {
                    let sameVarient = demoCartArray.findIndex(item => item.productVariantData?.id == payload.productVariantData.id)
                    demoCartArray[sameVarient].productQuantity -= 1
                }






                state.cartArray = [...demoCartArray]

                localStorage.setItem("cart", JSON.stringify(state.cartArray))
            }
        },

        calculatingTotalPrice: (state, action) => {
            state.cartTotalPrice = 0

            state.cartArray.forEach(item => {
                state.cartTotalPrice += (item.productPrice * item.productQuantity)
            })

            // localStorage.setItem("cartTotalPrice", JSON.stringify(cartTotalPrice))
        },

        addingCartValueFromLocalStorage: (state, action) => {
            state.cartArray = action.payload
        },

        calculatingTotalCartProducts: (state, action) => {
            state.cartItem = 0

            state.cartArray.forEach(item => {
                state.cartItem += 1
            })
        },

        removingAllProductsFromCartAfterCheckout: (state, action) => {
            state.cartArray = []
        },

        openingCartSideBar: (state, action) => {
            state.cartOpenClose = true
        },

        closeingCartSideBar: (state, action) => {
            state.cartOpenClose = false
        },

        increasingQuantityOfProductBeforeAddingToCart: (state, action) => {
            const { payload } = action

            let demoCartArray = [...state.cartArray]

            const productId = payload.id
            let productVariantData = payload.variantData

            let alreadyInCart = demoCartArray.findIndex(item => item.productId == productId)

            if (alreadyInCart != -1) {
                if (productVariantData == null) {
                    demoCartArray[alreadyInCart].productQuantity += 1
                } else {
                    let sameVarient = demoCartArray.findIndex(item => item.productVariantData?.id == productVariantData.id)
                    if (sameVarient != -1) {
                        demoCartArray[sameVarient].productQuantity += 1
                    }
                }
            }

            state.cartArray = [...demoCartArray]

            localStorage.setItem("cart", JSON.stringify(state.cartArray))
        },

        modifingCartArrayForOutOfStockProducts: (state, action) => {
            const { payload } = action
            console.log(payload)
            let indexOfOutOfStockProduct = Object.keys(payload)
            console.log(indexOfOutOfStockProduct)
            let demoCartArray = [...state.cartArray]
            console.log(demoCartArray)
            indexOfOutOfStockProduct.map(value => {
                demoCartArray[value].productOutOfStock = true
            })
            console.log(demoCartArray)
            state.cartArray = [...demoCartArray]

            localStorage.setItem("cart", JSON.stringify(state.cartArray))
        },

        openAddedToCartNotificationModal: (state, action) => {
            state.addedToCartNotification = true
        },

        closeAddedToCartNotificationModal: (state, action) => {
            state.addedToCartNotification = false
        }
    }
})

export const { addingProduct, removingProduct, increasingQuantityOfProduct, decreaseingQuantityOfProduct, calculatingTotalPrice, addingCartValueFromLocalStorage, calculatingTotalCartProducts, removingAllProductsFromCartAfterCheckout, openingCartSideBar, closeingCartSideBar, increasingQuantityOfProductBeforeAddingToCart, modifingCartArrayForOutOfStockProducts, openAddedToCartNotificationModal, closeAddedToCartNotificationModal } = testingCartSlice.actions

export default testingCartSlice.reducer