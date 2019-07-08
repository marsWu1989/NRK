import React, { Component } from 'react';
class Demo2 extends Component {
    constructor(props) {
        super(props);
        this.state = { // 初始state
            index: 0,
        };
    }
    render() {
        
        return (
            <div ref="demo2">
                hello world
            </div>
        );
    }
}

export default Demo2;