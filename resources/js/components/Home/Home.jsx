import React from 'react';
import Search from '../Search/Search';
import Navigation from '../Navigation/Navigation';
// import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import Content from '../Content/Content';
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            keyword:'',
        }
    }
    // handleSearch(value){
    //     this.setState({
    //         keyword:value
    //     });
    // }
    render() {
        console.log(this.state.keyword);
        return (
            <div style={{overflow:"hidden", width:"100vw", textDecoration: 'none'}}>
                <Navigation propsParent = {this.props} />
                <Carousels />
                {/* <Header onSearch={this.props.onSearch} /> */}
                <Content propsParent = {this.props}/>
                <span> </span>
                <Footer />
            </div>
        );
        
    }
}

export default Home;
