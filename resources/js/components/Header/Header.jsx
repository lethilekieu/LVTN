import { event } from 'jquery';
import React from 'react';
import { Container, Row, Col, Button, Form, Label, Input} from 'reactstrap';
import _ from 'lodash';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import {useState} from 'react';
import ProductsSearch from './ProductsSearch/ProductsSearch'

function Header(props) {
    const [data, setData] = useState([]);
    async function Search(key){
        console.warn(key);
        let result= await fetch("http://127.0.0.1:8000/api/search/"+key);
        result= await result.json();
        console.warn(result);
        setData(result);
    }
    let elements=data.map((item) => {
            return <div key={item.product_id} >
                    <ProductsSearch
                        id={item.product_id}
                        name={item.product_name}
                        price={item.unit_price}
                        promotion_price={item.promotion_price}
                        image={item.product_image}
                        content={item.product_desc}
                        product_slug={item.product_slug}
                    />
                </div>
    }); 
    return ( 
        <div style={{overflow:"hidden", width:"100vw"}}>
            <Navigation propsParent = {props}/>
            <Carousels />
            <Container style={{marginTop:"25px",marginRight:"auto",marginBottom:"25px",marginRight:"auto", width:"100vw", minHeight: '60vh'}}>
                <Row>
                    <Col md="2"></Col>
                    <Col md="8" style={{margin:"auto"}}>
                        <Form>
                            <Row>
                                <Col md={2} />
                                <Col md={7} >
                                    <Input type="text" onChange={(e)=>Search(e.target.value)} placeholder="Nhập sản phẩm cần tìm..."  />
                                    {/* <ContentSearch /> */}
                                        {/* required  
                                    - onChange={this.onChange} */}
                                    
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="row">
                                            {elements}
                                        </div>
                                    </div>
                                    
                                </Col>
                                <Col md={3}>
                                    {/* <Button color="primary" type="submit" >Search</Button>  onSubmit={this.handleSubmit} */}
                                    {/* <input style={{color:'blueviolet'}} type="submit" value="Submit" />  onClick={this.onSearch}*/}
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col md="2"></Col>
                </Row>
            </Container>
            <span> </span>
            <Footer />
        </div>
    );   
} 
export default Header;

