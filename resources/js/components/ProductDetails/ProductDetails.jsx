import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Carousels from "../Carousels/Carousels";
import Details from "../ProductDetails/Details/Details";
import Rating from "../Rating/Rating";
import axios from "axios";
import Pagination from "react-js-pagination";
import "./ProductDetails.css";

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: JSON.parse(sessionStorage.getItem("objCustomer")),
            product_id: this.props.match.params.id,
            canRating: false,
            ratings: [],
            ratingMessage: null,
        };
        this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
    }
    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/get-rating-list", {
                params: {
                    data: {
                        product_id: this.state.product_id,
                        customer_id: this.state.currentUser?.customer_id || "",
                    },
                },
            })
            .then((res) =>
                this.setState({
                    ratings: res.data.ratings,
                    canRating: res.data.canRating,
                })
            );
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.ratingMessage != prevState.ratingMessage) {
            console.log("did update");
            axios
            .get("http://127.0.0.1:8000/api/get-rating-list", {
                params: {
                    data: {
                        product_id: this.state.product_id,
                        customer_id: this.state.currentUser?.customer_id || "",
                    },
                },
            })
            .then((res) =>
                this.setState({
                    ratings: res.data.ratings,
                    canRating: res.data.canRating,
                })
            );
        }
    }
    handleRatingSubmit(rating, comment) {
        const { currentUser, product_id } = this.state;
        let confirmPop = confirm(
            `Bạn muốn gửi đánh giá ${rating} sao cho sản phẩm này ?`
        );
        if (confirmPop === true) {
            axios
                .post("http://127.0.0.1:8000/api/rating", null, {
                    params: {
                        rating,
                        comment,
                        customer_id: currentUser?.customer_id,
                        product_id: product_id,
                    },
                })
                .then((res) => {
                    this.setState({
                        ratingMessage: res.data,
                    });
                });
        }
    }

    render() {
        const { currentUser, product_id, canRating, ratings, ratingMessage } =
            this.state;
        return (
            <div style={{ overflow: "hidden", width: "100vw" }}>
                <Navigation propsParent={this.props} />
                {/* <Carousels /> */}
                {/* <Details id={this.state.product_id} slug={this.state.product_slug} /> */}
                <div className="form-group">
                    <div className="container">
                        <Details id={product_id} />
                        {ratingMessage?.status ? (
                            <div>{ratingMessage?.message}</div>
                        ) : null}
                        {canRating ? (
                            <Rating
                                handleRatingSubmit={this.handleRatingSubmit}
                                ratings={ratings}
                                currentUser={currentUser}
                                productId={product_id}
                            />
                        ) : null}
                        <div className="ratings__list">
                            <div className="ratings__list__inner">
                                {ratings?.data?.map((rating) => {
                                    return (
                                        <div className="row align-items-center rating">
                                            <div className="rating__img">
                                                <img src="http://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-1.png" />
                                            </div>
                                            <div className="rating__content">
                                                <div className="rating__content-header">
                                                    <span className="name">
                                                        {rating.customer_name}
                                                    </span>
                                                    <span> đã đánh giá </span>
                                                    <span className="rating">
                                                        {rating.rating} sao
                                                    </span>
                                                </div>
                                                <div className="rating__content-comment">
                                                    {rating.comment}
                                                </div>
                                                <p className="rating__content-date">
                                                    {rating.created_at}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-5 form-group">
                                <div className="rating-pagination">
                                    <Pagination
                                        activePage={ratings?.current_page}
                                        totalItemsCount={ratings?.total}
                                        itemsCountPerPage={ratings?.per_page}
                                        onChange={this.props.handleChange}
                                        hideDisabled={true}
                                        hideFirstLastPages={true}
                                        itemClass="rating-page-item"
                                        linkClass="rating-page-link"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ProductDetails;
