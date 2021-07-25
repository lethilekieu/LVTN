import { faAdversal } from '@fortawesome/free-brands-svg-icons';
import { faAddressCard, faChartArea, faCog, faFolder, faLaughWink, faTable, faTachometerAlt, faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grant: "",
        }
        this.showSideAdmin = this.showSideAdmin.bind(this);
    }

    componentWillMount(){
        var admin = sessionStorage.getItem('objAdmin') ? JSON.parse(sessionStorage.getItem('objAdmin')) : '';
        this.setState({
            grant: admin.grant,
        })
    }

    showSideAdmin(){
        if(this.state.grant == 1){
            return <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAA" aria-expanded="true" aria-controls="collapseAA">
                            <FontAwesomeIcon icon={ faAddressCard } fixedWidth className="mr-2"/>
                            <span>Quản lý tài khoản</span>
                        </a>
                        <div id="collapseAA" className="collapse" aria-labelledby="headingAA" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Quản lý nhân viên:</h6>
                                <Link className="collapse-item" to="/admin/home/admin">Xem nhân viên</Link>
                                <Link className="collapse-item" to="/admin/home/add-admin">Thêm nhân viên</Link>
                            </div>
                        </div>
                    </li>
        }
    }

    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin/home">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <FontAwesomeIcon icon={ faLaughWink } size="2x"/>
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </Link>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                <li className="nav-item active">
                    <Link className="nav-link" to="/admin/home">
                        <FontAwesomeIcon icon={ faTachometerAlt } fixedWidth className="mr-2"/>
                        <span>Dashboard</span>
                    </Link>
                </li>
                {/* Divider */}
                <hr className="sidebar-divider" />
                {/* Heading */}
                <div className="sidebar-heading">Chức năng cơ bản</div>
                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <FontAwesomeIcon icon={ faCog } fixedWidth className="mr-2"/>
                        <span>Quản lý hàng hóa</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Chức năng danh mục:</h6>
                            <Link className="collapse-item" to="/admin/home/categories">Xem danh mục</Link>
                            <Link className="collapse-item" to="/admin/home/add-categories">Thêm danh mục</Link>

                            <h6 className="collapse-header">Chức năng thương hiệu:</h6>
                            <Link className="collapse-item" to="/admin/home/brand">Xem thương hiệu</Link>
                            <Link className="collapse-item" to="/admin/home/add-brand">Thêm thương hiệu</Link>

                            <h6 className="collapse-header">Chức năng sản phẩm:</h6>
                            <Link className="collapse-item" to="/admin/home/product">Xem sản phẩm</Link>
                            <Link className="collapse-item" to="/admin/home/add-product">Thêm sản phẩm</Link>

                            <h6 className="collapse-header">Chức năng loại:</h6>
                            <Link className="collapse-item" to="/admin/home/product-type">Xem loại</Link>
                            <Link className="collapse-item" to="/admin/home/add-product-type">Thêm loại</Link>

                            <h6 className="collapse-header">Chức năng màu:</h6>
                            <Link className="collapse-item" to="/admin/home/color">Xem màu</Link>
                            <Link className="collapse-item" to="/admin/home/add-color">Thêm màu</Link>
                            <Link className="collapse-item" to="/admin/home/color-details">Xem chi tiết màu</Link>
                            <Link className="collapse-item" to="/admin/home/add-color-details">Thêm chi tiết màu</Link>

                            <h6 className="collapse-header">Chức năng size:</h6>
                            <Link className="collapse-item" to="/admin/home/size-details">Xem chi tiết size</Link>
                            <Link className="collapse-item" to="/admin/home/add-size-details">Thêm chi tiết size</Link>
                        </div>
                    </div>
                </li>
                {/* Nav Item - Utilities Collapse Menu */}
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <FontAwesomeIcon icon={ faWrench } fixedWidth className="mr-2"/>
                        <span>Quản lý nhập</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Chức năng nhà cung cấp:</h6>
                            <Link className="collapse-item" to="/admin/home/supplier">Xem nhà cung cấp</Link>
                            <Link className="collapse-item" to="/admin/home/add-supplier">Thêm nhà cung cấp</Link>

                            <h6 className="collapse-header">Chức năng phiếu nhập:</h6>
                            <Link className="collapse-item" to="/admin/home/receipt">Xem phiếu nhập</Link>
                            <Link className="collapse-item" to="/admin/home/add-receipt">Thêm phiếu nhập</Link>
                            <Link className="collapse-item" to="/admin/home/receipt-details">Xem chi tiết phiếu nhập</Link>
                            <Link className="collapse-item" to="/admin/home/add-receipt-details">Thêm chi tiết phiếu nhập</Link>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBB" aria-expanded="true" aria-controls="collapseBB">
                        <FontAwesomeIcon icon={ faAdversal } fixedWidth className="mr-2"/>
                        <span>Quản lý promotion</span>
                    </a>
                    <div id="collapseBB" className="collapse" aria-labelledby="headingBB" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Chức năng quảng cáo:</h6>
                            <Link className="collapse-item" to="/admin/home/slide">Xem banner</Link>
                            <Link className="collapse-item" to="/admin/home/add-slide">Thêm banner</Link>
                        </div>
                    </div>
                </li>
                
                {/* Divider */}
                <hr className="sidebar-divider" />
                {/* Heading */}
                <div className="sidebar-heading">Quản lý nâng cao</div>
                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                        <FontAwesomeIcon icon={ faFolder } fixedWidth className="mr-2"/>
                        <span>Quản lý đặt hàng</span>
                    </Link>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Quản lý đơn giao hàng:</h6>
                            <Link className="collapse-item" to="/admin/home/tbl-order">Xem đơn giao</Link>
                            <div className="collapse-divider" />
                            <h6 className="collapse-header">Other Pages:</h6>
                            <Link className="collapse-item" to="/admin/err">404 Page</Link>
                        </div>
                    </div>
                </li>
                {
                    this.showSideAdmin()
                }
                {/* Nav Item - Charts */}
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/home">
                        <FontAwesomeIcon icon={ faChartArea } fixedWidth className="mr-2"/>
                        <span>Biểu đồ</span>
                    </Link>
                </li>
                {/* Nav Item - Tables */}
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/home">
                        <FontAwesomeIcon icon={ faTable } fixedWidth className="mr-2"/>
                        <span>Thống kê</span>
                    </Link>
                </li>
            </ul>
        )
    }
}
