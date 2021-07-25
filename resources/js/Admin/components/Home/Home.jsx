import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';

class InputToGetReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year_input: '',
            month_input: '',
        }
    }

    onSubmit(){
        this.props.loadInputToResponseData(
            this.state.year_input,
            this.state.month_input
        )
    }
    
    render() {
        return (
            <div>
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Name" className="mr-sm-2">Nhập vào năm cần kiểm tra</Label>
                        <Input type="text" onChange={ (e) => {this.setState({ year_input: e.target.value});} } value={this.state.slide_name} name="year_input" id="year_input"/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Name" className="mr-sm-2">Nhập vào tháng cần kiểm tra</Label>
                        <Input type="text" onChange={ (e) => {this.setState({ month_input: e.target.value});} } value={this.state.slide_name} name="month_input" id="month_input"/>
                    </FormGroup>
                    <Button onClick={ ()=>this.onSubmit() }>Submit</Button>
                </Form>
                <hr></hr>
            </div>
        );
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            funds: [],
            incomestatement: [],
            productsell: [],
            year_input: (new Date()).getFullYear(),
            month_input: (new Date()).getMonth()+1,

            product:[],
            quantity:[]
        }
        this.loadInput = this.loadInput.bind(this);
    }

    loadIncomestatement(){
        axios.get('http://127.0.0.1:8000/api/get-income-statement/' + this.state.year_input)
        .then(res=>{
            console.log('doanh thu: ', res);
            this.setState({
                incomestatement: res.data
            })
        }).catch( err => console.log(err) );
    }

    loadFunds(){
        axios.get('http://127.0.0.1:8000/api/get-funds/' + this.state.year_input)
        .then(res=>{
            console.log('vốn liếng: ', res);
            this.setState({
                funds: res.data
            })
        }).catch( err => console.log(err) );
    }

    // loadProductSell(){
    //     axios.get('http://127.0.0.1:8000/api/get-product-seller')
    //     .then(res=>{
    //         console.log('seller: ', res);
    //         this.setState({
    //             productsell: res.data
    //         })
    //     }).catch( err => console.log(err) );
    // }

    loadProductSell(){
        const dateForProductSell = {
            year: this.state.year_input,
            month: this.state.month_input
        }
        axios.post('http://127.0.0.1:8000/api/get-total-product-by-month/', dateForProductSell)
        .then(res=>{
            console.log('seller: ', res);
            var temp_products = [];
            var temp_quatity = [];
            res.data.map(item => {
                temp_products.push(item.product_name);
                temp_quatity.push(item.product_quantity);
            })
            this.setState({
                product: temp_products,
                quantity: temp_quatity
            }, ()=>console.log(this.state.quantity))
        }).catch( err => console.log(err) );
    }

    loadInput(year, month){
        this.setState({
            year_input: year,
            month_input: month
        },()=>{
            this.loadIncomestatement();
            this.loadFunds();
            this.loadProductSell();
        })
    }

    componentWillMount(){
        this.loadIncomestatement();
        this.loadFunds();
        this.loadProductSell();
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
                                {/* <AddCategories props={this.props}/> */}
                                {/* <div>đây là nơi hiển thị</div> */}
                                <InputToGetReport loadInputToResponseData = {this.loadInput}/>
                                <Line 
                                    style={{ maxHeight: '35vh' }}
                                    data={{
                                        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4','Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8','Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                                        datasets: [
                                            {
                                                label: 'Doanh thu hàng tháng',
                                                data: this.state.incomestatement,
                                                backgroundColor: 'rgba(220, 20, 60, 0.2)',
                                                borderColor: 'rgba(220, 20, 60, 1)',
                                            },
                                            {
                                                label: 'Vốn nhập hàng tháng',
                                                data: this.state.funds,
                                                backgroundColor: 'rgba(248, 148, 6, 0.2)',
                                                borderColor: 'rgba(248, 148, 6, 1)',
                                            },
                                        ],
                                    }}
                                />
                                <Bar 
                                    style={{ maxHeight: '35vh' }}
                                    data={{
                                        labels: this.state.product,
                                        datasets: [
                                            {
                                                label: 'Doanh thu hàng tháng',
                                                data: this.state.quantity,
                                                backgroundColor: [
                                                    'rgba(255, 99, 132, 0.2)',
                                                    'rgba(255, 159, 64, 0.2)',
                                                    'rgba(255, 205, 86, 0.2)',
                                                    'rgba(75, 192, 192, 0.2)',
                                                    'rgba(54, 162, 235, 0.2)',
                                                    'rgba(153, 102, 255, 0.2)',
                                                    'rgba(201, 203, 207, 0.2)'
                                                ],
                                                borderColor: [
                                                    'rgb(255, 99, 132)',
                                                    'rgb(255, 159, 64)',
                                                    'rgb(255, 205, 86)',
                                                    'rgb(75, 192, 192)',
                                                    'rgb(54, 162, 235)',
                                                    'rgb(153, 102, 255)',
                                                    'rgb(201, 203, 207)'
                                                ],
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
