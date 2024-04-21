import MessengerCustomerChat from "react-messenger-customer-chat";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    withRouter,
} from "react-router-dom";
import LazyLoad from "react-lazyload";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopBar from "./Components/PageComponents/HomePage/TopBar";
import LogoBar from "./Components/PageComponents/HomePage/LogoBar";
import Menubar from "./PageLayout/Menubar/Menubar";
import HomePage from "./Pages/HomePage";
import Footer from "./PageLayout/Footer";
import CopyRight from "./PageLayout/CopyRight";
import BackToTop from "./PageLayout/BackToTop";
import TopBrands from "./Components/PageComponents/HomePage/TopBrands";
import NewsLetter from "./Components/PageComponents/HomePage/NewsLetter";

import MenCategoryPage from "./Pages/MenCategoryPage";
import MenFootwearPage from "./Pages/MenFootwearPage";
import RunningShoePage from "./Pages/RunningShoePage";
import IndividualProduct from "./Pages/IndividualProduct";

import CartButton from "./PageLayout/CartButton";
import CartSideBar from "./PageLayout/CartSideBar";

import UserAccount from "./Pages/UserAccount";

import CheckoutPage from "./PageLayout/CheckoutPage";

import OrderConfirmationPage from "./Pages/OrderConfirmationPage";

import OrderTrackingSearch from "./Components/PageComponents/UserAccount/OrderTrackingSearch";
import OrderTrackingResult from "./Components/PageComponents/UserAccount/OrderTrackingResult";

import InvoicePage from "./Components/PageComponents/CheckoutPage/InvoicePage";
import InvoicePageWithPrintButton from "./Components/PageComponents/CheckoutPage/InvoicePageWithPrintButton";

import ContactUsPage from "./Pages/ContactUsPage";

import axios from "axios";

import {
    addingCartValueFromLocalStorage,
    calculatingTotalPrice,
    calculatingTotalCartProducts,
} from "./ReduxStore/CartSystem/CartStore";
import {
    addingProductInWishListArray,
    settingNumberOfWishListItems,
} from "./ReduxStore/WishListSystem/WishListStore";
import BrandProducts from "./Pages/BrandProducts";
import StoreProducts from "./Pages/StoreProducts";

import FAQ from "./Pages/FAQ.js";
import ContentPages from "./Pages/ContentPages";

import ManualRegisterPage from "./Components/PageComponents/SignSignUpModal/ManualRegisterPage";
import LogInWithUserName from "./Components/PageComponents/SignSignUpModal/LogInWithUserName";
import EmailCodeVerification from "./Components/PageComponents/SignSignUpModal/EmailCodeVerification";
import ForgotPasswordModal from "./Components/PageComponents/SignSignUpModal/ForgotPasswordModal";
import ForgotPasswordCodeVerification from "./Components/PageComponents/SignSignUpModal/ForgotPasswordCodeVerification";
import UpdatePasswordModal from "./Components/PageComponents/SignSignUpModal/UpdatePasswordModal";

import SellerRegistration from "./Pages/SellerRegistration";

import RefundPage from "./Components/PageComponents/UserAccount/RefundPage";

import SearchResult from "./Pages/SearchResult";

import CartMobileView from "./PageLayout/CartMobileView";

import AddedToCartNotification from "./PageLayout/AddedToCartNotification";

import CampaignPage from "./Pages/CampaignPage";

const cartValueFromLocalStorage = JSON.parse(
    localStorage.getItem("cart") || "[]"
);

// axios.defaults.baseURL = "http://fashionfield.test/api"
// axios.defaults.baseURL = "http://fashion-field.test/api"
// axios.defaults.baseURL = "https://live.fashionfield.viserx.net/api"
// axios.defaults.baseURL = "https://api.fashionfield-primary.viserx.net/api"
// axios.defaults.baseURL = "https://api.fashionfield.com.bd/api"
axios.defaults.baseURL = `${process.env.REACT_APP_FRONTENDURL}`;

toast.configure();

