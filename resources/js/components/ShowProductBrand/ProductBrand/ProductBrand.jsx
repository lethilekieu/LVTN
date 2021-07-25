import React from 'react';
import './ProductBrand.css';
import {Link} from 'react-router-dom';
import CurrencyFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

class ProductBrand extends React.Component {
    constructor(props){
        super(props);
        this.state={
            product:[],
            brand_id:this.props.id,
        }
        this.loadProductBrand=this.loadProductBrand.bind(this);
    } 
    // componentWillMount(){
    //     this.loadProductBrand(this.props.brand_id);
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
        window.scrollTo(0, 0);
        this.loadProductBrand(nextProps.brand_id);
    }
    loadProductBrand(id){
        // console.log(this.props.id)
        //axios.get('http://127.0.0.1:8000/api/brand-product/'+ id+'/?page='+ pageNumber)
        axios.get('http://127.0.0.1:8000/api/brand-product/'+ id)
        .then(res=>{
            console.log(res);
            this.setState({product:res.data});
        }).catch(err=>console.log(err));
    }

    // componentDidMount(){
    //     this.loadProductBrand(this.props.id);
    // }
    onAddToCart(){
        alert(this.props.name + '-' + this.props.price);
    }
    
    render() {
        // console.log(this.props.image);
        return (
        <>
        {
            this.state.product.map((item,index)=>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" key={index}>
            <div className="product"  >
                <Link to={"/product_details/"+item.product_id +"/"+item.product_slug}>
                    <img className="card-img-top" src={item.product_image} alt={item.product_name} style={{width:"280"}} style={{height:"300"}} />
                </Link>
                
                <div className="card-body">
                <h4 className="card-title"><a href="#!">{item.product_name}</a></h4>
                <div className="form-group" className="inline-price">
                    <div className="form-check-inline">
                        <h6>
                            <CurrencyFormat style={{textDecorationLine: 'line-through', color:'red'}} value={item.unit_price} displayType={'text'} thousandSeparator={true} />
                            <del style={{color:'red', CurrencyFormat:'thousand'}}> VND</del>
                        </h6>
                    </div>
                    <div className="form-check-inline">
                        <h6  className="flash-sale">
                        <CurrencyFormat style={{color:'black'}} value={item.promotion_price} displayType={'text'} thousandSeparator={true} />
                        <ins className="ega-text--no-underline" style={{textDecoration:'none'}}> VND</ins>
                        </h6>
                    </div>
                </div>
                <p className="card-text">Gợi ý: {item.product_desc}</p>
                </div>
            
                <div className="col-md-12">
                    <div className="rating">
                        <label htmlFor="stars-rating-5"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-4"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-3"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-2"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-1"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                    </div>
                </div>
                <div className="col-md-12">
                    <Link to={"/product_details/"+item.product_id +"/"+item.product_slug} className="btn btn-primary">Xem chi tiết</Link><span> </span>
                    <a className="btn btn-danger" onClick={this.onAddToCart}>Mua hàng</a>
                </div>
                  
            </div>
        </div>
            )
        }
        </>
        );
    }
}

export default ProductBrand;