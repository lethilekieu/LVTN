import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import Details from '../ProductDetails/Details/Details';
class ProductDetails extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state={
    //         product_id: '',
    //         product_slug: '',
    //     }
    // }

    // componentWillMount() {
    //     //this.props.location.sendData.product_id || null
    //     // console.log(this.props.location.sendData.product_id);
    //     if(typeof this.props.location.sendData === 'undefined'){
    //         this.setState({
    //             product_slug: this.props.match.params.slug
    //         })
    //     } else {
    //         this.setState({
    //             product_id: this.props.location.sendData.product_id
    //         })
    //     }
    // }
    
    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Navigation propsParent = {this.props}/>
                <Carousels />
                {/* <Details id={this.state.product_id} slug={this.state.product_slug} /> */}
                <div className="form-group">
                    <div className="container">
                        <Details id={this.props.match.params.id} />
                    </div>
                </div>
                <Footer />
            </div>
        );
        
    }
}

export default ProductDetails;