function App() {
    // const { pathname } = useLocation()
    // console.log(pathname)
    // console.log(window.location.href)
    const [cartSidebar, setCartSideBar] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addingCartValueFromLocalStorage(cartValueFromLocalStorage));
        dispatch(calculatingTotalPrice());
        dispatch(calculatingTotalCartProducts());
    }, []);

    const { token } = useSelector((state) => state.authInfo);

    const [appearances, setAppearances] = useState([]);
    const [menus, setmenus] = useState([]);

    useEffect(() => {
        if (token != null) {
            axios
                .get("/customer/wishlists", {
                    headers: {
                        Authorization: "Bearer " + token,
                        Accept: "application/json",
                    },
                })
                .then((response) => {
                    // console.log(response)
                    dispatch(addingProductInWishListArray(response.data));
                    dispatch(
                        settingNumberOfWishListItems(response.data.length)
                    );
                })
                .catch((errors) => {
                    // console.log(errors.response)
                });
        }
    }, [token]);

    useEffect(() => {
        axios
            .get("appearanceLink")
            .then((res) => {
                console.log("🔥", res.data);
                setAppearances(res.data.appearances);
                setmenus(res.data.menus);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <Router>
            <div className="hidden md:block">
                <TopBar appearances={appearances} />
            </div>
            <LogoBar />
            <Menubar />
            <MessengerCustomerChat
                pageId="101656445019590"
                appId="4605904852842375"
            />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route
                    path="/main-category/:slug"
                    exact
                    component={MenCategoryPage}
                />
                <Route
                    path="/sub-category/:sub_category"
                    exact
                    component={MenFootwearPage}
                />
                <Route
                    path="/category/:slug"
                    exact
                    component={RunningShoePage}
                />
                {/* <Route path="/product/:slug" exact component={IndividualProduct} /> */}
                <Route path="/product/:slug" exact>
                    {" "}
                    <IndividualProduct appearances={appearances} />
                </Route>
                <Route path="/brand/:slug" exact component={BrandProducts} />
                <Route path="/store/:slug" exact component={StoreProducts} />
                <Route path="/customer/:slug" exact component={UserAccount} />
                <Route path="/checkout" exact component={CheckoutPage} />
                <Route
                    path="/order/:slug"
                    exact
                    component={OrderConfirmationPage}
                />
                <Route
                    path="/order/invoice/:slug"
                    exact
                    component={InvoicePage}
                />
                <Route
                    path="/order/invoice/print/:slug"
                    exact
                    component={InvoicePageWithPrintButton}
                />
                <Route
                    path="/order/tracking/order-search"
                    exact
                    component={OrderTrackingSearch}
                />
                <Route
                    path="/order/tracking/:slug"
                    exact
                    component={OrderTrackingResult}
                />
                <Route path="/contact-us" exact component={ContactUsPage} />
                <Route
                    path="/frequently-asking-questions"
                    exact
                    component={FAQ}
                />
                <Route
                    path="/content-page/:slug"
                    exact
                    component={ContentPages}
                />
                <Route
                    path="/seller-registration"
                    exact
                    component={SellerRegistration}
                />
                <Route
                    path="/order-refund/:slug"
                    exact
                    component={RefundPage}
                />
                <Route path="/search" exact component={SearchResult} />
                <Route path="/cart" exact component={CartMobileView} />
                <Route
                    path="/campaign/:campaign_name"
                    exact
                    component={CampaignPage}
                />
            </Switch>
            {/* <TopBrands /> */}
            <NewsLetter />
            <Footer appearances={appearances} menus={menus} />
            <CopyRight />
            <BackToTop />
            <CartButton setCartSideBar={setCartSideBar} />
            <CartSideBar
                cartSidebar={cartSidebar}
                setCartSideBar={setCartSideBar}
            />
            <ManualRegisterPage />
            <LogInWithUserName />
            <EmailCodeVerification />
            <ForgotPasswordModal />
            <ForgotPasswordCodeVerification />
            <UpdatePasswordModal />
            <AddedToCartNotification />
        </Router>
    );
}

export default App;

// testing git
