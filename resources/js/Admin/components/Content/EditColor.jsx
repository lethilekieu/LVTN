import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

class EditColor extends Component {
    constructor(props) {
        super(props);
        this.state={
            color_name: "",
            update_at: moment(new Date()).format("yyyy-MM-DD")
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
        const listColor = this.state;
        axios.put('http://127.0.0.1:8000/api/color/' + this.props.match.params.id, listColor)
        .then(res => {
            if(res != null){
                return this.props.history.push("/admin/home/color");
            }
        }) 
        .catch(err =>{
            err.response.data.map((error) =>{
                console.log(error);
                toast.error('Lỗi: '+ error);
            })
        })
    }

    editColor(){
        axios.get('http://127.0.0.1:8000/api/color/' + this.props.match.params.id)
        .then(res=>{
            console.log(res.data);
            this.setState({
                color_name: res.data.color_name
            });
        })
    }

    componentWillMount(){
        this.editColor();
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
                                        <Label for="cateName" className="mr-sm-2">Tên màu</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={
                                            this.state.color_name
                                            } name="color_name" id="color_name" placeholder="Nhập vào tên màu" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleDate">Ngày cập nhật</Label>
                                        <Input type="date" name="update_at" id="exampleDate" value={
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
        );
    }
}

export default EditColor;