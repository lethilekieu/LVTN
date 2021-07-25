import React, { Component } from 'react';
import Search from '../Search/Search';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import ContentCategories from '../ContentCategories/ContentCategories';
class ProductCategories extends Component {
    constructor(props){
        super(props);
        this.state={
            keyword:'',
            categories_id:this.props.match.params.id,
        }
    }
    static getDerivedStateFromProps(props, state){
        console.log('room click hook: ', props, state);
        return { categories_id: props.match.params.id };
    }
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    render() {
        console.log(this.state.keyword);
        console.log(this.props.match.params.id);
        return (
            <div style={{overflow:"hidden", width:"100vw", textDecoration: 'none'}}>
                <Navigation propsParent = {this.props} />
                <Carousels />
                {/* <Header onSearch={this.props.onSearch} /> */}
                <Search />
                <ContentCategories categories_id={this.state.categories_id}/>
                <span> </span>
                <Footer />
            </div>
        );
        
    }
}

export default ProductCategories;
