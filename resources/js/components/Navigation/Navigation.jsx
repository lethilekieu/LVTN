import React from 'react';
import axios from 'axios';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'reactstrap';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            customer_id: "",
            customer_name: "",
            customer_email: "",
            customer_phone: "",

            isOpen: false,
            categories:[],
            brand:[],
            product_type:[]
        };
    };
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/categories')
        .then(res=>{
            // console.log(res);
            this.setState({categories:res.data});
        });
        axios.get('http://127.0.0.1:8000/api/brand')
        .then(res=>{
            this.setState({brand:res.data});
        });
        axios.get('http://127.0.0.1:8000/api/product-type')
        .then(res=>{
            this.setState({product_type:res.data});
        });
        
    }
    showProductType(){
        // console.log(this.state.product_type);
        const lstproducttype=this.state.product_type.map((item, index)=>
            <MenuItem key={index}>
                <Link to={ '/product-type/' + item.product_type_id } style={{color:'black'}}>
                {item.product_type_name}
                </Link>
            </MenuItem>);
        return lstproducttype;
    }

    showBrand(){
        // console.log(this.state.brand);
        const lstbrand = this.state.brand.map((item, index)=>
            <DropdownItem key={index}>
                <Link to={ '/brand/' + item.brand_id } style={{color:'black'}}>
                    <NavbarText className="nav-link"><span>{item.brand_name}</span></NavbarText>
                </Link>
            </DropdownItem>
        );
        return lstbrand;
    }

    componentWillMount(){
        var customer = sessionStorage.getItem('objCustomer') ? JSON.parse(sessionStorage.getItem('objCustomer')) : '';
        this.setState({
            customer_id: customer.customer_id,
            customer_name: customer.customer_name,
            customer_email: customer.customer_email,
            customer_phone: customer.customer_phone
        })
    }

    onLogout(){
        sessionStorage.removeItem('objCustomer');
        this.setState({
            customer_id: "",
            customer_name: "",
            customer_email: "",
            customer_phone: "",
        })
        if(sessionStorage.getItem('objCustomer') == null){
            alert("Đã đăng xuất tài khoản")
            return this.props.propsParent.history.push("/");
        }
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render() {
        return (
            // <Row style={{border: "2px solid red", width:"100vw"}}>
                <Navbar  expand="md" className="menu">
                    <NavbarToggler onClick={()=>this.toggle()} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <Row style={{ width:"100vw"}}>
                                <Col xs="12" md="2">
                                    <NavItem>
                                            <Link to="/">
                                            <div className="logo">
                                                <h2><span style={{color:'gold'}}>KV</span>Store</h2>
                                            </div>
                                            </Link>
                                    </NavItem>  
                                </Col>
                                <Col xs="12" md="8">
                                    <Row style={{margin:"auto"}}>
                                        <Col md="3">
                                            <NavItem className="home">
                                                <Link to="/">TRANG CHỦ</Link>
                                            </NavItem>
                                        </Col>
                                        <Col md="3">
                                            <NavItem className="products-new">
                                                <Link to="/products-new" >HÀNG MỚI VỀ</Link>
                                            </NavItem>
                                        </Col>
                                        <Col md="3">
                                            {/* <UncontrolledDropdown nav inNavbar> */}
                                            <Menu menuButton={<MenuButton >SẢN PHẨM</MenuButton>}>
                                                {this.showProductType()}
                                            </Menu>
                                        </Col>
                                        <Col md="3">
                                            <UncontrolledDropdown nav inNavbar>
                                                <DropdownToggle nav caret className="dropdown">THƯƠNG HIỆU</DropdownToggle>
                                                <DropdownMenu right>
                                                    {this.showBrand()}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="12" md="2">
                                    <Row style={{margin:"auto"}}>
                                        <Col md="6" style={{margin:"auto"}}>
                                            <NavItem className="cart">
                                                <Link to="/cart"><FontAwesomeIcon icon={faCartPlus} size="lg" /></Link>
                                                {/* <span>0</span> */}
                                            </NavItem>
                                        </Col>
                                        <Col md="6" style={{margin:"auto"}}>
                                            <UncontrolledDropdown nav inNavbar>
                                                <DropdownToggle nav caret className="dropdown" className="iconu"><FontAwesomeIcon icon={faUser} size="lg" /> <span> {this.state.customer_name} </span></DropdownToggle>
                                                    <DropdownMenu right>
                                                        {   sessionStorage.getItem('objCustomer') != null && (
                                                            <>
                                                                <DropdownItem>
                                                                    <Link to={"/edit-customer/" + this.state.customer_id} style={{color:'black'}}>
                                                                        <NavbarText className="nav-link" ><span>{this.state.customer_name}</span></NavbarText>
                                                                    </Link>
                                                                </DropdownItem>
                                                                <DropdownItem>
                                                                    <Link to={"/history-order/" + this.state.customer_id} style={{color:'black'}}>
                                                                        <NavbarText className="nav-link" ><span>Xem lịch sử đơn hàng</span></NavbarText>
                                                                    </Link>
                                                                </DropdownItem>
                                                                <DropdownItem onClick={ ()=>this.onLogout()}>
                                                                    <NavbarText className="nav-link"><span>Đăng xuất</span></NavbarText>
                                                                </DropdownItem>
                                                            </>
                                                            )
                                                        }
                                                        {   sessionStorage.getItem('objCustomer') == null && (
                                                                <>
                                                                    <DropdownItem>
                                                                        <Link to="/register" style={{color:'black'}}>
                                                                            <NavbarText className="nav-link"><span>Đăng ký</span></NavbarText>
                                                                        </Link>
                                                                    </DropdownItem>
                                                                    <DropdownItem>
                                                                        <Link to="/login" style={{color:'black'}}>
                                                                            <NavbarText className="nav-link"><span>Đăng nhập</span></NavbarText>
                                                                        </Link>
                                                                    </DropdownItem>
                                                                </>
                                                            )
                                                        }
                                                    </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            
                        </Nav>
                    </Collapse>
                </Navbar>
            // </Row>
        );
    }
}

export default Navigation;