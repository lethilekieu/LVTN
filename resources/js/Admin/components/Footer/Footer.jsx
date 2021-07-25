import React from 'react';
import PropTypes from 'prop-types';

class Footer extends React.Component {
    render() {
        return (
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright © Your Website 2021</span>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
