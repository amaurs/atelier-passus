import React, { Component } from 'react';
import './Header.css';
import logo from './images/logo.gif';


class Header extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.props.history.push('/')
    }

    render() {
        return  <div className="Header"><img alt="" src={logo} onClick={this.handleClick}/></div>;
    }

}

export default Header;