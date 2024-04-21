import React, { useState, useEffect } from 'react'
import Rating from "react-rating"
import { useSelector, } from 'react-redux'
import axios from 'axios'
import Moment from 'react-moment';

const CustomerReview = props => {

    const { productSlug, } = props
    const { token } = useSelector(state => state.authInfo)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [review, setReview] = useState(0)
    const [reviewData, setReviewData] = useState(null)

    const fetchingReviews = () => {
        axios.get(`/products/${productSlug}/reviews`, {
            headers: {
                Authorization: "Bearer " + token,
                Accept: 'application/json',
            }
        }).then(response => {
            // console.log(response)
            setReviewData(response.data)
        }).catch(errors => {
            console.log(errors.response)
        })
    }

    useEffect(() => {
        fetchingReviews()

    }, [productSlug, token])


    useEffect(() => {
        if (token != null) {
            axios.get("/customer/profile", {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                // console.log(response)
                setName(response.data.name)
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }, [token])

    const handlingSubmitReview = () => {
        if (name != "" && description != "" && review != null) {
            axios.post(`/products/${productSlug}/reviews`, {
                rating: review,
                review: description,
                name: name
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                }
            }).then(response => {
                console.log(response)
                fetchingReviews()
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }


    return (
        <div>

            {
                reviewData?.review_access && (
                    <div className="w-2/3">

                        <p className="font-Poppins font-semibold text-xl">Submit Your Review</p>

                        <input type="text" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1 mt-4" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />

                        <div className="flex items-center mt-4">
                            <p>Give your Ratings for the product :</p>
                            <div className="ml-4">
                                <Rating
                                    emptySymbol="fa fa-star-o text-lg"
                                    fullSymbol="fa fa-star text-lg"
                                    // fractions={2}
                                    onChange={value => setReview(value)}
                                    initialRating={review}
                                />
                            </div>
                        </div>

                        <div className="mb-3 mt-4">
                            <textarea className="border-1 block w-full focus:outline-none px-4 py-4 mt-2 rounded font-DMSans text-sm1" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write your Review here.."></textarea>
                        </div>

                        <button className="font-Poppins text-base w-20 h-10 border-1 border-logobarElementBG text-logobarElementBG hover:bg-logobarElementBG hover:text-white rounded-lg mt-10" onClick={handlingSubmitReview}>SUBMIT</button>

                        <hr className="my-8" />

                    </div>
                )
            }


            <div className="w-2/3">
                <p className="font-Poppins font-semibold text-xl mt-10 mb-6">Verified Customer's Review</p>
                <hr className="my-4" />

                {
                    reviewData?.reviews?.map((item, index) => (
                        <div key={index}>
                            <div className="flex items-center">
                                <p className="font-Poppins font-semibold text-lg">{item.customer?.name}</p>
                                <p className="font-Poppins font-normal text-xs text-mutedText ml-4"><Moment format="D MMM YYYY">{item.created_at}</Moment></p>
                            </div>

                            <Rating
                                emptySymbol="fa fa-star-o text-lg"
                                fullSymbol="fa fa-star text-lg"
                                fractions={2}
                                initialRating={item.rating}
                                quiet={true}
                                readonly
                            />

                            <p className="font-DMSans text-sm text-sliderDescription mt-2">{item.review}</p>

                            <hr className="my-2" />

                        </div>
                    ))
                }


            </div>


        </div>
    )
}

export default CustomerReview
