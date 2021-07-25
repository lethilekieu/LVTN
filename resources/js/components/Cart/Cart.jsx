import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
// import Carousels from '../Carousels/Carousels';
import './Cart.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: localStorage.getItem('arrCart') ? JSON.parse(localStorage.getItem('arrCart')) : [],
            total_price: 0,

            colors:[],
            sizes:[]
        }
    }

    onDelete(id, color_name, size_name){
        const newCart = this.state.cart.filter(itemCart => itemCart.product_id != id ||  itemCart.color_name != color_name ||  itemCart.size_name != size_name);
        console.log(newCart);
        localStorage.setItem('arrCart',JSON.stringify(newCart));
        //
        this.setState({
            cart: this.state.cart.filter(itemCart => itemCart.product_id != id ||  itemCart.color_name != color_name ||  itemCart.size_name != size_name)
        }, ()=>{
            var total_price = 0;
            this.state.cart.map(itemCart => {
                let price = itemCart.promotion_price != 0 ? itemCart.promotion_price : itemCart.unit_price;
                let product_quantity = itemCart.product_quantity;
                total_price += price*product_quantity;
            })
            this.setState({total_price: total_price})
        });
    }

    componentWillMount(){
        this.state.cart == '' && toast.error('Giỏ hàng chưa có sản phẩm')
        var total_price = 0;
        this.state.cart.map(itemCart => {
            let price = itemCart.promotion_price != 0 ? itemCart.promotion_price : itemCart.unit_price;
            let product_quantity = itemCart.product_quantity;
            total_price += price*product_quantity;
        })
        this.setState({total_price: total_price})
    }
    
    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Navigation propsParent = {this.props}/>
                {/* <Carousels /> */}
                <ToastContainer />
                <div className="content" style={{minHeight:"62vh"}}>
                    <div className="container-fluid">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Giỏ hàng của bạn</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Tên sản phẩm</th>
                                                <th>Hình ảnh</th>
                                                <th>Số lượng</th>
                                                <th>Màu sản phẩm</th>
                                                <th>Kích cỡ sản phẩm</th>
                                                <th>Giá sản phẩm</th>
                                                <th>Tác vụ</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Tên sản phẩm</th>
                                                <th>Hình ảnh</th>
                                                <th>Số lượng</th>
                                                <th>Màu sản phẩm</th>
                                                <th>Kích cỡ sản phẩm</th>
                                                <th>Giá sản phẩm</th>
                                                <th>Tác vụ</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            {
                                                this.state.cart.map((item, index) => 
                                                    <tr key={ index }>
                                                        <td>{item.product_name}</td>
                                                        <td><img height="50" width="50" src={ item.product_image } alt="item.product_name" /></td>
                                                        <td>{item.product_quantity}</td>
                                                        {/* <td>{this.state.colors.map((itemColor, index) => <div key={ index }>{itemColor.color_id == item.color_name && itemColor.color_name}</div>)}</td>
                                                        <td>{this.state.sizes.map((itemSize, index) => <div key={ index }>{itemSize.size_id == item.size_name && itemSize.size_name}</div>)}</td> */}
                                                        <td>{item.ten_mau}</td>
                                                        <td>{item.ten_kichco}</td>
                                                        <td>{item.promotion_price == 0 ? item.unit_price : item.promotion_price}</td>
                                                        <td>
                                                            <Button onClick={ ()=>this.onDelete(item.product_id, item.color_name, item.size_name)} outline color="danger" style={{margin: "10px"}}>Xóa</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <table style={{float:"right", width:"40%", textAlign:'left'}}>
                                        <tr>
                                            <th>Tổng tiền  : </th>
                                            <td>{this.state.total_price}</td>
                                        </tr>
                                    </table>
                                    <div className="shopping">
                                        <div className="shopleft">
                                            <Link style={{background:"#602D8D", textDecoration: 'none'}} to="/">TIẾP TỤC MUA SẮM</Link>
                                        </div>
                                        <div className="shopright">
                                            {
                                                this.state.cart != '' && <Link style={{background:"#602D8D", textDecoration: 'none'}} to="/thanh-toan">THANH TOÁN</Link>
                                            }
                                        </div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Footer />
            </div>
        );
    }
}

export default Cart;
