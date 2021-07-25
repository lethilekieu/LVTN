import React from 'react';
import ReactDOM from 'react-dom';
import RouteUrl from './RouteUrl';
function Index() {
    return ( 
        <>
            <RouteUrl/>
        </>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render( <Index /> , document.getElementById('app'));
}