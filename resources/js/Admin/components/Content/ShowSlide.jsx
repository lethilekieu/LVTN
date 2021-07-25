import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar'
import { storage } from '../../../FirebaseConfig';

export default class ShowSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Slide: [],
        };
        this.loadSlide = this.loadSlide.bind(this);
    }

    loadSlide(){
        axios.get('http://127.0.0.1:8000/api/slide')
        .then(res => {
            this.setState({
                Slide: res.data
            })
        }).catch(err => console.log(err));
    }
    
    componentWillMount(){
        this.loadSlide();
    }

    onDelete(id, urlImage){
        try { 
            storage.refFromURL(urlImage).delete().then(() => {
                alert("Picture is deleted successfully!");
                axios.delete('http://127.0.0.1:8000/api/slide/' + id)
                .then(res =>{
                    if(res.data != null){
                        this.loadSlide();
                    }
                }).catch(err => {
                    err.response.data.map(error => {
                        alert(error);
                    })
                })
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            alert("Can't delete Picture!");
            console.log(error);
        }
    }

    render() {
        return (
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Danh sách banner</h6>
                                    </div>
                                    <div className="card-body">
                                        <Label for="Name" className="mr-sm-2">Thêm banner:</Label>
                                        <Link to = {"/admin/home/add-slide/"}>
                                            <Button color="success" style={{margin: "10px"}}>Thêm</Button>
                                        </Link>
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã banner</th>
                                                        <th>Tên banner</th>
                                                        <th>Mô tả</th>
                                                        <th>Trạng thái</th>
                                                        <th>Tên hình</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã banner</th>
                                                        <th>Tên banner</th>
                                                        <th>Mô tả</th>
                                                        <th>Trạng thái</th>
                                                        <th>Tên hình</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        // "categories_id":1,"categories_name":"\u00c1o","created_at":null,"update_at":null
                                                        this.state.Slide.map((item, index) => 
                                                            // <div key={ index }>
                                                            //     <p>
                                                            //         categories_id: {item.categories_id}<br />
                                                            //         categories_name: {item.categories_name}<br/>
                                                            //     </p>    
                                                            //     <br/>              
                                                            //     <br/>                
                                                            // </div>
                                                            <tr key={ index }>
                                                                <td>{item.slide_id}</td>
                                                                <td>{item.slide_name}</td>
                                                                <td>{item.slide_desc}</td>
                                                                <td>{item.slide_status}</td>
                                                                {/* <td>{item.slide_image}</td> */}
                                                                <td><img height="100" width="200" src={ item.slide_image } alt="Card image cap" /></td>
                                                                <td>
                                                                    <Link to = {"/admin/home/edit-slide/" + item.slide_id}>
                                                                        <Button outline color="info" style={{margin: "10px"}}>Sửa</Button>
                                                                    </Link>
                                                                    <Button onClick={ (id)=>this.onDelete(item.slide_id, item.slide_image ) } outline color="danger" style={{margin: "10px"}}>Xóa</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}
