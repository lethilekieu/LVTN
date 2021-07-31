import React from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import StarComponent from "../Rating/StarComponent";

class Products extends React.Component {
    constructor(props) {
        // console.log(props);
        super(props);

        this.onAddToCart = this.onAddToCart.bind(this);
        this.showPrice = this.showPrice.bind(this);
    }

    onAddToCart() {
        alert(this.props.name + "-" + this.props.price);
    }
    showPrice() {
        if (this.props.promotion_price !== 0) {
            return (
                <div className="form-group" className="inline-price">
                    <div className="form-check-inline">
                        <h6>
                            {/* prefix={'VND'}    */}
                            <CurrencyFormat
                                style={{
                                    textDecorationLine: "line-through",
                                    color: "red",
                                }}
                                value={this.props.price}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                            <del
                                style={{
                                    color: "red",
                                    CurrencyFormat: "thousand",
                                }}
                            >
                                {" "}
                                VND
                            </del>
                        </h6>
                    </div>
                    <div className="form-check-inline">
                        <h6 className="flash-sale">
                            <CurrencyFormat
                                style={{ color: "black" }}
                                value={this.props.promotion_price}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                            <ins
                                className="ega-text--no-underline"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                VND
                            </ins>
                        </h6>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="form-group" className="inline-price">
                    <div className="form-check-inline">
                        <h6>
                            <CurrencyFormat
                                style={{ color: "black" }}
                                value={this.props.price}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                            <ins
                                className="ega-text--no-underline"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                VND
                            </ins>
                        </h6>
                    </div>
                </div>
            );
        }
    }
    render() {
        const { total } = this.props;
        return (
            <div className="product">
                <span
                    onClick={() => {
                        this.props.propsParent.history.push(
                            "/product_details/" +
                                this.props.id +
                                "/" +
                                this.props.product_slug
                        );
                    }}
                >
                    <img
                        className="card-img-top"
                        src={this.props.image}
                        alt={this.props.name}
                        style={{ width: "280" }}
                        style={{ height: "300" }}
                    />
                </span>
                <div className="card-body">
                    <h4 className="card-title">
                        <Link
                            to={`product-detail/${
                                this.props.id + "/" + this.props.product_slug
                            }`}
                        >
                            {this.props.name}
                        </Link>
                    </h4>
                    {this.showPrice()}
                    <p className="card-text">Mô tả: {this.props.content}</p>
                </div>
                <div className="col-md-12">
                    <div className="rating">
                        {total > 0 ? <StarComponent
                            ratingValue={total}
                            handleChange={() => {}}
                        /> : <div className="rating__text">Không có đánh giá</div>}
                    </div>
                </div>
                <div className="col-md-12">
                    <Button
                        onClick={() => {
                            this.props.propsParent.history.push(
                                "/product-detail/" +
                                    this.props.id +
                                    "/" +
                                    this.props.product_slug
                            );
                        }}
                        color="info"
                        style={{ margin: "10px" }}
                    >
                        Xem chi tiết
                    </Button>
                    <span> </span>
                    <Button
                        className="btn btn-danger"
                        onClick={this.onAddToCart}
                    >
                        Mua hàng
                    </Button>
                </div>
            </div>
        );
    }
}

export default Products;
