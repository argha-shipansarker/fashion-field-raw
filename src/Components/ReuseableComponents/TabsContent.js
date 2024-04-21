import React, { useEffect, useState } from 'react'

const TabsContent = props => {
    const { firstTab, secondTab, thirdTab, fourthTab, fifthTab, sixthTab, setOpenTab, openTab, hamburgerOpen, setHamburgerOpen } = props

    const [tabValue, setTabValue] = useState(null)

    useEffect(() => {
        let a = Object.keys(props)
        // console.log(a)
        const tabValues = a.filter(item => item.includes("Name"))
        setTabValue(tabValues)
        // console.log(tabValues)
    }, [])




    // console.log(props)
    return (
        <>

            {
                tabValue && tabValue.map((item, index) => (
                    <li className="-mb-px mr-2 last:mr-0 text-center" key={index}>
                        <a
                            className={
                                "text-sm font-medium font-Poppins px-3 py-3 block leading-normal " +
                                (openTab === index + 1
                                    ? "text-logobarElementBG"
                                    : "text-mutedText")
                            }
                            onClick={e => {
                                e.preventDefault();
                                setOpenTab(index + 1);
                                setHamburgerOpen && setHamburgerOpen(!hamburgerOpen)
                            }}
                            data-toggle="tab"
                            // href="#link1"
                            href={`#link${index + 1}`}
                            role="tablist"
                        >
                            {props[item]}
                        </a>
                    </li>
                ))
            }
            {/* <li className="-mb-px mr-2 last:mr-0 text-center">
                <a
                    className={
                        "text-sm font-medium font-Poppins px-3 py-3 block leading-normal " +
                        (openTab === 1
                            ? "text-logobarElementBG"
                            : "text-mutedText")
                    }
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(1);
                        setHamburgerOpen && setHamburgerOpen(!hamburgerOpen)
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                >
                    {firstTab}
                </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                    className={
                        "text-sm font-medium font-Poppins px-3 py-3 block leading-normal " +
                        (openTab === 2
                            ? "text-logobarElementBG"
                            : "text-mutedText")
                    }
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(2);
                        setHamburgerOpen && setHamburgerOpen(!hamburgerOpen)
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                >
                    {secondTab}
                </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                    className={
                        "text-sm font-medium font-Poppins px-3 py-3 block leading-normal " +
                        (openTab === 3
                            ? "text-logobarElementBG"
                            : "text-mutedText")
                    }
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(3);
                        setHamburgerOpen && setHamburgerOpen(!hamburgerOpen)
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                >
                    {thirdTab}
                </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                    className={
                        "text-sm font-medium font-Poppins px-3 py-3 block leading-normal " +
                        (openTab === 4
                            ? "text-logobarElementBG"
                            : "text-mutedText")
                    }
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(4);
                        setHamburgerOpen && setHamburgerOpen(!hamburgerOpen)
                    }}
                    data-toggle="tab"
                    href="#link4"
                    role="tablist"
                >
                    {fourthTab}
                </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                    className={
                        "text-sm font-medium font-Poppins px-3 py-3 block leading-normal " +
                        (openTab === 5
                            ? "text-logobarElementBG"
                            : "text-mutedText")
                    }
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(5);
                        setHamburgerOpen && setHamburgerOpen(!hamburgerOpen)
                    }}
                    data-toggle="tab"
                    href="#link5"
                    role="tablist"
                >
                    {fifthTab}
                </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                    className={
                        "text-sm font-medium font-Poppins px-3 py-3 block leading-normal " +
                        (openTab === 6
                            ? "text-logobarElementBG"
                            : "text-mutedText")
                    }
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(6);
                        setHamburgerOpen && setHamburgerOpen(!hamburgerOpen)
                    }}
                    data-toggle="tab"
                    href="#link6"
                    role="tablist"
                >
                    {sixthTab}
                </a>
            </li> */}
        </>
    )
}

export default TabsContent
