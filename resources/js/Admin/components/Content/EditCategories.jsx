import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export default class EditCategories extends Component {
    constructor(props) {
        super(props);
        this.state={
            // category:{},
            categories_name: "",
            update_at: moment(new Date()).format("yyyy-MM-DD")
            //attr: ''
        };
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            // category:{
            //     [e.target.name] : e.target.value
            // }
            [e.target.name] : e.target.value
        });
    }

    onSubmit(){
        console.warn('send: ', this.state.categories_name);
        // const listCate = {
        //     categories_name: this.state.categories_name,
        //     update_at: this.state.update_at
        // }
        // const listCate = this.state.category;
        const listCate = this.state;
        axios.put('http://127.0.0.1:8000/api/categories/' + this.props.match.params.id, listCate)
        .then(res => {
            if(res != null){
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

    editCategory(){
        axios.get('http://127.0.0.1:8000/api/categories/' + this.props.match.params.id)
        .then(res=>{
            console.log(res.data);
            this.setState({
                // category: res.data,
                categories_name: res.data.categories_name
            });
        })
    }

    componentWillMount(){
        this.editCategory();
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
                                        <Input type="text" onChange={ this.onHandleChange } value={
                                            // this.state.category.categories_name
                                            this.state.categories_name
                                            } name="categories_name" id="categories_name" placeholder="Nhập vào tên danh mục" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleDate">Ngày cập nhật</Label>
                                        <Input type="date" name="date" id="exampleDate" value={
                                            // this.state.category.update_at
                                            this.state.update_at
                                            } onChange={ this.onHandleChange } readOnly/>
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
