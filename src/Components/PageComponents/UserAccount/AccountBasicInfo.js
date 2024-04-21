import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import axios from 'axios'

const AccountBasicInfo = () => {

    const { mobileNumber, token } = useSelector(state => state.authInfo)
    // console.log(mobileNumber, token)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        axios.get("/customer/profile", {
            headers: {
                Authorization: "Bearer " + token,
                Accept: 'application/json',
            }
        }).then(response => {
            console.log(response)
            setName(response.data.name)
            setEmail(response.data.email)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [token])

    return (
        <div className="mb-3">
            <p className="font-DMSans text-sm1 mb-1"><b>Mobile Number :</b> {mobileNumber}</p>
            <p className="font-DMSans text-sm1 mb-1"><b>Name:</b> {name}</p>
            <p className="font-DMSans text-sm1"><b>Email:</b> {email}</p>
        </div>
    )
}

export default AccountBasicInfo
