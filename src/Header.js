import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from './images/logo-full.gif';


class Header extends Component {

    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.props.history.push('/')
    }

    render() {
        return  <nav className="navbar is-transparent">
                  <div className="navbar-brand">
                    <img src={logo} alt="Atelier Passus"  />
                    <div className="navbar-burger burger" data-target="atelier-menu" onClick={()=>this.props.handleMenu()}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div id="atelier-menu" className={"navbar-menu" + (this.props.active?" is-active":"")} >
                    <div className="navbar-start">
                      <NavLink className="navbar-item" to="/" activeClassName="active" exact>{this.props.t("projects")}</NavLink>
                      <NavLink className="navbar-item" to="/about" activeClassName="active" exact>{this.props.t("about")}</NavLink>
                      <NavLink className="navbar-item" to="/contact" activeClassName="active" exact >{this.props.t("contact")}</NavLink>
                    </div>
                    <div className="navbar-end">
                      <button className="navbar-item button" onClick={() => this.props.changeLanguage('es')}>es</button>
                      <button className="navbar-item button" onClick={() => this.props.changeLanguage('fr')}>fr</button>
                    </div>
                  </div>
                </nav>
    }

}

export default Header;