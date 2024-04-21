import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Scrollbars } from 'react-custom-scrollbars-2'
import { Link, useLocation } from "react-router-dom"

import { BiPlus, BiMinus } from "react-icons/bi"
import { ImCancelCircle } from "react-icons/im"
import { MdCancel } from "react-icons/md"

import { AiOutlineShoppingCart } from "react-icons/ai"

import { removingProduct, increasingQuantityOfProduct, decreaseingQuantityOfProduct, calculatingTotalPrice, calculatingTotalCartProducts, closeingCartSideBar } from "../ReduxStore/CartSystem/CartStore"

const CartSideBar = props => {

    const { cartSidebar, setCartSideBar } = props
    const dispatch = useDispatch()

    const { pathname } = useLocation()

    useEffect(() => {
        if (pathname.indexOf("/checkout") != -1) {
            dispatch(closeingCartSideBar())
        }
    }, [pathname])

    const testActive = "fixed top-0 right-0 h-screen w-80 md:w-83 bg-white transform transition-all duration-500 z-30 bg-white shadow-2xl"
    const testHidden = "fixed top-0 right-0 h-screen w-0 transform transition-all duration-500 opacity-0 overflow-hidden z-30"

    const { cartArray, cartTotalPrice, cartOpenClose } = useSelector(state => state.testCart)

    useEffect(() => {
        // console.log(cartArray)
    }, [cartArray])

    const handleRemovingProductFromCart = product => {
        // console.log(product)
        dispatch(removingProduct(product))
        dispatch(calculatingTotalPrice())
        dispatch(calculatingTotalCartProducts())
    }

    const handlingIncreasingQuantityOfProduct = product => {
        // console.log(product)
        dispatch(increasingQuantityOfProduct(product))
        dispatch(calculatingTotalPrice())
    }

    const handlingDecreaseingQuantityOfProduct = product => {
        dispatch(decreaseingQuantityOfProduct(product))
        dispatch(calculatingTotalPrice())
    }

    return (
        <div className={cartOpenClose ? testActive : testHidden}>
            <div className="flex justify-between items-center px-4 h-20 bg-topBarBG">
                <p className="font-Poppins font-semibold text-xl overflow-hidden whitespace-nowrap">Shopping Bag</p>
                <div className="flex items-center cursor-pointer" onClick={() => dispatch(closeingCartSideBar())}>
                    <p className="font-Poppins font-semibold text-sm overflow-hidden whitespace-nowrap">More Shopping</p>
                    <AiOutlineShoppingCart className="ml-1 text-logobarElementBG" />
                </div>
            </div>

            <div className="flex flex-col whitespace-nowrap custom-height">

                <Scrollbars className="h-4/5">
                    <div className="px-4 pt-3 overflow-hidden argha-shipan-sarker">
                        {
                            cartArray.map((item, index) => (
                                <div key={index} className="flex mb-6 relative">
                                    <div className="h-23 w-1/4">
                                        <img src={item.productImage} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="ml-4 w-3/4">

                                        <Link onClick={() => dispatch(closeingCartSideBar())} to={`/product/${item.productSlug}`} className="font-DMSans hover:text-logobarElementBG font-medium text-sm w-11/12 whitespace-pre-line line-clamp-2">{item.productName}</Link>

                                        {
                                            item.productVariantData && (
                                                <div className='flex'>
                                                    {
                                                        item.productVariantData.attributes.map((item, index) => (
                                                            <p className="font-DMSans font-medium text-xs" key={index}>
                                                                {
                                                                    index != 0 ? "-" : ""
                                                                }
                                                                {item.value}

                                                            </p>

                                                        ))
                                                    }

                                                </div>
                                            )
                                        }

                                        {
                                            item.productOutOfStock ? (
                                                <p className="font-DMSans font-medium text-sm text-logobarElementBG">Out of Stock</p>
                                            ) : (
                                                <div>
                                                    <div className="mt-3 flex items-center">

                                                        <div className="h-7 w-22 border-1 flex justify-between items-center">
                                                            <div
                                                                className="w-2/4 h-full flex justify-center items-center cursor-pointer border-r-1"
                                                                onClick={() => handlingDecreaseingQuantityOfProduct(item)}
                                                            >
                                                                <BiMinus />
                                                            </div>
                                                            <div className="w-2/4 h-full flex justify-center items-center">
                                                                <p className="font-DMSans font-normal text-xs">{item.productQuantity}</p>
                                                            </div>
                                                            <div
                                                                className="w-2/4 h-full flex justify-center items-center cursor-pointer border-l-1"
                                                                onClick={() => handlingIncreasingQuantityOfProduct(item)}
                                                            >
                                                                <BiPlus />
                                                            </div>
                                                        </div>
                                                        <div className="ml-2">
                                                            <p className="font-DMSans text-sm">{item.productQuantity} x Tk.{item.productPrice}</p>
                                                        </div>

                                                    </div>

                                                    <div className="mt-1">
                                                        <p>Tk. {item.productQuantity * item.productPrice}</p>
                                                    </div>
                                                </div>
                                            )
                                        }


                                    </div>
                                    <div className="absolute -top-2 right-0 cursor-pointer" onClick={() => handleRemovingProductFromCart(item)}>
                                        <ImCancelCircle />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Scrollbars>
                <div className="cart-footer h-1/5 px-4 bg-topBarBG flex items-center">
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-Poppins font-semibold text-xl overflow-hidden">SubTotal:</p>
                            <p className="font-Poppins font-semibold text-xl overflow-hidden text-logobarElementBG">Tk.{cartTotalPrice}</p>
                        </div>
                        {
                            pathname.indexOf("/checkout") == -1 ? (
                                <Link className="w-full h-10 bg-logobarElementBG rounded flex justify-center items-center cursor-pointer" to="/checkout">
                                    <p className="font-Poppins font-semibold text-xl text-white">CHECKOUT</p>
                                </Link>
                            ) : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartSideBar
