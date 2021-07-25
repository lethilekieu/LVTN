import React from 'react';
import ReactDOM from 'react-dom';
import RouteUrl from './RouteUrl';
import './sb-admin-2.min.css';
function Index() {
    return ( 
        <>
            <RouteUrl/>
        </>
    );
}

export default Index;

if (document.getElementById('app_admin')) {
    ReactDOM.render( <Index /> , document.getElementById('app_admin'));
}