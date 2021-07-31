import axios from "axios";
import React from "react";
import { Col, FormGroup, Input, Button } from "reactstrap";
import "./Rating.css";
import StarComponent from "./StarComponent";
const data = ["fas fa-star-half", "fas fa-star-half half-star-flip"];

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            hover: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.commentRef = React.createRef();
    }
    handleChange(rating) {
        this.setState({
            rating: rating,
        });
        console.log(rating);
    }
    handleHover(value) {
        this.setState({
            hover: value,
        });
    }
    handleSubmit() {
        let comment = this.commentRef.current.value;
        let rating = this.state.rating;
        this.props.handleRatingSubmit(rating, comment);
    }
    render() {
        const { ratingMessage } = this.state;
        return (
            <div className="rating container">
                <div className="row flex-column align-items-center rating__inner">
                    <StarComponent
                        ratingValue={this.state.rating}
                        handleChange={this.handleChange}
                    />
                    <div className="rating__comment">
                        <div className="row form-group">
                            <div className="col-lg-12">
                                <textarea
                                    ref={this.commentRef}
                                    className="form-control"
                                    name="comment"
                                    rows="2"
                                ></textarea>
                            </div>
                        </div>
                        <button
                            style={{
                                fontSize: "14px",
                                padding: "0 10px",
                            }}
                            className="btn btn-secondary"
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Rating;
