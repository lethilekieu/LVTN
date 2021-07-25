import axios from 'axios';
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'reactstrap';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

class HistoryOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders:[],
            order_status: "",
        }
    }

    loadOrders(){
        axios.get('http://127.0.0.1:8000/api/get-history-order/' + this.props.match.params.id)
        .then(res => {
            this.setState({
                orders: res.data
            })
        }).catch( err => console.log(err) )
    }

    componentWillMount(){
        this.loadOrders();
    }
    
    render() {
        const columns = [
            {
                name: '#',
                selector: 'order_id',
                sortable: true,
            },
            {
                name: 'Mã giao hàng',
                selector: 'ship_id',
                sortable: true,
                right: true
            },
            {
                name: 'Trạng thái đơn đặt hàng',
                selector: 'order_status',
                sortable: true,
                right: true,
                cell: row => (
                    <>
                        {row.order_status == 1 ? "Đang xác nhận" : row.order_status == 2 ? "Đã xử lý" : row.order_status == 3 ? "Đang giao" : row.order_status == 4 ? "Thành công" : "Đã hủy"}
                    </>
                )
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
            },
            {
                cell: row => (row.order_status != 3 && row.order_status != 4 && row.order_status !=5) && <Button onClick={ () => {
                    var data = row;
                    data.order_status = 5;
                    axios.put('http://127.0.0.1:8000/api/tbl-order/' + row.order_id, data)
                    .then(res => {
                        this.loadOrders();
                    })
                }} outline color="danger" style={{margin: "10px"}}>Hủy</Button>,
                button: true,
            },
            {
                cell: row => <Button onClick={ () => {
                    this.props.history.push('/order-tracking/' + row.order_id);
                }} outline color="info" style={{margin: "10px"}}>Chi tiết</Button>,
                button: true,
            }
        ];
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Navigation propsParent = {this.props}/>
                {/* <Carousels /> */}
                <div className="content" style={{minHeight:"62vh"}}>
                    <div className="container-fluid">
                        <DataTable
                            title="Lịch sử đơn đặt hàng"
                            columns={columns}
                            data={ this.state.orders }
                            pagination
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default HistoryOrder;