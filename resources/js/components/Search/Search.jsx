import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Button, Form, Label, Input} from 'reactstrap';
class Search extends React.Component {
    render() {
        return (
            <Container style={{marginTop:"25px",marginRight:"auto",marginBottom:"25px",marginRight:"auto", width:"100vw"}}>
            
                <Row>
                    <Col md={4} />
                    <Col md={5}>
                        <Button color="primary">
                            <Link to="/search"><h5 style={{color:'white'}}>Bấm vào đây để tìm!!!</h5></Link>
                        </Button>
                    </Col>
                    <Col md={3} />
                </Row>
            </Container>
        );
    }
}

export default Search;