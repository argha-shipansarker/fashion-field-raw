import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FilteredProducts from "../Components/PageComponents/RunningShoePage/FilteredProducts";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchResult = (props) => {
    const { token, searchingValue } = useSelector((state) => state.authInfo);
    // const { view } = props.location.state

    // for scrolling pagination
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [timer, setTimer] = useState(null);

    // end pagination

    const [searchValue, setSearchValue] = useState("");
    const [
        searchValueForShowingInInputField,
        setSearchValueForShowingInInputField,
    ] = useState("");

    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSearch = (newSearch = false) => {
        setLoading(false);
        clearTimeout(timer);
        setTimer(
            setTimeout(() => {
                callAxios(newSearch);
            }, 500)
        );
    };

    const callAxios = (newSearch) => {
        axios
            .get("manage-search", {
                // params: searchValue,
                params: {
                    terms: searchValue,
                    page: pageNumber,
                },
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                },
            })
            .then((response) => {
                if (!newSearch)
                    setSearchResult(searchResult.concat(response.data.data));
                else setSearchResult(response.data.data);
                setLoading(true);
            })
            .catch((errors) => {
                console.log(errors.response);
                setLoading(true);
            });
    };

    // useEffect(() => {
    //     if(pageNumber > 1)
    //     setPageNumber(searchValue);
    // }, [searchValue]);

    useEffect(() => {
        if (searchValue.length > 2) fetchSearch(true);
    }, [searchValue]);

    useEffect(() => {
        if (pageNumber > 1) fetchSearch();
    }, [pageNumber]);

    useEffect(() => {
        // if (searchingValue != "") {
        setSearchValue(searchingValue);
        // }
    }, [searchingValue]);

    return (
        <div className="container mx-auto px-4 mt-20 md:mt-0">
            <div className="flex mt-2 lg:hidden mb-4">
                <input
                    type="text"
                    placeholder="Type at least 3 alphabets"
                    autoFocus={true}
                    className="w-full px-7 border-2 focus:outline-none rounded-l border-r-0"
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setSearchValueForShowingInInputField(e.target.value);
                    }}
                    value={searchValueForShowingInInputField}
                />

                <button className="h-12 w-1/5 bg-logobarElementBG font-Poppins font-semibold text-white flex justify-center items-center rounded-r cursor-pointer">
                    <i className="fas fa-search"></i>
                </button>
            </div>

            <div className="md:mt-4">
                <InfiniteScroll
                    dataLength={searchResult.length}
                    next={() => setPageNumber(pageNumber + 1)}
                    hasMore={true}
                >
                    {
                        <FilteredProducts
                            products={searchResult}
                            loading={loading}
                        />
                    }
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default SearchResult;
