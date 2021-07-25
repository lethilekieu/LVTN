import moment from 'moment';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

class EditReceiptDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: "",
            receipt_id: "",
            receipt_quantity:"",
            receipt_price:"",
            updated_at: moment(new Date()).format("yyyy-MM-DD"),

            
            receipt_old_quantity:"",
            receipt_old_price:"",
            receipts: [],
            products: [],
        };
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    loadReceipts(){
        axios.get('http://127.0.0.1:8000/api/receipt/')
        .then(res=>{
            this.setState({
                receipts: res.data,
                receipt_id: res.data[0].receipt_id
            });
        }).catch(err =>console.log(err));
    }

    loadProducts(){
        axios.get('http://127.0.0.1:8000/api/product/')
        .then(res=>{
            this.setState({
                products: res.data,
                product_id: res.data[0].product_id
            });
        }).catch(err =>console.log(err));
    }

    editReceiptDetails(){
        axios.get('http://127.0.0.1:8000/api/receipt-details/' +  this.props.match.params.id)
        .then(res =>{
            this.setState({
                product_id: res.data.product_id,
                receipt_id: res.data.receipt_id,
                receipt_quantity: res.data.receipt_quantity,
                receipt_price: res.data.receipt_price,

                // receipt_old_quantity: res.data.receipt_quantity,
                // receipt_old_price: res.data.receipt_price
            });
        })
    }

    componentWillMount() {
        this.loadReceipts();
        this.loadProducts();
        this.editReceiptDetails();
    }

    onSubmit(){
        const listReceiptDetails = {
            product_id: this.state.product_id,
            receipt_id: this.state.receipt_id,
            receipt_quantity: this.state.receipt_quantity,
            receipt_price: this.state.receipt_price,
            updated_at: this.state.updated_at
        }
        axios.put('http://127.0.0.1:8000/api/receipt-details/' + this.props.match.params.id, listReceiptDetails)
        .then(res => {
            if(res != null){
                // const data = {
                //     total_old_money: this.state.receipt_old_quantity * this.state.receipt_old_price,
                //     total_money: this.state.receipt_quantity * this.state.receipt_price,
                //     action: 2
                // }
                // axios.put('http://127.0.0.1:8000/api/receipt_upd_bill/' + this.state.receipt_id, data)
                // .then(res =>{
                //     
                // })
                return this.props.history.push('/admin/home/receipt-details');
            }
        }).catch(err => {
            toast.error('Lỗi '+ err.response.data);
        })
    }

    render() {
        return (
            <div id="page-top">
                <ToastContainer position="top-right" />
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                <Form>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Mã phiếu nhập</Label>
                                        <Input type="select" onChange={ this.onHandleChange } value={this.state.receipt_id} name="receipt_id" id="receipt_id" >
                                            {this.state.receipts.map((receipt, index) =>
                                                    <option key={ index } value={receipt.receipt_id}>{receipt.receipt_id}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Mã sản phẩm</Label>
                                        <Input type="select" onChange={ this.onHandleChange } value={this.state.product_id} name="product_id" id="product_id" >
                                            {this.state.products.map((product, index) =>
                                                    <option key={ index } value={product.product_id}>{product.product_name}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Số lượng sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={this.state.receipt_quantity} name="receipt_quantity" id="receipt_quantity"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Giá sản phẩm nhập vào</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={this.state.receipt_price} name="receipt_price" id="receipt_price"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="created">Ngày sửa</Label>
                                        <Input type="date" name="updated_at" id="exampleDate" defaultValue={moment(this.state.updated_at).format("yyyy-MM-DD")} readOnly/>
                                    </FormGroup>
                                    <Button onClick={ ()=>this.onSubmit() }>Submit</Button>
                                </Form> 
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditReceiptDetails;