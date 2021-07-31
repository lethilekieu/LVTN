import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
import Cart from "./components/Cart/Cart";

class RouteUrl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: [],
        };
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/brand").then((res) => {
            this.setState({ brand: res.data });
        });
    }
    render() {
        const currentUser = JSON.parse(sessionStorage.getItem("objCustomer"));
        const {brand} = this.state;
        console.log(currentUser);
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={() => <Home brand={brand} />} />
                    <Route
                        path="/product-detail/:id?/:slug?"
                        component={ProductDetails}
                    />
                    <Route path="/products-new" component={New} />
                    <Route path="/categories/:id" component={Categories} />
                    <Route path="/edit-customer/:id" component={EditCustomer} />
                    <Route path="/register" component={Register} />
                    <Route
                        exact
                        path="/login"
                        render={() =>
                            currentUser ? <Redirect to="/" /> : <Login />
                        }
                    />
                    <Route path="/search" component={Header} />
                    <Route path="/brand/:id" component={ShowProductBrand} />
                    <Route
                        path="/product-type/:id"
                        component={ShowProductType}
                    />
                    {/* <Route exact path="/categories/:id" component={ProductCategories} /> */}
                    <Route path="/tuyen-dung" component={Recruitment} />
                    <Route path="/gioi-thieu-kvstore" component={Introduce} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/thanh-toan" component={Order} />
                    <Route path="/order-tracking/:id" component={InfoOrder} />
                    <Route path="/history-order/:id" component={HistoryOrder} />
                </Switch>
            </div>
        );
    }
}

export default RouteUrl;
