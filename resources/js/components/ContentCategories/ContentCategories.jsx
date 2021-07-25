import React from 'react';
import Products from '../Products/Products';
import axios from 'axios';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
class ContentCategories extends React.Component {
        constructor(props){
            super(props);
            this.state={
                product:[],
                activePage:1,
                itemsCountPerPage:1,
                totalItemsCount:1,
                pageRangeDisplayed:3,
                product_type:[],
                categories_id: this.props.id,
            }
            this.handlePageChange=this.handlePageChange.bind(this);
            this.loadCateProductType=this.loadCateProductType.bind(this);
        } 
        componentWillMount(){
            this.loadCateProductType(this.props.categories_id);
        }
        UNSAFE_componentWillReceiveProps(nextProps) {
            window.scrollTo(0, 0);
            this.loadCateProductType(nextProps.categories_id);
        }
        
        loadCateProductType(id){
            console.log(this.props.id)
            axios.get('http://127.0.0.1:8000/api/get-categories-producttype/'+ id)
            .then(res=>{
                console.log(res);
                this.setState({product_type:res.data});
            }).catch(err=>console.log(err));
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

        UNSAFE_componentWillMount(){
            axios.get('http://127.0.0.1:8000/api/product-customer')
                .then(res=>{
                    this.setState({
                        product:res.data.data,
                        itemsCountPerPage:res.data.per_page,
                        totalItemsCount:res.data.total,
                        activePage:res.data.current_page
                    });
                });
            // axios.get('http://127.0.0.1:8000/api/categories')
            //     .then(res=>{
            //         this.setState({categories:res.data});
            //     });
        }
        // showCateProductType(){
        //     // console.log(this.state.categories);
        //     const lstproduct_type = this.state.product_type.map((item, index)=>
        //         <Link to={ '/product_type/' + item.product_type_id } 
        //         style={{color:'black'}}  key={index} className="list-group-item">
        //             {item.product_type_name}
        //         </Link>
        //     );
        //     return lstproduct_type;
        // }
        
        render(){
        let elements=Array.isArray(this.state.product) && this.state.product.map((product, index) => {
            return <div key={index} className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <Products
                        propsParent={this.props.propsParent}
                        id={product.product_id}
                        name={product.product_name}
                        price={product.unit_price}
                        promotion_price={product.promotion_price}
                        image={product.product_image}
                        content={product.product_desc}
                        product_slug={product.product_slug}
                    />
                </div>
        }); 
        return(
            <div className="form-group">
            <div className="container">
                <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <div className="list-group">
                            {/* {this.showCateProductType()} */}
                            {
                                this.state.product_type.map((item,index)=>
                                    <Link to={ '/product_type/' + item.product_type_id } 
                                    style={{color:'black'}}  key={index} className="list-group-item">
                                        {item.product_type_name}
                                    </Link>
                                )
                            }
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
            </div>
        );
    }
}

export default ContentCategories;
