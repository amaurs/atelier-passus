import React, { Component } from 'react';
import './Hamburger.css';

export default class Hamburger extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return <div onClick={this.props.onClick} className={"Hamburger-icon" + (this.props.isActive?" active":"")}>
                 <div className="Hamburger-hamburger"></div>
               </div>
    }
}