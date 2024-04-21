import axios from 'axios';
import React from 'react'
import { MdEmail } from "react-icons/md"

import NewsLetterIcon from "../../../Assets/Images/NewsLetterIcon.png"

const NewsLetter = () => {

    const [email, setEmail] = React.useState('');

    const handleSubmitEmail = () => {
        axios.post(`newsletter`, {
            email: email
        }, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error.response);
        })
    }

    return (
        <div className="bg-topBarBG h-52 xs:h-44 md:h-38 mt-8">
            <div className="container mx-auto px-4 h-full">
                <div className="h-full md:pr-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-4">
                        <div className="flex items-center mt-4 md:mt-0">
                            <div className="w-14 h-9 mr-8">
                                <img src={NewsLetterIcon} alt="News Letter Icon" className="w-full" />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-Poppins font-semibold text-2xl text-sliderText">Signup for Newsletter</p>
                                <p className="font-DMSans font-semibold text-sm text-sliderText">We'll never share your email address with a third-party</p>
                            </div>
                        </div>

                        <div className="flex items-center mb-4 md:mb-0">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={(e) => (e.key === 'Enter') ? handleSubmitEmail() : ''} type="text" placeholder="Enter Your Email" className="w-4/5 h-12 px-7 border-2 focus:outline-none rounded-l border-r-0" />
                            <button onClick={() => handleSubmitEmail()} className="h-12 w-1/5 bg-logobarElementBG hover:bg-menuHover font-Poppins font-semibold text-white flex justify-center items-center rounded-r">
                                <MdEmail size={30} className="lg:hidden" />
                                <p className="hidden lg:block">Subscribe</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter
