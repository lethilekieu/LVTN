import React from 'react';
    import axios from 'axios';
    import { Link } from 'react-router-dom';
    import Search from '../Search/Search';
    import Navigation from '../Navigation/Navigation';
    import Footer from '../Footer/Footer';
    import Carousels from '../Carousels/Carousels';
    import ProductNews from './ProductNews/ProductNews';
    import Pagination from "react-js-pagination";
    class New extends React.Component {
        
        constructor(){
            super();
            this.state={
                product:[],
                categories:[],
                activePage:1,
                itemsCountPerPage:1,
                totalItemsCount:1,
                pageRangeDisplayed:3
            }
            this.handlePageChange=this.handlePageChange.bind(this);
        } 
        handlePageChange(pageNumber) {
            console.log(`active page is ${pageNumber}`);
            // this.setState({activePage: pageNumber});
            axios.get('http://127.0.0.1:8000/api/product-customer?page='+ pageNumber)
                .then(res=>{
                    this.setState({
                        product:res.data.data,
                        itemsCountPerPage:res.data.per_page,
                        totalItemsCount:res.data.total,
                        activePage:res.data.current_page
                    });
                });
        }
        componentDidMount(){
            axios.get('http://127.0.0.1:8000/api/product-customer')
            .then(res=>{
                this.setState({
                    product:res.data.data,
                    itemsCountPerPage:res.data.per_page,
                    totalItemsCount:res.data.total,
                    activePage:res.data.current_page
                });
            });
            axios.get('http://127.0.0.1:8000/api/categories')
                .then(res=>{
                    this.setState({categories:res.data});
                });
        }
        showCategoriess(){
            // console.log(this.state.categories);
            const lstCategories = this.state.categories.map((item, index)=>
                <Link to={ '/categories/' + item.categories_id } 
                style={{color:'black'}}  key={index} className="list-group-item">
                    {item.categories_name}
                </Link>
            );
            return lstCategories;
        }
        render(){
            let elements= Array.isArray(this.state.product) && this.state.product.map((product, index) => {
                if(product.product_status===1){
                    return <div key={index} className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <ProductNews
                            id={product.product_id}
                            name={product.product_name}
                            price={product.unit_price}
                            promotion_price={product.promotion_price}
                            image={product.product_image}
                            content={product.product_desc}
                            product_slug={product.product_slug}
                        />
                        </div>
                }else return '';
            }); 
            return(
                <div style={{overflow:"hidden", width:"100vw"}}>
                    <Navigation propsParent = {this.props} />
                    <Carousels />
                    <Search />
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                <div className="list-group">
                                    {this.showCategoriess()}
                                </div>
                            </div>
                            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                <div className="form-group">
                                    <div className="row">
                                        {elements}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="d-flex justify-content-center">
                                        <Pagination
                                            activePage={this.state.activePage}
                                            itemsCountPerPage={this.state.itemsCountPerPage}
                                            totalItemsCount={this.state.totalItemsCount}
                                            pageRangeDisplayed={this.state.pageRangeDisplayed}
                                            onChange={this.handlePageChange.bind(this)}
                                            itemClass='page-item'
                                            linkClass='page-link'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span> </span>
                    <Footer />
                </div>
            );
        }
    }


export default New;