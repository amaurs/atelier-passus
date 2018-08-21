import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import Footer from './Footer.js';
import instagram from './images2/instagram.svg';

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
        return <div className={"Menu" + (this.props.isActive?" active":"")}>
                 <aside className="Aside">
                   <NavLink className="Menu-item" to="/" activeClassName="active" exact onClick={()=>this.props.handleMenu()}>{this.props.t("projects")}</NavLink>
                   <NavLink className="Menu-item" to="/about" activeClassName="active" exact onClick={()=>this.props.handleMenu()}>{this.props.t("about")}</NavLink>
                   <span><a className="Menu-item" onClick={() => this.handleClick("fr")}>es</a> / <a className="Menu-item" onClick={() => this.handleClick("es")}>fr</a></span>
                   <a className="Menu-item" href="https://www.instagram.com/passusatelier/"><img alt="" className="Menu-instagram" src={instagram}/></a>
                 </aside>
                 <Footer t={this.props.t}/>
               </div>
    }

}

export default Menu;