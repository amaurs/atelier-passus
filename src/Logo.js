import React, { Component } from 'react';
import './Logo.css';
import logo from './logo.svg';

export default class Logo extends Component {
    render() {
        return (
            <div className={"Logo" + (this.props.isActive?" active":"")} >
                <img src={logo} alt="Atelier Passus" />
            </div>
            )
    }
}