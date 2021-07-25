import { faCogs, faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, DropdownItem, Form, Nav, NavItem, NavLink } from 'reactstrap';
class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            admin_id: "",
            admin_name: "",
            admin_email: "",
            admin_phone: "",
            admin_password: "",
            grant:""
        };
        this.onLogout = this.onLogout.bind(this);
    }

    componentWillMount(){
        var admin = sessionStorage.getItem('objAdmin') ? JSON.parse(sessionStorage.getItem('objAdmin')) : '';
        this.setState({
            admin_id: admin.admin_id,
            admin_name: admin.admin_name,
            grant: admin.grant,
        })
    }

    onLogout(){
        sessionStorage.removeItem('objAdmin');
        if(sessionStorage.getItem('objAdmin') == null){
            return this.props.propsParent.history.push("/admin/");
        }
    }

    render() {
        return ( 
            <Nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <Button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3"><i className="fa fa-bars" /></Button>
                
                {/* Topbar Navbar */}
                <Nav as="ul" className="navbar-nav ml-auto">
                    {/* Nav Item - Search Dropdown (Visible Only XS) */}
                    {/* <NavItem as="li" className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-search fa-fw" /></a>
                        
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                            <Form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <Button className="btn btn-primary" type="button">
                                        <FontAwesomeIcon icon={ faSearch } size="sm" />
                                    </Button>
                                </div>
                                </div>
                            </Form>
                        </div>
                    </NavItem> */}
                    {/* Nav Item - Alerts */}
                    <div className="topbar-divider d-none d-sm-block" />
                    {/* Nav Item - User Information */}
                    <NavItem as="li" className="nav-item dropdown no-arrow">
                        <NavLink className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.state.admin_name}</span>
                            <img className="img-profile rounded-circle" src="/images/img/undraw_profile.svg" />
                        </NavLink>
                        {/* Dropdown - User Information */}
                        <Dropdown className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <Link style={{textDecoration: 'none'}} to={"/admin/home/edit-admin/" + this.state.admin_id}>
                                <DropdownItem className="dropdown-item">
                                        <FontAwesomeIcon icon={ faUser } size="sm" fixedWidth className="mr-2 text-gray-400"/>
                                        Sửa thông tin
                                </DropdownItem>
                            </Link>
                            {/* <DropdownItem className="dropdown-item">
                                <Link  style={{textDecoration: 'none'}} to="#">
                                    <FontAwesomeIcon icon={ faCogs } size="sm" fixedWidth className="mr-2 text-gray-400"/>
                                    Settings
                                </Link>
                            </DropdownItem>
                            <DropdownItem className="dropdown-item">
                                <Link  style={{textDecoration: 'none'}} to="#">
                                    <FontAwesomeIcon icon={ faUser } size="sm" fixedWidth className="mr-2 text-gray-400"/>
                                    Activity Log
                                </Link>
                            </DropdownItem> */}
                            <div className="dropdown-divider" />
                            <DropdownItem className="dropdown-item" onClick={ ()=>this.onLogout()} data-toggle="modal" data-target="#logoutModal">
                                <FontAwesomeIcon icon={ faSignOutAlt } size="sm" fixedWidth className="mr-2 text-gray-400"/>
                                Đăng xuất
                            </DropdownItem>
                        </Dropdown>
                    </NavItem>
                </Nav>
            </Nav>
        );
    }
}

export default Header;

