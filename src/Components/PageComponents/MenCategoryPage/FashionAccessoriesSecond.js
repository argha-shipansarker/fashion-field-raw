import React from 'react'

import CustomizedHeightBlock from '../../ReuseableComponents/CustomizedHeightBlock'

import GridImage1 from "../../../Assets/Images/MenCategory/GridImage1.png"
import GridImage2 from "../../../Assets/Images/MenCategory/GridImage2.png"
import GridImage3 from "../../../Assets/Images/MenCategory/GridImage3.png"
import GridImage4 from "../../../Assets/Images/MenCategory/GridImage4.png"
import GridImage5 from "../../../Assets/Images/MenCategory/GridImage5.png"
import GridImage6 from "../../../Assets/Images/MenCategory/GridImage6.png"

const FashionAccessoriesSecond = () => {
    return (
        <div className="container mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:pr-7">
                <div className="col-span-6 md:col-span-5">
                    <CustomizedHeightBlock
                        height="h-59"
                        image={GridImage6}
                        category="Comforters"
                        name="Magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia"
                        price={325}
                    />

                    <div className="mt-4">
                        <CustomizedHeightBlock
                            height="h-115.5"
                            image={GridImage3}
                            category="Tops"
                            name="Dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt"
                            price={350}
                        />
                    </div>

                </div>

                <div className="col-span-6 md:col-span-3">
                    <CustomizedHeightBlock
                        height="h-106 md:h-87.5"
                        image={GridImage5}
                        category="Decor"
                        name="Quasi architecto beatae vita dicta sunt explicabo nemo enim ipsam voluptatem"
                        price={360}
                    />

                    <div className="mt-4">
                        <CustomizedHeightBlock
                            height="h-106 md:h-87.5"
                            image={GridImage2}
                            category="Decor"
                            name="Quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur"
                            price={875}
                        />
                    </div>
                </div>

                <div className="col-span-6 md:col-span-4">
                    <CustomizedHeightBlock
                        height="h-115.5"
                        image={GridImage4}
                        category="Chair"
                        name="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
                        price={410}
                    />
                    <div className="mt-4">
                        <CustomizedHeightBlock
                            height="h-59"
                            image={GridImage1}
                            category="Chair"
                            name="Doloremque laudantium totam rem aperia eaque ipsa quae ab illo inventore veri"
                            price={1200}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FashionAccessoriesSecond
