import React, { Component } from 'react';
import './Header.css';
import Hamburger from './Hamburger.js';

export default class Menu extends Component {

    render() {
        return (
            <div className="Header">
              <Hamburger onClick={e => this.props.handleMenu()} 
                       isActive={this.props.isActive}/>;
            </div>
        )
    }

}