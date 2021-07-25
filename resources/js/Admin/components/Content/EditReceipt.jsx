import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

class EditReceipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier_id: "",
            bill_total: "",
            update_at: moment(new Date()).format("yyyy-MM-DD"),

            suppliers: [],
        };
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit(){
        const listReceipt = this.state;
        axios.put('http://127.0.0.1:8000/api/receipt/' + this.props.match.params.id, listReceipt)
        .then(res => {
            if(res != null){
                return this.props.history.push("/admin/home/receipt");
            }
        }) 
        .catch(err =>{
            err.response.data.map((error) =>{
                console.log(error);
                toast.error('Lỗi: '+ error);
            })
        })
    }

    loadSupplier(){
        axios.get('http://127.0.0.1:8000/api/supplier')
        .then(res=>{
            this.setState({
                suppliers: res.data,
                supplier_id: res.data[0].supplier_id
            });
        }).catch(err =>console.log(err));
    }

    editReceipt(){
        const receipt_id = this.props.location.sendData.receipt_id
        axios.get('http://127.0.0.1:8000/api/receipt/' + this.props.match.params.id)
        .then(res =>{
            this.setState({
                supplier_id: res.data.supplier_id,
                bill_total: res.data.bill_total,
            });
        })
    }

    componentWillMount(){
        this.loadSupplier();
        this.editReceipt();
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
                                        <Label for="Name" className="mr-sm-2">Mã nhà cung cấp</Label>
                                        <Input type="select" onChange={ this.onHandleChange } value={this.state.supplier_id} name="supplier_id" id="supplier_id" >
                                            {this.state.suppliers.map((supplier, index) =>
                                                    <option key={ index } value={supplier.supplier_id}>{supplier.supplier_name}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Tổng tiền phiếu nhập</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.bill_total } name="bill_total" id="bill_total" readOnly/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="update">Ngày cập nhật</Label>
                                        <Input type="date" name="update_at" id="exampleDate" onChange={ this.onHandleChange } defaultValue={moment(this.state.update_at).format("yyyy-MM-DD")} readOnly/>
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

export default EditReceipt;