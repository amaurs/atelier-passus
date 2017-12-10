import React, { Component } from 'react';
import './Header.css';
import logo from './images/logo.gif';


class Header extends Component {

    render() {
        return  <div className="Header"><img src={logo}/></div>;
    }

}

export default Header;