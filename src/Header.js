import React, { Component } from 'react';
import './Header.css';
import Hamburger from './Hamburger.js';
import logo from './logo.svg';

export default class Menu extends Component {

    render() {
        return (
            <div className="Header">
              <img src={logo} className="Header-logo" alt="Atelier Passus" />
              <Hamburger onClick={e => this.props.handleMenu()} 
                       isActive={this.props.isActive}/>;
            </div>
        )
    }

}