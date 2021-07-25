import axios from 'axios';
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { storage } from '../../../FirebaseConfig';

export default class EditSlide extends Component {
    constructor(props) {
        super(props);
        this.state={
            slide_name: '',
            slide_desc: '',
            slide_status: '',
            slide_image: '',

            haveAChangeFile: false,
            slide_save_image: null,
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleChangeFile = this.onHandleChangeFile.bind(this);
        this.showChangeImg = this.showChangeImg.bind(this);
    }

    onHandleChange(event){
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onHandleChangeFile(e){
        console.log(e.target.files[0])
        this.setState({
            slide_save_image: e.target.files[0],
        })
    }

    onSubmit(){
        if(this.state.haveAChangeFile == false){
            const listSlide = this.state;
            axios.put('http://127.0.0.1:8000/api/slide/' + this.props.match.params.id, listSlide)
            .then(res =>{
                if(res!= null){
                    return this.props.history.push('/admin/home/slide');
                }
            })
            .catch(err =>{
                err.response.data.map((error) =>{
                    console.log(error);
                    toast.error('Lỗi: '+ error);
                })
            })
        }else{
            if(this.state.slide_save_image != null){
                try { 
                    storage.refFromURL(this.state.slide_image).delete()
                    .then(() => {
                        alert("Picture is deleted successfully!");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                } catch (error) {
                    alert("Can't delete Picture!");
                    console.log(error);
                }
                try {
                    var newNameFile = Date.now() + "_" + this.state.slide_save_image.name;
                    var child = newNameFile;
            
                    const uploadTask = storage.ref('slide').child(child).put(this.state.slide_save_image);
                        uploadTask.on("state_changed", snapshot => {}, error => { console.log(error) }, () => {
                            storage.ref('slide').child(child).getDownloadURL()
                            .then(urlImage => { 
                                this.setState({slide_image: urlImage});

                                const listSlide = this.state;
                                axios.put('http://127.0.0.1:8000/api/slide/' + this.props.match.params.id, listSlide)
                                .then(res =>{
                                    if(res!= null){
                                        return this.props.history.push('/admin/home/slide');
                                    }
                                })
                                .catch(err =>{
                                    err.response.data.map((error) =>{
                                        console.log(error);
                                        toast.error('Lỗi: '+ error);
                                    })
                                })
                            })
                        });
                } catch (error) {
                    console.error(error);
                }                
            } else {
                alert('Phải chọn hình trước khi cập nhật')
            }
        }
    }

    editSlide(){
        axios.get('http://127.0.0.1:8000/api/slide/' + this.props.match.params.id)
        .then( res => {
            this.setState({
                slide_name: res.data.slide_name,
                slide_desc: res.data.slide_desc,
                slide_status: res.data.slide_status,
                slide_image: res.data.slide_image,
            });
        })
    }

    
    showChangeImg(){
        if(this.state.haveAChangeFile == true){
            return <Input type="file" onChange={ this.onHandleChangeFile } name="slide_image" id="slide_image" required />
        }
        else{
            return <Input type="text" defaultValue={ this.state.slide_image} name="slide_image" id="slide_image" readOnly />
        }
    }

    componentWillMount(){
        this.editSlide();
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
                                        <Label for="brandName" className="mr-sm-2">Tên banner</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={this.state.slide_name} name="slide_name" id="slide_name"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandSlug" className="mr-sm-2">Mô tả</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={this.state.slide_desc} name="slide_desc" id="slide_desc" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandDesc" className="mr-sm-2">Trạng thái</Label>
                                        {/* <Input type="text" onChange={ this.onHandleChange } value={this.state.slide_status} name="slide_status" id="slide_status" /> */}
                                        <Input type="select" value={this.state.slide_status} onChange={ this.onHandleChange } name="slide_status" id="slide_status" >
                                            <option value={1}>Đang chạy</option>
                                            <option value={0}>Đã ngừng</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label check><Input onChange={ (e)=>{ this.setState({haveAChangeFile: e.target.checked}) } } type="checkbox"/>Chọn để thay đổi hình</Label>
                                        {
                                            // (this.state.haveAChangeFile == true) ? (
                                            //     <Input type="file" onChange={ this.onHandleChangeFile } name="slide_image" id="slide_image" required />
                                            // ) : (
                                            //     <Input type="text" value={ this.state.slide_image} name="slide_image" id="slide_image" readonly />
                                            // )
                                            this.showChangeImg()
                                        }
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
