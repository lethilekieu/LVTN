import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label, Row, Col, Alert, Spinner } from 'reactstrap';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import PayCreditCard from './PayCreditCard';
// import Carousels from '../Carousels/Carousels';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ship_address: "",
            ship_phone: "",
            ship_email: "",
            ship_notes: "",
            ship_method: 1,
            created_at: moment(new Date()).format("yyyy-MM-DD"),
            updated_at: moment(new Date()).format("yyyy-MM-DD"),

            citys:[],
            city_id:"",
            districts:[],
            district_id:"",
            wards:[],
            wards_id:"",
            home_address:"",

            colors:[],
            sizes:[],

            customer: sessionStorage.getItem('objCustomer') ? JSON.parse(sessionStorage.getItem('objCustomer')) : '',
            cart: localStorage.getItem('arrCart') ? JSON.parse(localStorage.getItem('arrCart')) : [],
            fee_ship: 0,
            total_price: 0,

            radioTT: 1,
            isCheckValid: false,

            isLoading: false,
            handleQuantityProduct: true,
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        // this.addOrder = this.addOrder.bind(this);
        this.onPay = this.onPay.bind(this);
    }

    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onPay(err, cancelled, payment){
        console.log(err, cancelled, payment);
        if(err){ 
            alert("Không đủ tiền trong tài khoản");
        } 
        else if(cancelled){
            alert("Giao dịch bị gián đoạn");
        }else{
            this.onSubmit();
        }
    }

    checkValid(){
        if(this.state.home_address=="") { return alert("Địa chỉ không được trống!") }
        else if(this.state.ship_phone=="") { return alert("Điện thoại không được trống!") }
        else if(this.state.ship_email=="") { return alert("Email không được trống!") }
        else {
            this.setState({isCheckValid: true})
        }
    }

    addOrder(){
        var payByPayPal = Math.ceil(this.state.total_price / 23000);
        console.log(payByPayPal);
        var customer = sessionStorage.getItem('objCustomer') ? JSON.parse(sessionStorage.getItem('objCustomer')) : '';
        if(customer == ''){
            return  <>
                        <Alert color="danger" style={{padding: "10px 34px"}}>
                            <h4 className="alert-heading">Chưa đăng nhập!</h4>
                            <p>Hiện tại hệ thống chưa được đăng nhập!</p>
                            <hr />
                            <p className="mb-0">Để tiếp tục mua hàng phải đăng nhập tài khoản.</p>
                        </Alert>
                    </>
        }
        else{
            return <>
                {
                    this.state.isLoading == true ? (<div  style={{position: "relative", left: "30%", padding: "10px 34px"}}>
                                                    <Spinner type="grow" color="primary" />
                                                    <Spinner type="grow" color="secondary" />
                                                    <Spinner type="grow" color="success" />
                                                    <Spinner type="grow" color="danger" />
                                                    <Spinner type="grow" color="warning" />
                                                    <Spinner type="grow" color="info" />
                                                    </div>) : (
                                                        this.state.radioTT == 2 ? (
                                                            <div style={{position: "relative", left: "30%", padding: "10px 34px"}}>
                                                                {
                                                                    this.state.isCheckValid && (
                                                                        <PayCreditCard onResultPay = { this.onPay } total = { payByPayPal } />
                                                                    )
                                                                }
                                                               
                                                            </div>
                                                        ) : (<Button onClick={ ()=>this.onSubmit() } style={{padding: "10px 34px"}}>Thanh toán</Button>)
                                                    )
                }
            </>
        }
    }

    componentWillMount(){
        axios.get('http://127.0.0.1:8000/api/city')
        .then(res => {
            console.log('city:',res)
            this.setState({
                citys: res.data,
                city_id: res.data[0].city_id,
                fee_ship: res.data[0].city_id == "SG" ? 30000 : 50000
            },() => {
                axios.get('http://127.0.0.1:8000/api/find-district/' + res.data[0].city_id)
                .then(res => {
                    console.log('district:',res)
                    this.setState({
                        districts: res.data,
                        district_id:res.data[0].district_id
                    }, ()=> {
                        this.loadWards(res.data[0].district_id);
                    })
                }).catch(err =>console.log(err));
            })
        }).catch(err =>console.log(err));
    
        var total_price = 0;
        this.state.cart.map(itemCart => {
            let price = itemCart.promotion_price != 0 ? itemCart.promotion_price : itemCart.unit_price;
            let product_quantity = itemCart.product_quantity;
            total_price += price*product_quantity;
        })
        this.setState({total_price: total_price});

        var checkQuantityInCart = localStorage.getItem('arrCart') ? JSON.parse(localStorage.getItem('arrCart')) : [];
        checkQuantityInCart.map(itemPro => {
            console.log('itemCart', itemPro);
            axios.get('http://127.0.0.1:8000/api/product/' + itemPro.product_id)
            .then(res => {
                console.log('Catch quantity', res.data);
                if(parseInt(res.data.product_quantity) < itemPro.product_quantity){
                    alert('Sản phẩm ' + itemPro.product_name + ' không đủ, hãy chọn số lượng nhỏ hơn');
                    this.setState({
                        handleQuantityProduct: false
                    })
                }
            }).catch(err => console.log(err));
        })
    }

    loadDistrict(id){
        axios.get('http://127.0.0.1:8000/api/find-district/' + id)
        .then(res => {
            console.log('district:',res)
            this.setState({
                districts: res.data,
                district_id:res.data[0].district_id
            },()=> {
                this.loadWards(res.data[0].district_id);
            })
        }).catch(err =>console.log(err));
    }
    loadWards(id){
        axios.get('http://127.0.0.1:8000/api/find-wards/' + id)
        .then(res => {
            console.log('wards:',res)
            this.setState({
                wards: res.data,
                wards_id:res.data[0].wards_id
            })
        }).catch(err =>console.log(err));
    }

    onSubmit(){
        this.setState({isLoading: !this.state.isLoading});
        var city_name = this.state.citys.find(city => city.city_id == this.state.city_id).city_name;
        var district_name = this.state.districts.find(district => district.district_id == this.state.district_id).district_name;
        var ward_name = this.state.wards.find(ward => ward.wards_id == this.state.wards_id).wards_name;
        const listInfoShip = {
            ship_address: city_name + ',' + district_name + ',' + ward_name + ',' + this.state.home_address,
            ship_phone: this.state.ship_phone,
            ship_email: this.state.ship_email,
            ship_notes: this.state.ship_notes,
            ship_method: this.state.radioTT,
            created_at: this.state.created_at,
            updated_at: this.state.updated_at,
        }
        console.log("address:", listInfoShip.ship_address);
        
        axios.post('http://127.0.0.1:8000/api/info-ship/', listInfoShip)
        .then(res => {
            console.log('ship_id', res.data.ship_id);
            this.setState({
                ship_id: res.data.ship_id,
            }, () =>{
                var customer = sessionStorage.getItem('objCustomer') ? JSON.parse(sessionStorage.getItem('objCustomer')) : '';
                var fee_ship = 0;
                if(this.state.city_id == "SG"){
                    fee_ship = 30000;
                }
                else{
                    fee_ship = 50000;
                }
                // return console.log(this.state.fee_ship);
                const listOrder = {
                    customer_id: customer.customer_id,
                    ship_id: res.data.ship_id,
                    order_status: 1,
                    fee_ship,
                    total_sold: this.state.total_price + fee_ship,
                    created_at: this.state.created_at
                }
                axios.post('http://127.0.0.1:8000/api/tbl-order/', listOrder)
                .then(res => {
                    console.log('customer_id:', res.data.customer_id);
                    console.log('order_id:', res.data);
                    this.setState({
                        order_id: res.data.order_id,
                    }, () => {
                        var cart = localStorage.getItem('arrCart') ? JSON.parse(localStorage.getItem('arrCart')) : [];
                        cart.map(item => {
                            const listOrderDetails = {
                                order_id: res.data.order_id,
                                product_id: item.product_id,
                                color_name: item.color_name,
                                size_name: item.size_name,
                                unit_price: item.unit_price,
                                promotion_price: item.promotion_price,
                                product_quantity: item.product_quantity
                            }
                            axios.post('http://127.0.0.1:8000/api/order-details',listOrderDetails)
                            .then(res => {
                                axios.put('http://127.0.0.1:8000/api/update-quantity-after-order/' + listOrderDetails.product_id, listOrderDetails)
                            }).catch(err => console.log(err))
                        })
                        const toSendMail = {
                            ship_email: listInfoShip.ship_email,
                            customer_id: listOrder.customer_id,
                            order_id: res.data.order_id,
                            ship_phone: listInfoShip.ship_phone,
                            created_at: listOrder.created_at,
                            total_sold: listOrder.total_sold
                        }
                        axios.post('http://127.0.0.1:8000/api/sendmail', toSendMail)
                        .then(response => {
                            alert('Đã gửi mail');
                        })
                        localStorage.removeItem('arrCart');
                        this.setState({isLoading: !this.state.isLoading});
                        alert('Đặt hàng thành công!');
                        this.props.history.push("/order-tracking/" + res.data.order_id);
                    })
                })
            })
        }).catch(err => {
            if(Array.isArray(err.response.data)){
                err.response.data.map((error) => {
                    toast.error('Lỗi '+ error, {
                        onClose: () => {
                            this.setState({isLoading: false});
                        }
                    });
                })
            }else{
                toast.error('Lỗi: ' + err.response.data);
            }
        })
    }
    
    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Navigation propsParent = {this.props}/>
                {/* <Carousels /> */}
                <div className="content" style={{minHeight:"62vh"}}>
                    <ToastContainer position="top-right" />
                    <div className="container-fluid">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                    <Form>
                                        <div className="card shadow mb-4">
                                            <Row style={{padding: "10px 34px"}}>
                                                <Col sm={3}>
                                                    <FormGroup row className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Chọn thành phố/tỉnh</Label>
                                                        <Input type="select" onChange={ (e) => {
                                                                this.loadDistrict(e.target.value);
                                                                this.setState({
                                                                    city_id: e.target.value,
                                                                    fee_ship: e.target.value == "SG" ? 30000 : 50000,
                                                                })
                                                            }} name="city_id" id="city_id" >
                                                            {this.state.citys.map((city, index) =>
                                                                    <option key={ index } value={city.city_id}>{city.city_name}</option>
                                                                )
                                                            }
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={3}>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Chọn quận/huyện</Label>
                                                        <Input type="select" onChange={ (e)=> {
                                                                this.loadWards(e.target.value);
                                                                this.setState({district_id: e.target.value})
                                                            }} name="district_id" id="district_id" >
                                                            {this.state.districts.map((district, index) =>
                                                                    <option key={ index } value={district.district_id}>{district.district_name}</option>
                                                                )
                                                            }
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={3}>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Chọn phường/xã/thị trấn</Label>
                                                        <Input type="select" onChange={ this.onHandleChange } name="wards_id" id="wards_id" >
                                                            {this.state.wards.map((ward, index) =>
                                                                    <option key={ index } value={ward.wards_id}>{ward.wards_name}</option>
                                                                )
                                                            }
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={3}>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2" >Địa chỉ nhận hàng</Label>
                                                        <Input type="text" onChange={ this.onHandleChange } name="home_address" id="home_address"/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row style={{padding: "10px 34px"}}>
                                                <Col sm={6}>
                                                    <FormGroup row className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2" sm={4}>Điện thoại liên lạc</Label>
                                                        <Col sm={12}>
                                                            <Input type="text" onChange={ this.onHandleChange } name="ship_phone" id="ship_phone"/>
                                                        </Col>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={6}>
                                                    <FormGroup row className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2" sm={4}>Email liên lạc</Label>
                                                        <Col sm={12}>
                                                            <Input type="text" onChange={ this.onHandleChange } name="ship_email" id="ship_email"/>
                                                        </Col>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style={{padding: "10px 34px"}}>
                                                <Label for="Name" className="mr-sm-2">Ghi chú</Label>
                                                <Input type="text" onChange={ this.onHandleChange } name="ship_notes" id="ship_notes"/>
                                            </FormGroup>
                                            <hr></hr>
                                            
                                            {/* <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <legend>Chọn hình thức giao hàng</legend>
                                                <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="radioGH" value={1}/>Giao hàng tiêu chuẩn từ 2 đến 3 ngày
                                                </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="radioGH" value={2}/> Giao hàng nhanh
                                                </Label>
                                                </FormGroup>
                                            </FormGroup> */}
                                            {
                                                this.state.handleQuantityProduct ? (
                                                    <>
                                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style={{padding: "10px 34px"}}>
                                                            {/* <Label for="Name" className="mr-sm-2">Phương thức thanh toán</Label>
                                                            <Input type="select" value={this.state.ship_method} onChange={ this.onHandleChange } name="ship_method" id="ship_method" >
                                                                <option value={1}>COD - thanh toán khi nhận hàng</option>
                                                                <option value={2}>Thanh toán bằng thẻ</option>
                                                            </Input> */}
                                                            <legend>Chọn phương thức thanh toán</legend>
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input type="radio" onClick={ this.onHandleChange } name="radioTT" value={1} defaultChecked/>COD - thanh toán khi nhận hàng
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input type="radio" onClick={ (e) => {
                                                                        this.checkValid();
                                                                        if(this.state.isCheckValid){ this.setState({radioTT: e.target.value}) }
                                                                     }
                                                                    } name="radioTT" value={2}/>Thanh toán bằng thẻ
                                                                </Label>
                                                            </FormGroup>
                                                        </FormGroup>
                                                        <div className="clear"></div>
                                                        { this.addOrder() }
                                                    </>
                                                ) : <>
                                                    <Alert color="danger" style={{padding: "10px 34px"}}>
                                                        <h4 className="alert-heading">Sản phẩm không đủ số lượng!</h4>
                                                        <p>Cần giảm số lượng của sản phẩm để tiếp tục mua hàng!</p>
                                                    </Alert>
                                            </>}
                                        </div>
                                    </Form>
                                </div>
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Sản phẩm bạn đã mua</h6>
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
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        this.state.cart.map((item, index) => 
                                                            <tr key={ index }>
                                                                <td>{item.product_name}</td>
                                                                <td><img height="50" width="50" src={ item.product_image } alt="item.product_name" /></td>
                                                                <td>{item.product_quantity}</td>
                                                                <td>{item.ten_mau}</td>
                                                                <td>{item.ten_kichco}</td>
                                                                <td>{item.promotion_price == 0 ? item.unit_price : item.promotion_price}</td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                            <table style={{float:"left", width:"40%", textAlign:'left'}}>
                                                <tr>
                                                    <td>
                                                        {
                                                            this.state.city_id == "SG" ? <Alert color="light">Phí phip của bạn ở nội thành: {this.state.fee_ship}VDN</Alert> : <Alert color="light">Phí phip của bạn ở ngoại thành:  {this.state.fee_ship}VDN</Alert>
                                                        }
                                                    </td>
                                                </tr>
                                            </table>
                                            <table style={{float:"right", width:"40%", textAlign:'left'}}>
                                                <tr>
                                                    <th>Phí giao hàng : </th>
                                                    <td>{this.state.fee_ship}</td>
                                                </tr>
                                                <tr>
                                                    <th>Tổng tiền  : </th>
                                                    <td>{this.state.total_price}</td>
                                                </tr>
                                            </table>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                </div>
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

export default Order;