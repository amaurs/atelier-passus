import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import Footer from './Footer.js';
import Logo from './Logo.js';
import instagram from './images2/instagram.svg';
import lines from './lines.svg';

class Menu extends Component {

    handleClick(language) {
      this.props.handleMenu();
      console.log("Language is: " + language);
      if(language === "es") {
        this.props.changeLanguage("fr");
      } else if(language === "fr") {
        this.props.changeLanguage("es");
      }
    }

    render() {
        return <div className={"Menu" + (this.props.isActive?" active":"")}>
                 <aside className="Aside">
                   <NavLink className="Menu-item" to="/#projects" activeClassName="active" exact onClick={()=>this.props.handleMenu()}>{this.props.t("projects")}<img className="Menu-lines" src={lines} /></NavLink>
                   <NavLink className="Menu-item" to="/about" activeClassName="active" exact onClick={()=>this.props.handleMenu()}>{this.props.t("about")}<img className="Menu-lines" src={lines} /></NavLink>
                   <span><button onClick={() => this.handleClick("fr")}>es</button><span className="Menu-item inactive">/</span><button onClick={() => this.handleClick("es")}>fr</button></span>
                   <a className="Menu-item" href="https://www.instagram.com/passusatelier/"><img alt="" className="Menu-instagram" src={instagram}/></a>
                 </aside>
                 <Logo isActive={this.props.isActive} 
                       style={ {bottom: "10px", 
                                right: "10px",
                                width: "80px",
                                height: "80px",
                                zIndex: "50"} }/>
                 <Footer t={this.props.t}/>
               </div>
    }

}

export default Menu;