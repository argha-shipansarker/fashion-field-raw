import React from 'react'
import renderHTML from 'react-render-html';

import Description1 from "../../../Assets/Images/IndividualProduct/Description1.png"
import Description2 from "../../../Assets/Images/IndividualProduct/Description2.png"
import Description3 from "../../../Assets/Images/IndividualProduct/Description3.png"

const Description = ({ description }) => {
    return (
        <>
            {/* {renderHTML(description)} */}
            <div dangerouslySetInnerHTML={{ __html: description }} />
        </>
    )
}

export default Description
