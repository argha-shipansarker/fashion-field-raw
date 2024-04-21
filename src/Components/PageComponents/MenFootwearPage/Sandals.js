import React, { useEffect, useState } from 'react'
import axios from 'axios'

import SandalsSlider from './SandalsSlider'
import { Link } from 'react-router-dom'

const Sandals = props => {
    const { item } = props

    const [products, setProducts] = useState(null)


    useEffect(() => {
        axios.get(`/product-categories/${item.slug}/slider`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            // console.log(response.data)
            setProducts(response.data.products)
        }).catch(errors => {
            console.log(errors.response)
        })
    }, [item])


    useEffect(() => {
        // console.log(item)
    }, [])
    return (
        <div className="container mx-auto px-4 mt-10">
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5"><Link to={`/category/${item.slug}`}>{item.name}</Link></p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-7"></div>
            <SandalsSlider products={products} />
        </div>
    )
}

export default Sandals
