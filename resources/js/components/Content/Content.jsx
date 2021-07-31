import React from "react";
import Products from "../Products/Products";
import "./Content.css";
import axios from "axios";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import {
    CustomInput,
    Form,
    FormGroup,
    Label,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
} from "reactstrap";
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.search = React.createRef();
        this.state = {
            products: [],
            size: [],
            sizeSearch: [],
            sort: "",
            categories: [],
            activePage: 1,
            totalItemsCount: 1,
            searchData: {
                type: "",
                minPrice: "",
                maxPrice: "",
                keyword: "",
                orderBy: "",
                size: [],
                orderBy: "",
                brand: "",
            },
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.sortProduct = this.sortProduct.bind(this);
        this.showSizeId = this.showSizeId.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.sortPriceProduct = this.sortPriceProduct.bind(this);
        this.filterByCategory = this.filterByCategory.bind(this);
    }
    handlePageChange(pageNumber) {
        this.getProducts(pageNumber);
    }
    componentDidMount() {
        this.getProducts();
        axios.get("http://127.0.0.1:8000/api/categories").then((res) => {
            this.setState({ categories: res.data });
        });
        axios.get("http://127.0.0.1:8000/api/size").then((res) => {
            this.setState({
                size: res.data,
                //  size2:res.data
            });
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchData != this.state.searchData) {
            this.getProducts();
        }
    }
    getProducts(pageNumber = 1, searchData = this.state.searchData) {
        axios
            .get(
                "http://127.0.0.1:8000/api/product-customer?page=" + pageNumber,
                {
                    params: {
                        searchData: searchData,
                    },
                }
            )
            .then((res) => {
                this.setState({
                    products: res.data,
                    totalItemsCount: res.data.total,
                });
            });
    }
    showSizeId(e) {
        console.log(e.target.value);
        let temp = this.state.sizeSearch; //[...this.state.sizeSearch];
        let n = e.target.checked; //this.refs.complete.state.checked;
        //let n= this.refs.complete.state.checked
        if (n === true) {
            temp.push(e.target.value);
        } else {
            let i = temp.indexOf(e.target.value);
            if (i > -1) {
                temp.splice(i, 1);
            }
        }
        this.setState({
            searchData: {
                ...this.state.searchData,
                size: temp,
            },
        });
    }
    sortProduct(e) {
        const orderBy = e.target.value;
        this.setState({
            searchData: {
                ...this.state.searchData,
                orderBy: orderBy,
            },
        });
    }
    sortPriceProduct(e) {
        // const sort=e.target.value;
        const minPrice = e.target.dataset?.min || null;
        const maxPrice = e.target.dataset?.max || null;
        console.log(minPrice, maxPrice);

        this.setState({
            searchData: {
                ...this.state.searchData,
                minPrice: minPrice,
                maxPrice: maxPrice,
            },
        });
    }
    sizeProduct(e) {
        if (e.target.value === "") {
            this.setState({ size: e.target.value, product: [] });
        } else {
            this.setState({
                size: e.target.value,
                product: [].filter(
                    (product) =>
                        product.availableSizes.indexOf(e.target.value) >= 0
                ),
            });
        }
    }
    filterByCategory(id) {
        this.setState({
            searchData: {
                ...this.state.searchData,
                type: id,
            },
        });
    }
    filterByBrand(id) {
        this.setState({
            searchData: {
                ...this.state.searchData,
                brand: id,
            },
        });
    }
    handleSearch(e) {
        e.preventDefault();
        var keyword = this.search.current.value;

        this.setState({
            searchData: {
                ...this.state.searchData,
                keyword: keyword,
            },
        });
    }
    render() {
        const { products } = this.state;
        const { brand } = this.props.propsParent;
        return (
            <div className="form-group product__container">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-3">
                            {/* search */}
                            <div className="col-sm-12 col-md-12 search_form">
                                <Label
                                    for="exampleSelect"
                                    style={{
                                        fontWeight: "bold",
                                        color: "black",
                                    }}
                                >
                                    Tìm kiếm
                                </Label>
                                <InputGroup>
                                    <input
                                        ref={this.search}
                                        placeholder="Tên sản phẩm..."
                                        type="text"
                                        className="form-control"
                                    ></input>
                                    <InputGroupAddon addonType="append">
                                        <Button
                                            onClick={this.handleSearch}
                                            color="secondary"
                                        >
                                            Tìm
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>

                            {/* order */}
                            <div className="col-md-12 order">
                                <FormGroup>
                                    <Label
                                        for="exampleSelect"
                                        style={{
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        Sắp xếp
                                    </Label>
                                    <div>
                                        <Input
                                            type="select"
                                            value={
                                                this.state.searchData.orderBy
                                            }
                                            onChange={this.sortProduct}
                                        >
                                            <option value="default">
                                                Mặc định
                                            </option>
                                            <option value="minPrice">
                                                Giá thấp nhất
                                            </option>
                                            <option value="maxPrice">
                                                Giá cao nhất
                                            </option>
                                        </Input>
                                    </div>
                                </FormGroup>
                            </div>

                            <div className="col-md-12 size_filter">
                                <FormGroup>
                                    <Label
                                        for="exampleCheckbox"
                                        style={{
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        Kích Cỡ
                                    </Label>
                                    <div>
                                        {/* {this.showSize()} */}
                                        {this.state.size.map((item, index) => (
                                            <CustomInput
                                                value={item.size_id}
                                                key={index}
                                                type="checkbox"
                                                id={item.size_id}
                                                label={item.size_name}
                                                onChange={this.showSizeId}
                                                inline
                                            />
                                        ))}
                                    </div>
                                </FormGroup>
                            </div>

                            {/* filter by price */}
                            <div className="col-md-12 price_filter">
                                <FormGroup>
                                    <Label
                                        for="exampleCheckbox"
                                        style={{
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        Giá
                                    </Label>
                                    <div>
                                        <CustomInput
                                            type="radio"
                                            id="exampleCustomRadio"
                                            name="customRadio"
                                            label="Tất cả"
                                            value={this.state.sort}
                                            onChange={this.sortPriceProduct}
                                            inline
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="exampleCustomRadio2"
                                            name="customRadio"
                                            label="150,000- 250,000 VND"
                                            data-min={150000}
                                            data-max={250000}
                                            value={this.state.sort}
                                            onChange={this.sortPriceProduct}
                                            inline
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="exampleCustomRadio3"
                                            name="customRadio"
                                            label="250,000- 350,000 VND"
                                            data-min={250000}
                                            data-max={350000}
                                            value={this.state.sort}
                                            onChange={this.sortPriceProduct}
                                            inline
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="exampleCustomRadio4"
                                            name="customRadio"
                                            label="> 350,000 VND"
                                            data-min={350001}
                                            value={this.state.sort}
                                            onChange={this.sortPriceProduct}
                                            inline
                                        />
                                    </div>
                                </FormGroup>
                            </div>
                            <div className="list-group">
                                <FormGroup>
                                    <Label
                                        style={{
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        Danh mục
                                    </Label>
                                    <div>
                                        <CustomInput
                                            key={0}
                                            type="radio"
                                            id={`category-defaults}`}
                                            name="category"
                                            label="Tất cả"
                                            onChange={() =>
                                                this.filterByCategory("")
                                            }
                                            inline
                                        />
                                        {this.state.categories.map(
                                            (item, index) => (
                                                <CustomInput
                                                    key={index}
                                                    type="radio"
                                                    id={`category${index}`}
                                                    name="category"
                                                    label={item.categories_name}
                                                    value={item.categories_name}
                                                    onChange={() =>
                                                        this.filterByCategory(
                                                            item.categories_id
                                                        )
                                                    }
                                                    inline
                                                />
                                            )
                                        )}
                                    </div>
                                </FormGroup>
                            </div>
                            <div className="list-group">
                                <FormGroup>
                                    <Label
                                        style={{
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        Thương hiệu
                                    </Label>
                                    <div>
                                        <CustomInput
                                            key={0}
                                            type="radio"
                                            id={`brand-default`}
                                            name="brand"
                                            label="Tất cả"
                                            onChange={() =>
                                                this.filterByBrand("")
                                            }
                                            inline
                                        />
                                        {brand.map((item, index) => (
                                            <CustomInput
                                                key={index}
                                                type="radio"
                                                id={`brand${index}`}
                                                name="brand"
                                                label={item.brand_name}
                                                onChange={() =>
                                                    this.filterByBrand(
                                                        item.brand_id
                                                    )
                                                }
                                                inline
                                            />
                                        ))}
                                    </div>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-9">
                            <div className="form-group product__list">
                                {products?.data?.length > 0 ? (
                                    <div className="row">
                                        {products?.data?.map((prd, index) => {
                                            const {
                                                product_id,
                                                product_name,
                                                promotion_price,
                                                unit_price,
                                                product_image,
                                                product_desc,
                                                product_slug,
                                                total
                                            } = prd;
                                            return (
                                                <div
                                                    key={index}
                                                    className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
                                                >
                                                    <Products
                                                        propsParent={
                                                            this.props
                                                                .propsParent
                                                        }
                                                        id={product_id}
                                                        name={product_name}
                                                        price={unit_price}
                                                        promotion_price={
                                                            promotion_price
                                                        }
                                                        image={product_image}
                                                        content={product_desc}
                                                        product_slug={
                                                            product_slug
                                                        }
                                                        total={total}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="row flex-column align-items-center empty">
                                        <div className="empty__img">
                                            <img
                                                src="/images/empty.svg"
                                                alt="empty"
                                            />
                                        </div>
                                        <p className="empty__text">No result</p>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        activePage={products?.current_page}
                                        totalItemsCount={
                                            this.state.totalItemsCount
                                        }
                                        itemsCountPerPage={products?.per_page}
                                        onChange={this.handlePageChange.bind(
                                            this
                                        )}
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
            </div>
        );
    }
}

export default Content;
