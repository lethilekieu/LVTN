import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import './Recruitment.css';
class Recruitment extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                    <Navigation propsParent = {this.props}sw />
                    <Carousels />
                    <div className="form-group">
                        <div className="container">   
                            <h1 className="recruitment" style={{fontWeight:'bold', color: 'black'}}>TUYỂN DỤNG</h1>
                            <hr />
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <ul style={{fontWeight:'bold', color: 'black'}}>Đối tượng</ul>
                                    <span> Nam hoặc nữ tuổi từ 18 đến 23, không tiền án, tiền sự.</span>
                                    <ul style={{fontWeight:'bold', color: 'black'}}>Hồ sơ xin việc gồm</ul>
                                        <li>Đơn xin việc.</li>
                                        <li>Giấy khám sức khỏe trong vòng 6 tháng.</li>
                                        <li>Bản sao bằng tốt nghiệp phổ thông ( có chứng thực).</li>
                                        <li>Bản sao CMND.</li>
                                        <li>Nộp trực tiếp tại: 180 Cao Lỗ, P4, Q8, TP.HCM</li>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <ul style={{fontWeight:'bold', color: 'black'}}>Yêu cầu</ul>
                                        <li>Yêu thích thời trang</li>
                                        <li> Khả năng giao tiếp tốt.</li>
                                        <li>Có khả năng nắm bắt công việc nhanh, chăm chỉ, ham học hỏi.</li>
                                        <li>Chịu áp lực công việc, có tư cách đạo đức, trung thực, hòa đồng.</li>
                                        <li>Có tinh thần trách nhiệm cao trong công việc.</li>
                                        <li>Có ý thức chấp hành kỷ luật tốt.</li>
                                        <li>Ưu tiên có kinh nghiệm bán hàng.</li>
                                        <li>Mong muốn được làm việc lâu dài.</li>
                                </div>
                            </div>
                            <ul></ul>
                            <h3 style={{fontWeight:'bold', color: 'black', textAlign:'center'}}>Cảm ơn sự hợp tác của các bạn!!!</h3>
                        </div>
                    </div>
                    <span> </span>
                    <Footer />
            </div>
        );
    }
}

export default Recruitment;
