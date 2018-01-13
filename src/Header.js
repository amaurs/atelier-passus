import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
        return  <div className="Header">
                    <div className="language">
                      <button className={this.props.language === "es"?"active es":"es"} onClick={() => this.props.changeLanguage('es')}>es</button>
                      <button className={this.props.language === "fr"?"active fr":"fr"} onClick={() => this.props.changeLanguage('fr')}>fr</button>
                    </div>
                    <ul>
                    <li className="company">Atelier / PASSUS</li>
                    <li><NavLink to="/" activeClassName="active" exact>{this.props.t("projects")}</NavLink></li>
                    <li><NavLink to="/about" activeClassName="active" exact>{this.props.t("about")}</NavLink></li>
                    <li><NavLink to="/contact" activeClassName="active" exact >{this.props.t("contact")}</NavLink></li>
                    </ul>
                </div>;
    }

}

export default Header;