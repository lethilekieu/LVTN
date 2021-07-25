import axios from 'axios';
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

class ShowInfoShip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info_ship:[],
        }
        this.loadInfoShip = this.loadInfoShip.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loadInfoShip(){
        axios.get('http://127.0.0.1:8000/api/get-info-ship-by/' + this.props.order_id)
        .then(res => {
            console.log('info-ship: ', res);
            this.setState({
                info_ship: [{
                    ship_id: res.data.ship_id,
                    ship_address: res.data.ship_address,
                    ship_email: res.data.ship_email,
                    ship_phone: res.data.ship_phone,
                    ship_notes: res.data.ship_notes,
                    created_at: res.data.created_at
                }]
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadInfoShip();
    }
    
    render() {
        const columns = [
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

        const customStyles = {
            header: {
              style: {
                minHeight: '0px',
              },
            },
            headRow: {
              style: {
                backgroundColor: 'rgba(248, 148, 6, 0.9)',
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
                backgroundColor: 'rgba(248, 148, 6, 0.9)',
                color: 'white',
                '&:not(:last-of-type)': {
                  borderRightStyle: 'solid',
                  borderRightWidth: '1px',
                },
              },
            },
        };

        return (
            <div id="content">
                <div className="container-fluid order-details-bg">
                    <DataTable
                        columns={columns}
                        data={ this.state.info_ship }
                        customStyles={customStyles}
                    />
                </div>
            </div>
        );
    }
}

export default ShowInfoShip;