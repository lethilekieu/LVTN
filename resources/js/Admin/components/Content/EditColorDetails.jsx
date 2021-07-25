import moment from 'moment';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

class EditColorDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: "",
            color_id: "",
            update_at: moment(new Date()).format("yyyy-MM-DD"),

            colors: [],
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

    loadColors(){
        axios.get('http://127.0.0.1:8000/api/color/')
        .then(res=>{
            this.setState({
                colors: res.data,
                color_id: res.data[0].color_id
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

    editColorDetails(){
        axios.get('http://127.0.0.1:8000/api/color-details/' +  this.props.match.params.id)
        .then(res =>{
            this.setState({
                color_id: res.data.color_id,
                product_id: res.data.product_id,
            });
        })
    }

    componentWillMount() {
        this.loadColors();
        this.loadProducts();
        this.editColorDetails();
    }

    onSubmit(){
        const listColorDetails = {
            product_id: this.state.product_id,
            color_id: this.state.color_id,
            update_at: this.state.update_at
        }
        axios.put('http://127.0.0.1:8000/api/color-details/' + this.props.match.params.id, listColorDetails)
        .then(res => {
            if(res != null){
                return this.props.history.push('/admin/home/color-details');
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
                                        <Label for="Name" className="mr-sm-2">Mã màu</Label>
                                        <Input type="select" onChange={ this.onHandleChange } value={this.state.color_id} name="color_id" id="color_id" >
                                            {this.state.colors.map((color, index) =>
                                                    <option key={ index } value={color.color_id}>{color.color_name}</option>
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
                                    <FormGroup>
                                        <Label for="Create">Ngày cập nhật</Label>
                                        <Input type="date" name="update_at" id="exampleDate" defaultValue={moment(this.state.update_at).format("yyyy-MM-DD")} readOnly/>
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

export default EditColorDetails;