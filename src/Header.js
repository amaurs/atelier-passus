import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from './images/logo-full.gif';


class Header extends Component {

    handleClick(language) {
      this.props.handleMenu();
      if(language === "es"){
        this.props.changeLanguage("fr");
      } else if(language === "fr"){
        this.props.changeLanguage("es");
      }
    }


    render() {
        return <div className="hero-head">
                 <nav className="navbar is-transparent">
                   <div className="navbar-brand">
                     <img className="attelier-on-top" src={logo} alt="Atelier Passus"  />
                     <div className={"navbar-burger attelier-on-top " + (this.props.active?" is-active":"")} data-target="atelier-menu" onClick={()=>this.props.handleMenu()}>
                       <span className="line-1"></span>
                       <span className="line-2"></span>
                       <span className="line-3"></span>
                     </div>
                   </div>
                   <div id="atelier-menu " className={"navbar-menu attelier-menu" + (this.props.active?" is-active":"")} >
                     <div className="navbar-start has-text-centered">
                       <NavLink className="navbar-item" to="/" activeClassName="active" exact onClick={()=>this.props.handleMenu()}>{this.props.t("projects")}</NavLink>
                       <NavLink className="navbar-item" to="/about" activeClassName="active" exact onClick={()=>this.props.handleMenu()}>{this.props.t("about")}</NavLink>
                       <NavLink className="navbar-item" to="/contact" activeClassName="active" exact onClick={()=>this.props.handleMenu()}>{this.props.t("contact")}</NavLink>
                       <a className="navbar-item" onClick={() => this.handleClick(this.props.language)}>{this.props.t("language")}</a>
                     </div>
                     <div className="navbar-end">
                       
                     </div>
                   </div>
                 </nav>
               </div>
    }

}

export default Header;