import React from 'react'
import RecentlySold from './RecentlySold'
import TopRated from './TopRated'
import NewArrivals from './NewArrivals'
import axios from 'axios'

const ThreeCarouseMain = (props) => {
    const { slug, type } = props;

    // console.log('Slug of ', type);

    const [recentlyProduct, setRecentlyProduct] = React.useState([]);
    const [newProduct, setNewProduct] = React.useState([]);
    const [topProduct, setTopProduct] = React.useState([]);

    const recentlySold = () => {
        axios.get(`/products/recently?slug=${slug}&type=${type}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            setRecentlyProduct(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const newArrival = () => {
        axios.get(`/products/new?slug=${slug}&type=${type}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            // console.log(response.data);
            setNewProduct(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const topRated = () => {
        axios.get(`/products/toprated?slug=${slug}&type=${type}`, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            // console.log(response.data);
            setTopProduct(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    React.useEffect(() => {
        recentlySold();
        newArrival();
        topRated();
    }, [slug])

    return (
        <div className="container mx-auto px-4">
            <div className="md:pr-7 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
                <RecentlySold products={recentlyProduct} />
                <TopRated products={topProduct} />
                <NewArrivals products={newProduct} />
            </div>
        </div>
    )
}

export default ThreeCarouseMain
