import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useLocation } from 'react-router-dom'
import renderHTML from 'react-render-html';

const ContentPages = () => {

    const [pageData, setPageData] = useState(null)

    const { slug } = useParams()

    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    useEffect(() => {
        axios.get(`/pages/${slug}`, {
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            console.log(response)
            setPageData(response.data)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [slug])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])


    return (
        <div className='container mx-auto pl-4 pr-4 md:pr-7'>

            {/* <div className='h-40 flex justify-center items-center mt-10'>
                <p className='font-Poppins font-bold text-orderTrack text-4xl'>{pageData?.name}</p>
            </div> */}

            <p className='font-Poppins font-bold text-orderTrack text-4xl text-center mt-20'>{pageData?.name}</p>
            <div className="mt-6 flex justify-center">
                <ol className="list-reset flex text-sm font-medium font-Poppins">
                    <li><Link to="/" className="text-logobarElementBG">Home</Link></li>
                    <li><span className="mx-2 text-mutedText">/</span></li>
                    <li className="text-mutedText">{pageData?.name}</li>
                </ol>
            </div>

            <div
                dangerouslySetInnerHTML={{ __html: pageData?.description }}
                className='mt-10 content-page-description'
            />

        </div>
    )
}

export default ContentPages
