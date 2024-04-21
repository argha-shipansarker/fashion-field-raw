import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from "react-icons/io"

const BackToTop = () => {

    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    useEffect(() => {
        // Button is displayed after scrolling for 500 pixels
        const toggleVisibility = () => {
            if (window.scrollY > 700) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
            <div onClick={scrollToTop} className="w-12.5 h-12.5 bg-logobarElementBG flex justify-center items-center fixed bottom-10 right-8 rounded-3xl cursor-pointer" style={{ boxShadow: "0px 0px 25px -10px #000000" }}>
                <IoIosArrowUp color="white" size={30} />
            </div>
        </>
    )
}

export default BackToTop
