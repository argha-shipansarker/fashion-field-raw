import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Image1 from "../../../Assets/Images/FilteredImage/FilteredImage1.png"
import Image2 from "../../../Assets/Images/FilteredImage/FilteredImage2.png"
import Image3 from "../../../Assets/Images/FilteredImage/FilteredImage3.png"

import { addingProductInWishListArray, settingNumberOfWishListItems } from '../../../ReduxStore/WishListSystem/WishListStore'
import { addingProduct, calculatingTotalPrice, calculatingTotalCartProducts } from "../../../ReduxStore/CartSystem/CartStore"

const WishlistSummary = () => {

    const { wishListArray } = useSelector(state => state.wishList)
    const { token } = useSelector(state => state.authInfo)

    const dispatch = useDispatch()

    const removingProductFromWishList = item => {
        console.log(item)
        if (token != null) {
            axios.delete(`/customer/wishlists/${item.id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log(response)
                axios.get("/customer/wishlists", {
                    headers: {
                        Authorization: "Bearer " + token,
                        Accept: 'application/json',
                    }
                }).then(response => {
                    console.log(response)
                    dispatch(addingProductInWishListArray(response.data))
                    dispatch(settingNumberOfWishListItems(response.data.length))
                }).catch(errors => {
                    console.log(errors.response)
                })
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }


    const handleAddingProductInCart = (item) => {
        console.log(item)
        const modifiedProductObjectWithQuantity = { ...item.product, productQuantity: 1, type: "product", groupId: "", variantData: null }
        dispatch(addingProduct(modifiedProductObjectWithQuantity))
        dispatch(calculatingTotalPrice())
        dispatch(calculatingTotalCartProducts())
    }

    return (
        <div className="recent-orders">
            <div className="border-1 border-borderColor px-4 py-4 rounded-lg">
                <div className="hidden md:block">
                    <table className="w-full table-fixed">
                        <thead className="">
                            <tr className="border-b h-12">
                                <th className="font-Poppins font-medium text-sm w-3/4 text-left pl-2">Product</th>
                                <th className="font-Poppins font-medium text-sm w-1/4 text-left">Price</th>
                                <th className="font-Poppins font-medium text-sm w-2/4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                wishListArray.map((item, index) => (
                                    <tr className={`${wishListArray.length - 1 == index ? "" : "border-b"} h-36`} key={index}>
                                        <td className="pl-2">
                                            <div className="flex items-center">
                                                <div className="h-28 w-1/4">
                                                    <img src={item.product?.thumbnail} className="h-full w-full object-contain" />
                                                </div>
                                                <div className="w-3/4 ml-4 mr-3">
                                                    <p className="font-DMSans text-sm line-clamp-2">{item?.product?.name}</p>
                                                    {/* <p className="font-DMSans text-sm mt-2"><b>Color</b>: Blue</p> */}
                                                    {/* <p className="font-DMSans text-sm mt-2"><b>Size</b>: L</p> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="font-DMSans text-sm text-logobarElementBG font-bold">TK. {item.product?.selling_price}</p>
                                            {item.product?.special_price ? <strike className="font-DMSans text-sm1 text-mutedText">TK. {item.product?.price}</strike> : ""}

                                        </td>
                                        <td>
                                            <div className="">

                                                {
                                                    item?.product?.is_variable ? (
                                                        <Link to={`/product/${item?.product?.slug}`} className="font-Poppins text-sm px-4 py-2 bg-logobarElementBG text-white rounded-lg" target="_blank">Add to Bag</Link>
                                                    ) : (
                                                        <button className="font-Poppins text-sm px-4 py-2 bg-logobarElementBG text-white rounded-lg" onClick={() => handleAddingProductInCart(item)}>Add to Bag</button>
                                                    )
                                                }

                                                <button className="font-Poppins text-sm px-4 py-2 border-1 border-logobarElementBG hover:bg-logobarElementBG hover:text-white text-logobarElementBG rounded-lg ml-4" onClick={() => removingProductFromWishList(item)}>Remove</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>

                {/* For Responsiveness */}

                <div className="responsive-order-list md:hidden">


                    {
                        wishListArray.map((item, index) => (
                            <div>
                                <div className="mb-4 flex flex-col items-center">
                                    <div className="h-28 w-1/4">
                                        <img src={item.product?.thumbnail} className="h-full w-full object-contain" />
                                    </div>
                                    <div className="w-3/4 flex flex-col items-center">
                                        <p className="font-DMSans text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: item.product?.short_description }} />
                                        {/* <div className="mt-2 flex">
                                <p className="font-DMSans text-sm mr-8"><b>Color</b>: Blue</p>
                                <p className="font-DMSans text-sm"><b>Size</b>: L</p>
                            </div> */}
                                        <div className="mt-3 flex items-center">
                                            <p className="font-DMSans text-sm text-logobarElementBG font-bold mr-8">Tk.{item.product?.selling_price}</p>
                                            {item.product?.special_price ? <strike className="font-DMSans text-sm1 text-mutedText">TK. {item.product?.price}</strike> : ""}
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        {
                                            item?.product?.is_variable ? (
                                                <Link to={`/product/${item?.product?.slug}`} className="font-Poppins text-sm px-4 py-2 bg-logobarElementBG text-white rounded-lg" target="_blank">Add to Bag</Link>
                                            ) : (
                                                <button className="font-Poppins text-sm px-4 py-2 bg-logobarElementBG text-white rounded-lg" onClick={() => handleAddingProductInCart(item)}>Add to Bag</button>
                                            )
                                        }
                                        <button className="font-Poppins text-sm px-4 py-2 border-1 border-logobarElementBG hover:bg-logobarElementBG hover:text-white text-logobarElementBG rounded-lg ml-4" onClick={() => removingProductFromWishList(item)}>Remove</button>
                                    </div>
                                </div>
                                {
                                    wishListArray.length - 1 == index ? "" : <hr className="mb-1" />
                                }
                                {
                                    wishListArray.length - 1 == index ? "" : <hr className="mb-4" />
                                }
                            </div>
                        ))
                    }

                </div>

            </div>
        </div>
    )
}

export default WishlistSummary
