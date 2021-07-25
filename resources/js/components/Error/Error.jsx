import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';

export default class ErrorPage extends Component {
    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Navigation />
                <Carousels />
                <Header />
                <div className="container-fluid">
                    <div className="text-center">
                        <div className="error mx-auto" data-text={404}>404</div>
                        <p className="lead text-gray-800 mb-5">Page Not Found</p>
                        <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                        <Link to="/">← Back to Home</Link>
                    </div>                                          
                </div>
                <span> </span>
                <Footer />
            </div>
        )
    }
}
