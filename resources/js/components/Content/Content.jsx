import React from 'react';
import Products from '../Products/Products';
import './Content.css';
import axios from 'axios';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import { CustomInput, Form, FormGroup, Label, Col, Input } from 'reactstrap';
class Content extends React.Component {
        constructor(props){
            super(props);
            this.state={
                product:[],
                size:[],
                sizeSearch:[],
                sort:"",
                categories:[],
                activePage:1,
                itemsCountPerPage:1,
                totalItemsCount:1,
                pageRangeDisplayed:3,
                
            }
            this.handlePageChange=this.handlePageChange.bind(this);
            this.sortProduct = this.sortProduct.bind(this);
            this.showSizeid = this.showSizeid.bind(this);
            // this.sortPriceProduct = this.sortPriceProduct.bind(this);
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

        componentWillMount(){
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
            axios.get('http://127.0.0.1:8000/api/size')
            .then(res=>{
                this.setState({
                    size:res.data
                  //  size2:res.data
                });
            });
        }
        showSizeid(e){
            console.log(e.target.value);
            let temp=this.state.sizeSearch;//[...this.state.sizeSearch];
            let n =e.target.checked;//this.refs.complete.state.checked;
           //let n= this.refs.complete.state.checked
            if (n===true)
            {
                temp.push(e.target.value);
            }
            else 
            {
                let i =  temp.indexOf(e.target.value);
                if (i > -1) {
                  temp.splice(i, 1);
                }
            }
            this.setState({sizeSearch:temp});
            console.log(temp);

           
            
       //    console.log(temp.reduce((f, s) => `${f},${s}`));
            axios.get('http://127.0.0.1:8000/api/product-size/'+temp.join('-'), {
            // params: {
            //     size: temp.reduce((f, s) => `${f},${s}`) 
            // }
            }).then(res=>{
               console.log("return:",res.data)
               this.setState({
                    product:res.data
                });
                  //  size2:res.data
            });
          
          //  console.log(this.refs.complete.checked);
            // const size_id = e.target.value
            // const CurrentIndex= this.state.Checked.indexOf(item);
            // const newChecked = [...this.state.Checked] ;
            // if(CurrentIndex === -1){
            //     newChecked.push(item)
            // }else{
            //     newChecked.splice(CurrentIndex, 1)
            // }
            // this.state.setChecked(newChecked)
            // this.setState({
            //     [e.target.name] : e.target.value
            // });

        }
        showCategoriess(){
            // console.log(this.state.categories);<CustomInput type="checkbox" id="exampleCustomInline" label="M" inline />
            const lstCategories = this.state.categories.map((item, index)=>
                <Link to={ '/categories/' + item.categories_id } 
                style={{color:'black'}}  key={index} className="list-group-item">
                    {item.categories_name}
                </Link>
            );
            return lstCategories;
        }
        // showSize(){
        //     // console.log(this.state.categories);
        //     const lstSize = this.state.size.map((item, index)=>
        //         <CustomInput value={this.state.size_name} key={index} type="checkbox" id={item.size_id} label={item.size_name} onChange={this.showSizeid.bind(this)} inline />
        //     );
        //     return lstSize;
        // }
        sortProduct(e){
            const sort=e.target.value;
            console.log(e.target.value);
            this.setState((state)=>({
                sort: sort,
                product: this.state.product.slice().sort((a, b)=>
                    sort === "Giá thấp nhất"?
                    a.promotion_price > a.unit_price? a.promotion_price> a.promotion_price? 1: -1: a.unit_price > b.unit_price ? 1: -1:
                    sort === "Giá cao nhất" ?a.promotion_price < a.unit_price? a.promotion_price < a.promotion_price? 1: -1: a.unit_price < b.unit_price? 1: -1:
                    a.product_id > b.product_id ? 1: -1
                ),
            }))
        }
        // sortPriceProduct(e){
        //     const sort=e.target.value;
        //     console.log(e.target.value);
        //     this.setState((state)=>({
        //         sort: sort,
        //         product: this.state.product.slice().sort((a, b)=>
        //             sort >= 150000 && sort <=250000? a.unit_price > b.unit_price ? 1: -1:
        //             sort === "Giá cao nhất" ? a.unit_price < b.unit_price? 1: -1:
        //             a.product_id < b.product_id ? 1: -1
        //         ),
        //     }))
        // }
        // sizeProduct(e){
        //     if(e.target.value === ""){
        //         this.setState({size: e.target.value, product: []})
        //     }else{
        //         this.setState({
        //            size: e.target.value,
        //            product: [].filter((product)=>product.availableSizes.indexOf(e.target.value) >= 0),
        //         });
        //     }
        // }
        render(){
        console.log(this.state.totalItemsCount);
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
            <hr />
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9" style={{textAlign:'center'}}>
                            <FormGroup>
                                <Label for="exampleCheckbox" style={{fontWeight:'bold', color:'black'}}>Giá</Label>
                                <div>
                                <CustomInput type="radio" id="exampleCustomRadio" name="customRadio"  label="Tất cả" value={this.state.sort} onChange={this.sortPriceProduct} inline />
                                <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="150,000- 250,000 VND" value={this.state.sort} onChange={this.sortPriceProduct} inline />
                                <CustomInput type="radio" id="exampleCustomRadio3" label="250,000- 350,000 VND" value={this.state.sort} onChange={this.sortPriceProduct} inline />
                                <CustomInput type="radio" id="exampleCustomRadio4" label="> 350,000 VND" value={this.state.sort} onChange={this.sortPriceProduct} inline />
                                </div>
                            </FormGroup>
                            
                        </div>
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"  style={{textAlign:'center'}}>
                            <FormGroup>
                                <Label for="exampleCheckbox" style={{fontWeight:'bold', color:'black'}}>Kích Cỡ</Label>
                                <div>
                                    {/* {this.showSize()} */}{
                                    this.state.size.map((item, index)=>
                                        <CustomInput value={item.size_id} key={index} type="checkbox" id={item.size_id} label={item.size_name} 
                                        onChange={this.showSizeid.bind(this)}  inline />
                                    )}
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <div>
                            <FormGroup row >
                                <Label for="exampleSelect" style={{fontWeight:'bold', color:'black'}}>Sắp xếp</Label>
                            {""}
                                <select value={this.state.sort} onChange={this.sortProduct.bind(this)}>
                                    <option>-----Giá-----</option>
                                    <option>Giá thấp nhất</option>
                                    <option>Giá cao nhất</option>
                                </select>
                                
                            </FormGroup>
                        </div>
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
            </div>
        );
    }
}

export default Content;