import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export default class EditSupplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // supplier: {},
            supplier_name: "",
            update_at: moment(new Date()).format("yyyy-MM-DD")
        };
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            // supplier:{
            //     [e.target.name]: e.target.value
            // }
            [e.target.name]: e.target.value
        });
    }

    onSubmit(){
        console.warn('send: ', this.state.supplier_name);
        // const listSupp = this.state.supplier;
        const listSupp = this.state;
        axios.put('http://127.0.0.1:8000/api/supplier/' + this.props.match.params.id, listSupp)
        .then(res => {
            if(res != null){
                return this.props.history.push('/admin/home/supplier');
            }
        })
        .catch(err=>{
            err.response.data.map((error) =>{
                console.log(error);
                toast.error('Lỗi: ' + error)
            })
        })
    }

    editSupplier(){
        axios.get('http://127.0.0.1:8000/api/supplier/' + this.props.match.params.id)
        .then(res => {
            console.log(res.data);
            this.setState({
                // supplier: res.data
                supplier_name: res.data.supplier_name,
            })
        })
    }

    componentWillMount(){
        this.editSupplier();
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
                                <Form inline>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="supplier_name" className="mr-sm-2">Tên nhà cung cấp</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={this.state.supplier_name} name="supplier_name" id="supplier_name" placeholder="Nhập vào tên nhà cung cấp" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleDate">Ngày cập nhật</Label>
                                        <Input type="date" name="date" id="exampleDate" value={this.state.update_at} onChange={ this.onHandleChange } readOnly/>
                                    </FormGroup>
                                    <Button onClick={ ()=>this.onSubmit() }>Submit</Button>
                                </Form> 
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}
