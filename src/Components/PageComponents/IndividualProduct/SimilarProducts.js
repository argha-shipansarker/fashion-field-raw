import React from 'react'
import SportsShoesSlider from '../MenFootwearPage/SportsShoes/SportsShoesSlider'

const SimilarProducts = (props) => {
    const { similarProducts } = props;
    return (
        <div className="mt-16">
            <p className="font-Poppins font-semibold text-xl text-sliderHeading mb-1.5">Similar Products</p>
            <div className="w-12 h-1.5 bg-logobarElementBG rounded-lg mb-7"></div>
            <SportsShoesSlider similarProducts={similarProducts} />
        </div>
    )
}

export default SimilarProducts
