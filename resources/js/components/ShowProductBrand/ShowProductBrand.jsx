import React from 'react';
import ProductBrand from './ProductBrand/ProductBrand';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
class ShowProductBrand extends React.Component {
    
        constructor(props){
            super(props);
            this.state={
                // product:[],
                categories:[],
                brand_id:this.props.match.params.id,
            }
        } 
        static getDerivedStateFromProps(props, state){
            console.log('room click hook: ', props, state);
            return { brand_id: props.match.params.id };
        }
        // static getDerivedStateFromProps(props, state){
        //     console.warn("hook: ",props, state);
        //     return { brand_id: props.match.params.id };
        // }
        componentDidMount(){
            // axios.get('http://127.0.0.1:8000/api/brand-product/'+ this.state.brand_id)
            //     .then(res=>{
            //         this.setState({product:res.data});
            //     }).catch(err=>console.log(err));
            axios.get('http://127.0.0.1:8000/api/categories')
                .then(res=>{
                    this.setState({categories:res.data});
                });
                window.scrollTo(0, 0);
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
            
            console.log(this.props.match.params.id);
        //     console.warn('room click: ',this.state.brand_id);
        // let elements=this.state.product.map((product, index) => {
        //     return <div key={index} value={this.state.brand_id} className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        //             <ProductBrand
        //                 id={product.product_id}
        //                 name={product.product_name}
        //                 price={product.unit_price}
        //                 promotion_price={product.promotion_price}
        //                 image={product.product_image}
        //                 content={product.product_desc}
        //                 product_slug={product.product_slug}
        //             />
        //         </div>
        // }); 
        return(
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Navigation propsParent = {this.props}/>
                <Carousels />
                <Search />
                <div className="form-group">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                <div className="list-group">
                                    {this.showCategoriess()}
                                </div>
                            </div>
                            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                <div className="row">
                                    <ProductBrand brand_id={this.state.brand_id} />
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


export default ShowProductBrand;
