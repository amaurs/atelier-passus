import React, { Component } from 'react';
import './Header.css';
import Hamburger from './Hamburger.js';
import Logo from './Logo.js';

export default class Menu extends Component {

    render() {
        return (
            <div className="Header">
              <Logo isActive={this.props.isActive} 
                    additionalClass={"main"}
                    style={ {top: "10px", 
                             left: "10px",
                             width: "80px",
                             height: "80px",
                             zIndex: "50"} }/>
              <Hamburger onClick={e => this.props.handleMenu()} 
                         isActive={this.props.isActive}/>
            </div>
        )
    }

}