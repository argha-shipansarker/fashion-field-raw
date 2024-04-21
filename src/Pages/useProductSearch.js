import { useEffect, useState } from "react";
import axios from "axios";

function useProductSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setProducts([]);
    }, [query]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: "GET",
            url: "manage-search",
            terms: {
                q: query,
                page: pageNumber,
            },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                // setProducts((prevProducts) => {
                //     return [
                //         ...new Set([
                //             ...setProducts,
                //             ...res.data.data.map((b) => b.title),
                //         ]),
                //     ];
                // });
                setHasMore(res.data.data.length > 0);
                setLoading(false);
                console.log(res.data);
            })
            .catch((e) => {
                if (axios.isCancel(e)) return;
                setError(true);
            });
        return () => cancel();
    }, [query, pageNumber]);
    return { loading, error, products, hasMore };
}

export default useProductSearch;
