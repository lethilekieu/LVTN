import axios from "axios";
import React from "react";
import Pagination from "react-js-pagination";
import { Table } from "reactstrap";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RatingManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingsList: [],
            message: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/admin/rating")
            .then((res) => this.setState({ ratingsList: res.data }))
            .catch((res) => console.log(res));
    }
    handleChange(page) {
        axios
            .get("http://127.0.0.1:8000/api/admin/rating?page=" + page)
            .then((res) => this.setState({ ratingsList: res.data }))
            .catch((res) => console.log(res));
    }
    changeRatingStatus(e, id) {
        let status = e.target.value;

        axios
            .post(
                "http://127.0.0.1:8000/api/admin/change-rating-status",
                null,
                {
                    params: {
                        id,
                        status,
                    },
                }
            )
            .then((res) => toast.success(res.data.message))
            .catch((res) => toast.error(res.data.message));
    }
    deleteRating(id) {
        let r = confirm(`Bạn muốn xoá đánh giá có id: ${id} ?`);
        if (r) {
            axios
                .post("http://127.0.0.1:8000/api/admin/delete-rating", null, {
                    params: {
                        id,
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        const temp = this.state.ratingsList?.data;

                        var pos = temp.map((x) => x.id).indexOf(id);

                        temp.splice(pos, 1);
                        toast.success(res.data.message)
                        this.setState({
                            ratingsList: {
                                ...this.state.ratingsList,
                                data: temp,
                            },
                        });
                    }
                    this.setState({ message: res.data });
                })
                .catch((res) =>  toast.error(res.data.message));
        }
    }
    render() {
        const { ratingsList, message } = this.state;
        return (
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent={this.props} />
                            <ToastContainer/>
                            <div
                                className="container-fluid"
                                style={{ marginTop: "30px" }}
                            >
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Customer Name</th>
                                            <th>Sản phẩm</th>
                                            <th>Rating</th>
                                            <th>Comment</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ratingsList?.data?.map(
                                            (rating, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index}</th>
                                                    <td>
                                                        @{rating?.customer_name}
                                                    </td>
                                                    <td>
                                                        {rating?.product_name}
                                                    </td>
                                                    <td>{rating?.rating}</td>
                                                    <td>{rating?.comment}</td>
                                                    <td>
                                                        <select
                                                            style={{
                                                                border: "1px solid #e3e6f0",
                                                                fontSize:
                                                                    "14px",
                                                                borderRadius:
                                                                    "5px",
                                                            }}
                                                            onChange={(e) =>
                                                                this.changeRatingStatus(
                                                                    e,
                                                                    rating?.id
                                                                )
                                                            }
                                                            className="form-select"
                                                            aria-label="Default select example"
                                                            defaultValue={
                                                                rating?.status
                                                            }
                                                        >
                                                            <option value="1">
                                                                Active
                                                            </option>
                                                            <option value="0">
                                                                Spam
                                                            </option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <div
                                                            className="btn btn-danger"
                                                            style={{
                                                                padding:
                                                                    "2px 10px 0px",
                                                                fontSize:
                                                                    "13px",
                                                            }}
                                                            onClick={(e) =>
                                                                this.deleteRating(
                                                                    rating?.id
                                                                )
                                                            }
                                                        >
                                                            Xoá
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </Table>
                                <Pagination
                                    activePage={ratingsList?.current_page}
                                    totalItemsCount={ratingsList?.total}
                                    onChange={(page) => this.handleChange(page)}
                                    hideDisabled={true}
                                    hideFirstLastPages={true}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default RatingManagement;
