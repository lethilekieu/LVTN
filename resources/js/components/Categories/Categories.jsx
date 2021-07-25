import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import AllProduct from './AllProduct/AllProduct';
class Categories extends Component {
    constructor(props){
        super(props);
        this.state={
            categories:[],
            categories_id: this.props.match.params.id,
        }
    }
    static getDerivedStateFromProps(props, state){
        console.log('room click hook: ', props, state);
        return { categories_id: props.match.params.id }; 
    }
    componentDidMount(){
        // axios.get('http://127.0.0.1:8000/api/product')
        //     .then(res=>{
        //         this.setState({product:res.data});
        //     });
        axios.get('http://127.0.0.1:8000/api/categories')
            .then(res=>{
                this.setState({categories:res.data});
            });
            window.scrollTo(0, 0);
    }
    showCategoriess(){
        // console.log(this.state.categories);
        const lstCategories = this.state.categories.map((item, index)=>
            <Link to={ '/categories/' + item.categories_id} 
            style={{color:'black'}}  key={index} className="list-group-item">
                {item.categories_name}
            </Link>
        );
        return lstCategories;
    }
    render() {
        // console.log(this.props.match.params.id);
        
    return(
        <div style={{overflow:"hidden", width:"100vw"}}>
        <Navigation propsParent = {this.props}/>
        <Carousels />
        <Search />
        <div className="form-group">
            <div className="container">
                <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <div className="list-group">
                            {this.showCategoriess()}
                        </div>
                    </div>
                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <div className="row">
                        <AllProduct categories_id = {this.state.categories_id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <span> </span>
        <Footer />
    </div>
    );
    }
}

export default Categories;