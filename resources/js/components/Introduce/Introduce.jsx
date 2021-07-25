import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import './Introduce.css';
class Introduce extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                    <Navigation propsParent = {this.props}/>
                    <Carousels />
                    <div className="form-group">
                        <div className="container">   
                            <h1 className="introduce" style={{fontWeight:'bold', color: 'black'}}>VỀ KVSTORE</h1>
                            <hr />
                            <div style={{textAlign:'center', color:'black'}}>
                                <h5>KVStore.xyz là website bán lẻ thời trang trẻ trực tuyến với những mẫu thời trang Unisex từ các thương hiệu trong nước và nước ngoài. Các bạn có thể mặc đi học, đi chơi, vừa thoải mái, vừa lịch sự.
                                    Luôn cập nhật liên tục các mẫu hot trend cho các bạn trẻ lựa chọn. Chúng tôi cam kết đồng hành & mang lại nhiều kiểu dáng thời trang unisex cho các bạn!!!</h5>
                            </div>
                            <div  style={{textAlign:'center', color:'black'}}><h3>Thông tin liên hệ</h3>
                                <div><h5>Địa chỉ: 180 Cao Lỗ, P4, Q8, TP.HCM</h5></div>
                                
                                <div><h5>Điện thoại: 0905111111</h5></div>
                            </div>
                        </div>
                    </div>
                    <span> </span>
                    <Footer />
            </div>
        );
    }
}

export default Introduce;
