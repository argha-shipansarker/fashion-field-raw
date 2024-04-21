import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlHelper } from "../../urlHelper";

import SidebarProductCategoryDynamic from "./SidebarProductCategoryDynamic";

import { GoChevronRight, GoChevronDown } from "react-icons/go";

const SidebarSubCategoryDynamic = (props) => {
    const { subCategory, setIsOpen } = props;

    const [modifiedSubCategory, setModifiedSubCategory] = useState([]);

    useEffect(() => {
        if (subCategory.length > 0) {
            setModifiedSubCategory([]);
            subCategory.map((value) => {
                setModifiedSubCategory((prevState) => [
                    ...prevState,
                    { ...value, open: false },
                ]);
            });
        }
    }, [subCategory]);

    const handleShowingSubCategory = (menu) => {
        let testData = [...modifiedSubCategory];
        let specficMenu = testData.findIndex((value) => value.id == menu.id);
        testData[specficMenu].open = !testData[specficMenu].open;
        setModifiedSubCategory(testData);
    };

    return (
        <div>
            {modifiedSubCategory.map((menu, index) => (
                <>
                    <div
                        className="flex mt-4 items-center justify-between"
                        key={index}
                    >
                        <Link
                            to={urlHelper(menu.slug, menu.type)}
                            onClick={() => setIsOpen(false)}
                        >
                            <p className="font-Poppins font-medium overflow-hidden whitespace-nowrap">
                                {menu.name}
                            </p>
                        </Link>
                        <div onClick={() => handleShowingSubCategory(menu)}>
                            {menu.open ? <GoChevronDown /> : <GoChevronRight />}
                        </div>
                    </div>
                    <div className={menu.open ? "block ml-4 mt-4" : "hidden"}>
                        <SidebarProductCategoryDynamic
                            productCategory={menu.sub_items}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                </>
            ))}
        </div>
    );
};

export default SidebarSubCategoryDynamic;
