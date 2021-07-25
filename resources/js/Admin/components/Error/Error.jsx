import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export default class ErrorPage extends Component {
    render() {
        return (
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header/>
                            <div className="container-fluid">
                                <div className="text-center">
                                    <div className="error mx-auto" data-text={404}>404</div>
                                    <p className="lead text-gray-800 mb-5">Page Not Found</p>
                                    <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                                    <Link to="/admin/home">← Back to Dashboard</Link>
                                </div>                                          
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}
