import React from "react";
import "./StarComponent.css";

const StarComponent = ({ ratingValue, handleChange }) => {
    return (
        <fieldset className="rate">
            <input
                type="radio"
                id="rating0"
                name="rating"
                value="0"
                onChange={() => handleChange(0)}
            />
            <label
                htmlFor="rating0"
                className={`no-star ${ratingValue === 0 ? "active" : ""}`}
                title="No star"
            ></label>
            {[...Array(10)].map((it, index) => {
                let rating = (index + 1) / 2;
                return (
                    <React.Fragment key={index}>
                        <input
                            type="radio"
                            id={`rating${rating}`}
                            name="rating"
                            value={rating}
                            onChange={() => handleChange(rating)}
                        />
                        <label
                            className={`${index % 2 ? "" : "half"} ${
                                rating <= ratingValue ? "active" : ""
                            }`}
                            htmlFor={`rating${rating}`}
                            title={`${rating} stars`}
                        ></label>
                    </React.Fragment>
                );
            })}
            <p className="rating__results">
                Rating: {ratingValue} star
                {ratingValue > 3 ? "s" : ""}
            </p>
        </fieldset>
    );
};
export default StarComponent;
