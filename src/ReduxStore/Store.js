import { configureStore } from "@reduxjs/toolkit"

import testingCartReducer from "./CartSystem/CartStore"
import userInfoReducer from "./LogInFolder/UserInfo"
import checkOutReducer from "./CheckOutSystem/CheckOutStore"
import wishListReducer from "./WishListSystem/WishListStore"
import filterReducer from "./FilteringSystem/FilterStore"
import brandFilterReducer from "./BrandFilteringSystem/BrandFilterStore"
import storeFilterReducer from "./StoreFilteringSystem/StoreFilter"


export default configureStore({
    reducer: {
        testCart: testingCartReducer,
        authInfo: userInfoReducer,
        checkOutData: checkOutReducer,
        wishList: wishListReducer,
        filter: filterReducer,
        brandFilter: brandFilterReducer,
        storeFilter: storeFilterReducer,
    }
})