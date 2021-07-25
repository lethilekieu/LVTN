import axios from 'axios';
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import ShowInfoShip from './ShowInfoShip';

class ShowOrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_details:[],
            products:[],
            colors:[],
            sizes:[],
        }
        this.loadOrderDetails = this.loadOrderDetails.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loadOrderDetails(){
        axios.get('http://127.0.0.1:8000/api/get-order-details-by/' + this.props.data.order_id)
        .then(res => {
            console.log('orderDetials: ', res);
            this.setState({
                order_details: res.data
            });
        })
        .catch( err => console.log(err) );
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

    componentWillMount(){
        this.loadOrderDetails();
        this.loadProduct();
        this.loadColor();
        this.loadSize();
    }
    
    render() {
        const columns = [
            {
                name: '#',
                selector: 'order_details_id',
                sortable: true,
            },
            {
                name: 'Mã đơn đặt',
                selector: 'order_id',
                sortable: true,
                right: true,
            },
            {
                name: 'Tên sản phẩm',
                selector: 'product_id',
                sortable: true,
                right: true,
                cell: row => (
                    <>
                        {this.state.products.map((item, index) => <div key={index}> {item.product_id == row.product_id && item.product_name}</div>)}
                    </>
                ),
            },
            {
                name: 'Tên màu',
                selector: 'color_name',
                sortable: true,
                right: true,
                cell: row => (
                    <>
                        {this.state.colors.map((item, index) => <div key={index}> {item.color_id == row.color_name && item.color_name}</div>)}
                    </>
                ),
            },
            {
                name: 'Kích cỡ',
                selector: 'size_name',
                sortable: true,
                right: true,
                cell: row => (
                    <>
                        {this.state.sizes.map((item, index) => <div key={index}> {item.size_id == row.size_name && item.size_name}</div>)}
                    </>
                ),
            },
            {
                name: 'Giá gốc',
                selector: 'unit_price',
                sortable: true,
                right: true,
            },
            {
                name: 'Giá khuyến mãi',
                selector: 'promotion_price',
                sortable: true,
                right: true,
            },
            {
                name: 'Số lượng sản phẩm',
                selector: 'product_quantity',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày đặt hàng',
                selector: 'create_at',
                sortable: true,
                right: true,
            }
        ];

        const customStyles = {
            header: {
              style: {
                minHeight: '0px',
              },
            },
            headRow: {
              style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
              },
            },
            headCells: {
              style: {
                color: 'white',
                '&:not(:last-of-type)': {
                  borderRightStyle: 'solid',
                  borderRightWidth: '1px',
                },
              },
            },
            cells: {
              style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:not(:last-of-type)': {
                  borderRightStyle: 'solid',
                  borderRightWidth: '1px',
                },
              },
            },
        };

        return (
            <>
                <div id="content">
                    <div className="container-fluid order-details-bg">
                        <DataTable
                            columns={columns}
                            data={ this.state.order_details }
                            customStyles={customStyles}
                        />
                    </div>
                </div>
                <ShowInfoShip order_id = { this.props.data.order_id }/>
            </>
            
        );
    }
}

export default ShowOrderDetails;