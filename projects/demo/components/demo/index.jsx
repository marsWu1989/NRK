import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Demo';
class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = { // 初始state
            index: 0,
        };
    }
    render() {
        
        return (
            <div className={s.demo} ref="demo">
                <NavLink to="/demo2">to demo2</NavLink>
            </div>
        );
    }
}

export default Demo;