import axios from 'axios';
import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import ReactToPdf from 'react-to-pdf';
import { Button, Form, FormGroup, Label } from 'reactstrap';

class ShowTblOrderPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info_ship:[],
            order_details: [],
            tbl_order:[],
            products:[],
            colors:[],
            sizes:[],
        }
    }
    componentWillMount(){
        this.loadOrder();
        this.loadOrderDetails();
        this.loadInfoShip();
        this.loadProduct();
        this.loadColor();
        this.loadSize();
    }

    loadOrder(){
        axios.get('http://127.0.0.1:8000/api/tbl-order/' + this.props.match.params.id)
        .then(res =>{
            console.log('thông tin đơn đặt', res.data);
            this.setState({
                tbl_order: [{
                    order_id: res.data.order_id,
                    customer_id: res.data.customer_id,
                    order_status: res.data.order_status,
                    fee_ship: res.data.fee_ship,
                    total_sold: res.data.total_sold,
                    created_at: res.data.created_at,
                }]
            })
        })
    }
    loadOrderDetails(){
        axios.get('http://127.0.0.1:8000/api/get-order-details-by/' + this.props.match.params.id)
        .then(res=>{
            console.log('chi tiết', res.data);
            this.setState({
                order_details: res.data
            })
        })
    }
    loadInfoShip(){
        axios.get('http://127.0.0.1:8000/api/get-info-ship-by/' + this.props.match.params.id)
        .then(res=>{
            console.log('thông tin ship', res.data);
            this.setState({
                info_ship: [{
                    ship_id: res.data.ship_id,
                    ship_address: res.data.ship_address,
                    ship_email: res.data.ship_email,
                    ship_phone: res.data.ship_phone,
                    ship_notes: res.data.ship_notes,
                    created_at: res.data.created_at
                }]
            })
        })
    }
    loadProduct(){
        axios.get('http://127.0.0.1:8000/api/product/')
        .then(res => {
            console.log('product: ', res);
            this.setState({
                products: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    loadColor(){
        axios.get('http://127.0.0.1:8000/api/color/')
        .then(res => {
            console.log(res);
            this.setState({
                colors: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    loadSize(){
        axios.get('http://127.0.0.1:8000/api/size/')
        .then(res => {
            console.log(res);
            this.setState({
                sizes: res.data
            });
        })
        .catch( err => console.log(err) );
    }
    
    render() {
        const ref = React.createRef();
        const options = {
            format: "a2"
        };
        return (
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div ref={ref}>
                                <div className="container-fluid order-details-bg">
                                    {
                                        this.state.info_ship.map((item, index) =>
                                            <div key={index} className="card shadow mb-4">
                                                <div className="card-header py-3">
                                                    <h6 className="m-0 font-weight-bold text-primary">Chi tiết giao hàng</h6>
                                                    <Form>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Mã đơn giao hàng: {item.ship_id}</Label>
                                                        </FormGroup>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Địa chỉ đặt hàng: {item.ship_address}</Label>
                                                        </FormGroup>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Điện thoại liên lạc: {item.ship_phone}</Label>
                                                        </FormGroup>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Địa chỉ email: {item.ship_email}</Label>
                                                        </FormGroup>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Ghi chú giao hàng: {item.ship_notes}</Label>
                                                        </FormGroup>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Ngày đặt hàng: {item.created_at}</Label>
                                                        </FormGroup>
                                                    </Form>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <hr></hr>
                                    {
                                        this.state.tbl_order.map((item, index) => 
                                            <div key={index} className="card shadow mb-4">
                                                <div className="card-header py-3">
                                                    <h6 className="m-0 font-weight-bold text-primary">Chi tiết đơn hàng</h6>
                                                    <Form>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Mã đơn đặt hàng: {item.order_id}</Label>
                                                        </FormGroup>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Mã khách hàng: {item.customer_id}</Label>
                                                        </FormGroup>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Trạng thái đơn đặt hàng: {item.order_status}</Label>
                                                        </FormGroup>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Phí giao hàng: {item.fee_ship}</Label>
                                                        </FormGroup>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Tổng giá đơn đặt: {item.total_sold}</Label>
                                                        </FormGroup>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                            <Label for="name" className="mr-sm-2">Ngày lập đơn: {item.created_at}</Label>
                                                        </FormGroup>
                                                    </Form>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="container-fluid">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Chi tiết đơn hàng</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>Mã đơn đặt</th>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Tên màu</th>
                                                            <th>Kích cỡ</th>
                                                            <th>Giá gốc</th>
                                                            <th>Giá khuyến mãi</th>
                                                            <th>Số lượng sản phẩm</th>
                                                            <th>Ngày đặt hàng</th>
                                                        </tr>
                                                    </thead>
                                                    <tfoot>
                                                        <tr>
                                                            <th>Mã đơn đặt</th>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Tên màu</th>
                                                            <th>Kích cỡ</th>
                                                            <th>Giá gốc</th>
                                                            <th>Giá khuyến mãi</th>
                                                            <th>Số lượng sản phẩm</th>
                                                            <th>Ngày đặt hàng</th>
                                                        </tr>
                                                    </tfoot>
                                                    <tbody>
                                                        {
                                                            this.state.order_details.map((item, index) => 
                                                                <tr key={ index }>
                                                                    <td>{item.order_id}</td>
                                                                    <td>{this.state.products.map((itemPro, index) => <div key={index}> {item.product_id == itemPro.product_id && itemPro.product_name}</div>)}</td>
                                                                    <td>{this.state.colors.map((itemColor, index) => <div key={index}> {itemColor.color_id == item.color_name && itemColor.color_name}</div>)}</td>
                                                                    <td>{this.state.sizes.map((itemSize, index) => <div key={index}> {itemSize.size_id == item.size_name && itemSize.size_name}</div>)}</td>
                                                                    <td>{item.unit_price}</td>
                                                                    <td>{item.promotion_price}</td>
                                                                    <td>{item.product_quantity}</td>
                                                                    <td>{item.create_at}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <ReactToPdf targetRef={ref} filename={this.state.tbl_order.order_id + ".pdf"} options={options}>
                                {({toPdf}) => (
                                    <Button onClick={toPdf} outline color="danger" style={{margin: "10px"}}>In hóa đơn</Button>
                                )}
                            </ReactToPdf>
                            
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowTblOrderPDF;