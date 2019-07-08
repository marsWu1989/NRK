import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

import Demo from './../components/demo';
import Demo2 from './../components/demo2';

const Routers = () => (
    <Switch>
        <Route path="/" exact component={Demo} />
        <Route path="/demo2" exact component={Demo2} />
    </Switch>
);

export default Routers;