import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)
import './Footer.css';
class Footer extends React.Component {
    render() {
        return (
            <div>
                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div className="kv-shop">
                                    <h2><span style={{color:'gold'}}>KV</span>Store</h2>
                                    <p>Địa chỉ: 180 Cao Lỗ- Phường 4- Quận 8- TP.HCM</p>
                                    <p>Điện thoại: +84 123456789</p>
                                    <p>Email: info@kvstore.com</p>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div className="profile">
                                    <h2>Về <span style={{color:'gold'}}>KV</span>Store</h2>
                                    <ul>
                                        <li><Link to="/gioi-thieu-kvstore">Giới thiệu</Link></li>
                                        <li><a href="#">Liên hệ</a></li>
                                        <li><Link to="/tuyen-dung">Tuyển dụng</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div className="help">
                                    <h2>Hỗ trợ</h2>
                                    <ul>
                                        <li><a href="#">Hướng dẫn mua hàng</a></li>
                                        <li><a href="#">Chính sách đổi trả</a></li>
                                        <li><a href="#">Chính sách vận chuyển</a></li>
                                        <li><a href="#">Hướng dẫn thanh toán</a></li>
                                        <li><a href="#">Chính sách bảo mật</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div className="links">
                                    <h2>Liên kết</h2>
                                    <Link to="/components/facebook">
                                        <FontAwesomeIcon icon={["fab", "facebook"]} size="lg" className="iconface"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;
