import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./Account/Login";
//import Register from "./Account/Register";
import Error from "./components/Error/Error";

import ShowCategories from "./components/Content/ShowCategories";
import AddCategory from "./components/Content/AddCategory";
import EditCategories from "./components/Content/EditCategories";

import ShowBrand from "./components/Content/ShowBrand";
import AddBrand from "./components/Content/AddBrand";
import EditBrand from "./components/Content/EditBrand";

import ShowSupplier from "./components/Content/ShowSupplier";
import AddSupplier from "./components/Content/AddSupplier";
import EditSupplier from "./components/Content/EditSupplier";

import ShowSlide from "./components/Content/ShowSlide";
import AddSlide from "./components/Content/AddSlide";
import EditSlide from "./components/Content/EditSlide";

import ShowProduct from "./components/Content/ShowProduct";
import AddProduct from "./components/Content/AddProduct";
import EditProduct from "./components/Content/EditProduct";

import ShowProductType from "./components/Content/ShowProductType";
import AddProductType from "./components/Content/AddProductType";
import EditProductType from "./components/Content/EditProductType";

import ShowColor from "./components/Content/ShowColor";
import AddColor from "./components/Content/AddColor";
import EditColor from "./components/Content/EditColor";

import ShowColorDetails from "./components/Content/ShowColorDetails";
import AddColorDetails from "./components/Content/AddColorDetails";
import EditColorDetails from "./components/Content/EditColorDetails";

import ShowSizeDetails from "./components/Content/ShowSizeDetails";
import AddSizeDetails from "./components/Content/AddSizeDetails";
import EditSizeDetails from "./components/Content/EditSizeDetails";

import ShowReceipt from "./components/Content/ShowReceipt";
import AddReceipt from "./components/Content/AddReceipt";
import EditReceipt from "./components/Content/EditReceipt";

import ShowReceiptDetails from "./components/Content/ShowReceiptDetails";
import AddReceiptDetails from "./components/Content/AddReceiptDetails";
import EditReceiptDetails from "./components/Content/EditReceiptDetails";

import ShowAdmin from "./components/Content/ShowAdmin";
import AddAdmin from "./components/Content/AddAdmin";
import EditAdmin from "./components/Content/EditAdmin";

import ShowTblOrder from "./components/Content/ShowTblOrder";
import ShowTblOrderPDF from './components/Content/ShowTblOrderPDF';
import RatingManagement from "./components/Content/RatingManagement";


class RouteUrl extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/admin/" component={Login} />
                {/* <Route exact path="/admin/register" component={Register} /> */}
                <Route exact path="/admin/home" component={Home} />
                <Route exact path="/admin/err" component={Error} />

                <Route exact path="/admin/home/categories" component={ShowCategories} />
                <Route exact path="/admin/home/add-categories" component={AddCategory} />
                <Route exact path="/admin/home/edit-categories/:id" component={EditCategories} />

                <Route exact path="/admin/home/brand" component={ShowBrand} />
                <Route exact path="/admin/home/add-brand" component={AddBrand} />
                <Route exact path="/admin/home/edit-brand/:slug" component={EditBrand} />

                <Route exact path="/admin/home/supplier" component={ShowSupplier} />
                <Route exact path="/admin/home/add-supplier" component={AddSupplier} />
                <Route exact path="/admin/home/edit-supplier/:id" component={EditSupplier} />

                <Route exact path="/admin/home/slide" component={ShowSlide} />
                <Route exact path="/admin/home/add-slide" component={AddSlide} />
                <Route exact path="/admin/home/edit-slide/:id" component={EditSlide} />

                <Route exact path="/admin/home/product" component={ShowProduct} />
                <Route exact path="/admin/home/add-product" component={AddProduct} />
                <Route exact path="/admin/home/edit-product/:id" component={EditProduct} />

                <Route exact path="/admin/home/product-type" component={ShowProductType} />
                <Route exact path="/admin/home/add-product-type" component={AddProductType} />
                <Route exact path="/admin/home/edit-product-type/:id" component={EditProductType} />

                <Route exact path="/admin/home/color" component={ShowColor} />
                <Route exact path="/admin/home/add-color" component={AddColor} />
                <Route exact path="/admin/home/edit-color/:id" component={EditColor} />
                
                <Route exact path="/admin/home/color-details" component={ShowColorDetails} />
                <Route exact path="/admin/home/add-color-details" component={AddColorDetails} />
                <Route exact path="/admin/home/edit-color-details/:id" component={EditColorDetails} />

                <Route exact path="/admin/home/size-details" component={ShowSizeDetails} />
                <Route exact path="/admin/home/add-size-details" component={AddSizeDetails} />
                <Route exact path="/admin/home/edit-size-details/:id" component={EditSizeDetails} />

                <Route exact path="/admin/home/receipt" component={ShowReceipt} />
                <Route exact path="/admin/home/add-receipt" component={AddReceipt} />
                <Route exact path="/admin/home/edit-receipt/:id" component={EditReceipt} />

                <Route exact path="/admin/home/receipt-details" component={ShowReceiptDetails} />
                <Route exact path="/admin/home/add-receipt-details" component={AddReceiptDetails} />
                <Route exact path="/admin/home/edit-receipt-details/:id" component={EditReceiptDetails} />

                <Route exact path="/admin/home/admin" component={ShowAdmin} />
                <Route exact path="/admin/home/add-admin" component={AddAdmin} />
                <Route exact path="/admin/home/edit-admin/:id" component={EditAdmin} />

                <Route exact path="/admin/home/tbl-order" component={ShowTblOrder} />
                <Route exact path="/admin/home/tbl-order-pdf/:id" component={ShowTblOrderPDF} />

                <Route path="/admin/rating" component={RatingManagement}/>
            </Router>
        );
    }
}

export default RouteUrl;
