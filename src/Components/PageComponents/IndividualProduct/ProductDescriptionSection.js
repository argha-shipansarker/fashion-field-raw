import React, { useState } from 'react'
import Description from './Description';
import CustomerReview from './CustomerReview';


const ProductDescriptionSection = (props) => {

    // const [openTab, setOpenTab] = useState(1);

    const { description, specification, productSlug, numberOfReviews, openTab, setOpenTab } = props;

    React.useEffect(() => {
        // console.log(specification);
    }, [specification])

    return (
        <div className="mt-8">
            <div className="w-full">
                <ul
                    className="flex mb-0 list-none flex-wrap flex-row relative items-center justify-between"
                    role="tablist"
                >

                    <hr style={{ width: 350 }} />

                    <div className="flex flex-wrap w-full md:w-auto">

                        <li className="-mb-px mr-2 last:mr-0 text-center">
                            <a
                                className={
                                    "text-lg md:text-xl font-semibold font-Poppins md:px-3 py-3 block leading-normal " +
                                    (openTab === 1
                                        ? "text-topBarTextColor"
                                        : "text-mutedText")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                Description
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-lg md:text-xl font-semibold font-Poppins md:px-3 py-3 block leading-normal " +
                                    (openTab === 2
                                        ? "text-topBarTextColor"
                                        : "text-mutedText")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Specfication
                            </a>
                        </li>
                        <li className="-mb-px last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-lg md:text-xl font-semibold font-Poppins md:px-3 py-3 block leading-normal " +
                                    (openTab === 3
                                        ? "text-topBarTextColor"
                                        : "text-mutedText")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                {`Reviews`}
                            </a>
                        </li>

                    </div>

                    <hr style={{ width: 350 }} />
                </ul>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                    <div className="flex-auto">
                        <div className="tab-content tab-space relative">
                            <div className={openTab === 1 ? "opacity-100 duration-700 transition-all transform max-w-full" : "absolute top-0 -left-full opacity-0 transition-all transform duration-1000 w-0 h-0"} id="link1">
                                <Description description={description} />
                            </div>
                            <div className={openTab === 2 ? "opacity-100 duration-700 transition-all transform max-w-full" : "absolute top-0 -left-full opacity-0 transition-all transform duration-1000 w-0 h-0"} id="link2">
                                {<div className='table-css' dangerouslySetInnerHTML={{ __html: specification?.specification }} />}
                            </div>
                            <div className={openTab === 3 ? "opacity-100 duration-700 transition-all transform max-w-full pt-5" : "absolute top-0 -left-full opacity-0 transition-all transform duration-1000 w-0 h-0"} id="link3">
                                <CustomerReview productSlug={productSlug} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDescriptionSection
