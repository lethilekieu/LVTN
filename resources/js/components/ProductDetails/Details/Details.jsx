import React from 'react';
import './Details.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Label, Button, Input, Form } from 'reactstrap';
class Details extends React.Component {
    constructor(props){
      super(props);
      this.state={
        // product_slug: this.props.slug,
        product_id: this.props.id,
        product: {},
        color_details:[],
        size_details: [],

        order_id:null,
        color_name: 0,
        size_name: 0,
        unit_price:"",
        promotion_price:"",
        product_quantity:1,
      }
      this.onHandleChange = this.onHandleChange.bind(this);
      // this.loadColors = this.loadColors.bind(this);
    }

    onHandleChange(e){
      // console.log(e.target.value);
      this.setState({
          [e.target.name] : e.target.value
      },()=>console.log(this.state));
    }
    
    loadDetail(){
      console.log(this.props.id)
      axios.get('http://127.0.0.1:8000/api/product/' + this.props.id)
      .then(res=>{
        this.setState({product:res.data});
      }).catch(err=>console.log(err));
    }

    loadColors(id){
      axios.get('http://127.0.0.1:8000/api/get-color-details/' +  id)
      .then(res=>{
        this.setState({
          color_details: res.data,
          color_name: res.data[0].color_id
        });
      }).catch(err =>console.log(err))
    }

    loadSizes(id){
      axios.get('http://127.0.0.1:8000/api/get-size-details/' +  id)
      .then(res=>{
        this.setState({
          size_details: res.data,
          size_name: res.data[0].size_id
        });
      }).catch(err =>console.log(err))
    }

    addCart(){
      console.log(this.state);

      var ten_mau = this.state.color_details[this.state.color_details.findIndex((element) => element.color_id == this.state.color_name)].color_name;
      var ten_kichco = this.state.size_details[this.state.size_details.findIndex((element) => element.size_id == this.state.size_name)].size_name;

      //la phan tu dat vao storage
      var itemCart={
        order_id: null,
        product_id: this.props.id,
        product_name: this.state.product.product_name,
        product_image: this.state.product.product_image,
        color_name: this.state.color_name,
        ten_mau: ten_mau,
        size_name: this.state.size_name,
        ten_kichco: ten_kichco,
        unit_price: this.state.product.unit_price,
        promotion_price: this.state.product.promotion_price,
        product_quantity: this.state.product_quantity
      }
      // console.log('item', itemCart);
      //là danh sach hien tai co trong storage
      var arrCart = localStorage.getItem('arrCart') ? JSON.parse(localStorage.getItem('arrCart')) : [];

      var find_product = arrCart.find(x => itemCart.product_id == x.product_id &&  itemCart.color_name == x.color_name &&  itemCart.size_name == x.size_name);
      // console.log(find_product);
      if(find_product != null){
        itemCart.product_quantity = parseInt(find_product.product_quantity) + parseInt(itemCart.product_quantity);
        arrCart = arrCart.filter(x => itemCart.product_id != x.product_id ||  itemCart.color_name != x.color_name ||  itemCart.size_name != x.size_name);
        arrCart.push(itemCart);
        localStorage.setItem('arrCart',JSON.stringify(arrCart));
      } else {
        arrCart.push(itemCart);
        localStorage.setItem('arrCart',JSON.stringify(arrCart));
      }
    }

    componentWillMount(){
      // if(this.state.product_id == ""){
      //   axios.get('http://127.0.0.1:8000/api/product/find-id-by-slug/' + this.state.product_slug)
      //   .then(res=>{
      //       console.log('get id by slug', res.data.product_id);
      //       this.setState({product_id: res.data.product_id}); // -> this.state.product_id

      //       this.loadDetail(res.data.product_id);
      //       this.loadColors(res.data.product_id);
      //       this.loadSizes(res.data.product_id);
      //   })
      // } else {
        this.loadDetail();
        this.loadColors(this.props.id);
        this.loadSizes(this.props.id);
      // }
      console.log(this.props)
    }

    
    render() {
      // console.log(this.props.id);
        return (
          <div className="product-details">
            <div className="row">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <img className="card-img-top" height="350" src={ this.state.product.product_image } alt={this.state.product.product_slug} />
                    
                </div>
                
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  {/* {
                    
                    this.state.product.map(product=>{
                      if(String(product.product_id)===this.props.id){
                        return( */}
                          <div key={this.state.product.product_id} className="font-details">
                            <h5>Tên sản phẩm: <span style={{color:'blue'}}>{this.state.product.product_name}</span></h5>
                            <h5>ID: <span style={{color:'blue'}}>{this.state.product.product_id}</span></h5>
                            <h5>Giá gốc: <span style={{color:'blue'}}>{this.state.product.unit_price}</span></h5>
                            <h5>Giá giảm: <span style={{color:'red'}}>{this.state.product.promotion_price}</span></h5>
                          </div>
                        {/* )
                      }
                    })
                  } */}
                    <Label style={{color:'black'}}>Size</Label>
                    <div className="form-group">
                      <Input type="select" name="size_name" className="select" required="required" onChange={ this.onHandleChange } value= {this.state.size_name}>
                        {
                          this.state.size_details.map((item, index) =>
                            <option style={{color:'black'}} key={ index } value={item.size_id}>{item.size_name}</option>
                          )
                        }
                      </Input>
                    </div>
                    <Label style={{color:'black'}}>Màu sắc</Label>
                    <div className="form-group">
                      <Input type="select" name="color_name" className="select" required="required" onChange={ this.onHandleChange } value= {this.state.color_name}>
                        {
                          this.state.color_details.map((item, index) =>
                            <option key={ index } value={item.color_id} style={{color:'black'}}>{item.color_name}</option>
                          )
                        }
                      </Input>
                    </div>
                  <Form>
                    <div className="form-group">
                      <Input style={{color:'black'}} name="product_quantity" type="number" min="1" onChange={ this.onHandleChange } value= {this.state.product_quantity} />
                    </div>
                    <div className="form-group">
                      <Button type="button" onClick={()=>this.addCart()} className="btn btn-success">Thêm vào giỏ hàng</Button>
                    </div>
                  </Form>
                </div>
              
              {/* <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <Form>
                  <h1>Đánh giá sản phẩm</h1>
                  <Label>Đánh giá sao</Label>
                  <div className="form-group-">
                    <div className="rating">
                      <Label htmlFor="stars-rating-5"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></Label>
                      <Label htmlFor="stars-rating-4"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></Label>
                      <Label htmlFor="stars-rating-3"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></Label>
                      <Label htmlFor="stars-rating-2"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></Label>
                      <Label htmlFor="stars-rating-1"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></Label>
                    </div>
                  </div>
                  <Label>Bình luận</Label>
                  <div className="form-group">
                    <Input type="text" className="form-comment" placeholder="Comment..." />
                  </div>
                </Form>
                <Button type="submit" className="btn btn-success" name="button">Submit</Button>
              </div> */}
            </div>  
          </div>
        );
    }
}

export default Details;
