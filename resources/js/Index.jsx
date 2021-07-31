import React from "react";
import ReactDOM from "react-dom";
import RouteUrl from "./RouteUrl";
import { BrowserRouter } from "react-router-dom";
function Index() {
    return <RouteUrl />;
}

export default Index;

ReactDOM.render(
    <BrowserRouter>
        <Index />
    </BrowserRouter>,
    document.getElementById("app")
);
