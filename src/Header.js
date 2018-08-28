import React, { Component } from 'react';
import './Header.css';
import Hamburger from './Hamburger.js';

export default class Menu extends Component {

    render() {
        console.log(this.props);
        return (
            <div className="Header">
              <Hamburger onClick={this.props.handleMenu} 
                         isActive={this.props.isActive} 
                         scroll={this.props.scroll} 
                         height={this.props.height} />
            </div>
        )
    }

}