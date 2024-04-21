import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const ContactUsPage = () => {

    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])



    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const handleSendingMessage = () => {
        if (name != "" && mobile != "" && subject != "" && message != "") {
            const data = {
                name: name,
                email: email,
                phone: mobile,
                subject: subject,
                details: message
            }

            axios.post("/contacts", data, {
                headers: {
                    Accept: "application/json"
                }
            }).then(response => {
                console.log(response)
                setName("")
                setEmail("")
                setMobile("")
                setSubject("")
                setMessage("")
            }).catch(errors => {
                console.log(errors.response)
            })
        }
    }



    return (
        <div className='container mx-auto pl-4 pr-4 md:pr-7 mt-20 md:mt-0'>

            <div className="mt-6 flex">
                <ol className="list-reset flex text-sm font-medium font-Poppins">
                    <li><Link to="/" className="text-logobarElementBG">Home</Link></li>
                    <li><span className="mx-2 text-mutedText">/</span></li>
                    <li className="text-mutedText">Contact Us</li>
                </ol>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-8'>

                <div className=''>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="name">Name <span className="text-logobarElementBG">*</span></label>
                        <input type="text" id="name" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" value={name} onChange={e => setName(e.target.value)} placeholder='Enter Name..' />
                        {/* {errorsInAddress && <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorsInAddress?.name}</p>} */}
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="email">Email </label>
                        <input type="text" id="email" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter Email..' />
                        {/* {errorsInAddress && <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorsInAddress?.name}</p>} */}
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="phone">Mobile <span className="text-logobarElementBG">*</span></label>
                        <input type="tel" id="phone" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" value={mobile} onChange={e => setMobile(e.target.value)} placeholder='Enter Mobile..' />
                        {/* {errorsInAddress && <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorsInAddress?.name}</p>} */}
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="subject">Subject <span className="text-logobarElementBG">*</span></label>
                        <input type="text" id="subject" className="border-1 block w-full h-9 focus:outline-none px-4 mt-2 rounded font-DMSans text-sm1 mb-1" value={subject} onChange={e => setSubject(e.target.value)} placeholder='Enter Subject..' />
                        {/* {errorsInAddress && <p className="font-Poppins font-medium text-xs text-logobarElementBG">{errorsInAddress?.name}</p>} */}
                    </div>

                    <div className="mb-3">
                        <label className="font-DMSans text-sm1" htmlFor="message">Message</label>
                        <textarea id="message" className="border-1 block w-full focus:outline-none px-4 py-4 mt-2 rounded font-DMSans text-sm1" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Write Your Message..'></textarea>
                    </div>

                    <div className="px-4 mt-8">
                        <div className="bg-logobarElementBG py-2 flex justify-center rounded-xl cursor-pointer" onClick={handleSendingMessage}>
                            <p className="font-Poppins font-semibold text-xl text-white">Contact Us</p>
                        </div>
                    </div>

                </div>

                <div>
                    <div className='mb-4'>
                        <p className='font-Poppins font-bold text-lg text-logobarElementBG'>Address: <span className='font-DMSans font-normal text-lg text-mutedText'>45, Shah Makhdum Avenue, Sector 12</span></p>
                        <p className='font-DMSans font-normal text-lg text-mutedText'>Uttara, Dhaka</p>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1824.270352110985!2d90.383784!3d23.870438!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9ab1239122d7b03f!2sFashion%20Field!5e0!3m2!1sen!2sbd!4v1639203038671!5m2!1sen!2sbd" className='w-full' style={{ border: 0, height: 500 }} allow
                        FullScreen="" loading="lazy"></iframe>
                </div>

            </div>
        </div>
    )
}

export default ContactUsPage
