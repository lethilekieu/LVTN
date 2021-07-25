import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state={
            categories_name: "",
            created_at: moment(new Date()).format("yyyy-MM-DD"),
            //attr: ''
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
        console.warn('send: ', this.state.categories_name);
        const listCate = {
            categories_name: this.state.categories_name,
            created_at: this.state.created_at
        }
        axios.post('http://127.0.0.1:8000/api/categories/', listCate)
        .then(rep => {
            if(rep != null){
                // this.setState({
                //     categories_name: ""
                // });
                // return this.props.props.history.push("/admin/home/categories");
                return this.props.history.push("/admin/home/categories");
            }
        })
        .catch(err =>{
            err.response.data.map((error) =>{
                console.log(error);
                toast.error('Lỗi: '+ error);
            })
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
                                <Form inline>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="cateName" className="mr-sm-2">Tên danh mục</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="categories_name" id="categories_name" placeholder="Nhập vào tên danh mục" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="cateCreate">Ngày thêm</Label>
                                        <Input type="date" name="created_at" id="exampleDate" defaultValue={moment(this.state.created_at).format("yyyy-MM-DD")} readOnly/>
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
