import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

import Hamburger from './Hamburger.js';
import logo from './logo.svg';


class Menu extends Component {

    handleClick(language) {
      this.props.handleMenu();
      console.log("Language is: " + language);
      if(language === "es"){
        this.props.changeLanguage("fr");
      } else if(language === "fr"){
        this.props.changeLanguage("es");
      }
    }

    render() {
        return <aside className={"Menu" + (this.props.isActive?" active":"")}>
                  <ul>
                    <li><NavLink className="Menu-item" to="/" activeClassName="active" exact onClick={()=>this.props.handleMenu()}>{this.props.t("projects")}</NavLink></li>
                    <li><NavLink className="Menu-item" to="/about" activeClassName="active" exact onClick={()=>this.props.handleMenu()}>{this.props.t("about")}</NavLink></li>
                    <li><NavLink className="Menu-item" to="/contact" activeClassName="active" exact onClick={()=>this.props.handleMenu()}>{this.props.t("contact")}</NavLink></li>
                    <li><span><a className="Menu-item" onClick={() => this.handleClick("fr")}>es</a> / <a className="Menu-item" onClick={() => this.handleClick("es")}>fr</a></span></li>
                  </ul>
               </aside>
    }

}

export default Menu;