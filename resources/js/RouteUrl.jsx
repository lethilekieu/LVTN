import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Register from "./components/Account/Register";
import Home from "./components/Home/Home";
import New from "./components/New/New";
import Login from "./components/Account/Login";
import Categories from "./components/Categories/Categories";
import Header from "./components/Header/Header";
import ShowProductBrand from "./components/ShowProductBrand/ShowProductBrand";
import ShowProductType from "./components/ShowProductType/ShowProductType";
// import ProductCategories from "./components/ProductCategories/ProductCategories";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import EditCustomer from "./components/Account/EditCustomer";
import Recruitment from "./components/Recruitment/Recruitment";
import Introduce from "./components/Introduce/Introduce";
import Order from "./components/Order/Order";
import InfoOrder from "./components/Order/InfoOrder";
import HistoryOrder from "./components/Order/HistoryOrder";
import Cart from './components/Cart/Cart';

class RouteUrl extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/product_details/:id/:slug" component={ProductDetails} />
                    <Route exact path="/products-new" component={New} />
                    <Route exact path="/categories/:id" component={Categories} />
                    <Route exact path="/edit-customer/:id" component={EditCustomer} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/search" component={Header} />
                    <Route exact path="/brand/:id" component={ShowProductBrand} />
                    <Route exact path="/product-type/:id" component={ShowProductType} />
                    {/* <Route exact path="/categories/:id" component={ProductCategories} /> */}
                    <Route exact path="/tuyen-dung" component={Recruitment} />
                    <Route exact path="/gioi-thieu-kvstore" component={Introduce} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/thanh-toan" component={Order} />
                    <Route exact path="/order-tracking/:id" component={InfoOrder} />
                    <Route exact path="/history-order/:id" component={HistoryOrder} />
                </div>
            </Router>
        );
    }
}

export default RouteUrl;
