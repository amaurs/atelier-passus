import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Logo.css';
import logo from './logo.svg';

export default class Logo extends Component {
    render() {
        return (
            <div className={"Logo" + (this.props.isActive?" active":"")} >
                <NavLink to="/#hero"><img src={logo} alt="Atelier Passus" /></NavLink>
            </div>
            )
    }
}