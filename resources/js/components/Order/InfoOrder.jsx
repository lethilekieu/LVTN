import axios from 'axios';
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

class InfoOrder extends Component {
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
        const options = {
            format: "a1"
        };
        const columns_tblOrder = [
            {
                name: '#',
                selector: 'order_id',
                sortable: true,
            },
            {
                name: 'Mã khách hàng',
                selector: 'customer_id',
                sortable: true,
                right: true,
            },
            {
                name: 'Trạng thái đơn đặt hàng',
                selector: 'order_status',
                sortable: true,
                right: true,
                cell: row => (
                    <>
                        {row.order_status == 1 ? "Đang xác nhận" : row.order_status == 2 ? "Đã xử lý" : row.order_status == 3 ? "Đang giao" : row.order_status == 4 ? "Thành công" : "Đã Hủy"}
                    </>
                )
            },
            {
                name: 'Phí giao hàng',
                selector: 'fee_ship',
                sortable: true,
                right: true
            },
            {
                name: 'Tổng giá đơn đặt',
                selector: 'total_sold',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày lập đơn',
                selector: 'created_at',
                sortable: true,
                right: true,
            }
        ];
        const columns_infoShip = [
            {
                name: '#',
                selector: 'ship_id',
                sortable: true,
            },
            {
                name: 'Địa chỉ đặt hàng',
                selector: 'ship_address',
                sortable: true,
                right: true,
            },
            {
                name: 'Điện thoại liên lạc',
                selector: 'ship_phone',
                sortable: true,
                right: true,
            },
            {
                name: 'Địa chỉ email',
                selector: 'ship_email',
                sortable: true,
                right: true,
            },
            {
                name: 'Ghi chú giao hàng',
                selector: 'ship_notes',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày đặt hàng',
                selector: 'created_at',
                sortable: true,
                right: true,
            }
        ];
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Navigation propsParent = {this.props}/>
                {/* <Carousels /> */}
                <div className="content" style={{minHeight:"62vh"}}>
                    <div className="container-fluid">
                        <div className="container-fluid order-details-bg">
                            <DataTable
                                title="Thông tin giao hàng"
                                columns={columns_infoShip}
                                data={ this.state.info_ship }
                            />
                            <DataTable
                                title="Thông tin đơn đặt hàng"
                                columns={columns_tblOrder}
                                data={ this.state.tbl_order }
                            />
                        </div>
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
                <Footer />
            </div>
        );
    }
}

export default InfoOrder;