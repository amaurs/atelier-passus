import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Logo.css';
import logo from './logo.svg';

export default class Logo extends Component {
    render() {
        return (
            <div className={"Logo" + 
                            (this.props.isActive?" active":"") + 
                            (this.props.additionalClass==null?"":" " + this.props.additionalClass)} 
                 style={this.props.style}>
                <NavLink to="/#hero"><img src={logo} alt="Atelier Passus" /></NavLink>
            </div>
            )
    }
}