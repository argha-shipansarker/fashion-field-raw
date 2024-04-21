import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Moment from 'react-moment';
import Rating from "react-rating"
import { Link, useLocation } from 'react-router-dom';
import Pagination from '../../Pagination';

const ReviewedProducts = () => {

    const { token } = useSelector(state => state.authInfo)
    const [reviewData, setReviewData] = useState(null)


    useEffect(() => {
        if (token != null) {
            axios.get("/customer/reviews", {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log(response)
                setReviewData(response.data)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [token])

    const updatePage = (url) => {
        if (token != null) {
            axios.get(url, {
                headers: {
                    Authorization: token,
                    Authorization: "Bearer " + token,
                }
            }).then(response => {
                setReviewData(response.data)
                console.log(response)
            })
        }
    }



    return (
        <div>
            <div className="border-1 border-borderColor px-4 py-4 rounded-lg">

                <div className="hidden md:block">
                    <table className="w-full table-fixed">
                        <thead className="">
                            <tr className="border-b h-12">
                                <th className="font-Poppins font-medium text-sm w-1/5 text-left pl-2">Created</th>
                                <th className="font-Poppins font-medium text-sm w-2/5 text-left">Product Name</th>
                                <th className="font-Poppins font-medium text-sm w-1/5 text-left">Rating</th>
                                <th className="font-Poppins font-medium text-sm w-2/5 text-left">Review</th>
                                <th className="font-Poppins font-medium text-sm w-1/5 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                reviewData && reviewData?.data?.map((item, index) => (
                                    <tr className={`${reviewData?.data?.length - 1 == index ? "" : "border-b"} h-12`} key={index}>
                                        <td className="pl-2">
                                            <p className="font-DMSans text-sm1"><Moment format="D/MM/YYYY">{item?.created_at}</Moment></p>
                                        </td>
                                        <td>
                                            <p className="font-DMSans text-sm1 line-clamp-1">{item?.product?.name}</p>
                                        </td>
                                        <td>
                                            {/* <Tippy content="4.00" placement="top"> */}
                                            <Rating
                                                emptySymbol="fa fa-star-o text-lg"
                                                fullSymbol="fa fa-star text-lg"
                                                // fractions={2}
                                                initialRating={item?.rating}
                                                quiet={true}
                                                readonly
                                            />
                                            {/* </Tippy> */}
                                        </td>
                                        <td className="pr-3">
                                            <p className="font-DMSans text-sm1 line-clamp-1">{item?.review}</p>
                                        </td>
                                        <td>
                                            <Link to={`/product/${item?.product?.slug}`} target="_blank" className="font-DMSans text-sm1 hover:text-logobarElementBG font-medium cursor-pointer">View</Link>
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
                        reviewData && reviewData?.data?.map((item, index) => (
                            <div key={index}>
                                <div className="mb-4">
                                    <p className="font-Poppins font-medium text-sm mb-1">Created: <Moment className="font-DMSans text-sm1 font-normal inline-block ml-2" format="D/MM/YYYY">{item?.created_at}</Moment></p>

                                    <div className="flex items-center">
                                        <p className="font-Poppins font-medium text-sm mb-1 whitespace-nowrap">Product Name:</p>
                                        <p className="font-DMSans text-sm1 font-normal line-clamp-1 ml-2">
                                            {item?.product?.name}
                                        </p>
                                    </div>
                                    <p className="font-Poppins font-medium text-sm mb-1 flex items-center">Rating:
                                        {/* <Tippy content="4.00" placement="top"> */}
                                        <Rating
                                            emptySymbol="fa fa-star-o text-lg"
                                            fullSymbol="fa fa-star text-lg"
                                            // fractions={2}
                                            initialRating={item?.rating}
                                            quiet={true}
                                            readonly
                                            className="ml-2"
                                        />
                                        {/* </Tippy> */}
                                    </p>


                                    <div className="flex items-center">
                                        <p className="font-Poppins font-medium text-sm mb-1">Review:</p>
                                        <p className="font-DMSans text-sm1 font-normal line-clamp-1 ml-2">
                                            {item?.review}
                                        </p>
                                    </div>

                                    <Link to={`/product/${item?.product?.slug}`} className="font-Poppins font-medium text-sm font-medium">View</Link>
                                </div>
                                {reviewData?.data?.length - 1 == index ? "" : <hr className="mb-1" />}
                                {reviewData?.data?.length - 1 == index ? "" : <hr className="mb-4" />}
                            </div>
                        ))
                    }
                </div>

            </div>

            <div className='mt-6 flex justify-end'>
                {reviewData && <Pagination sellers={reviewData} setUpdate={updatePage} />}
            </div>
        </div>
    )
}

export default ReviewedProducts
