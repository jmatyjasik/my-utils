import React from "react";
import { Home } from "./components/Home";
import { Journal } from "./components/journal/Journal";

import { BrowserRouter, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { Container } from "@material-ui/core";


export const HomeRoute = "/";
export const JournalRoute = "/journal/";

export const Routing = ()=> {
    return (
   
            <Container>
                <Route path={HomeRoute} exact component={Home} />
                <Route path={JournalRoute} component={Journal} />
            </Container >
   
    );
}