import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './Menu.css';
import Footer from './Footer.js';
import Lines from './Lines.js';
import instagram from './images2/instagram.svg';

class Menu extends Component {

  render() {
    let isActive = this.props.isActive;
    return <div className={"Menu" + (isActive?" active":"")}>
             <div className="White"></div>
             <aside className="Aside">
               <Link className="Menu-item" 
                     to="/projects" 
                     onClick={()=>this.props.onClick()}>{this.props.t("projects")}
                     <Lines />
               </Link>
               <Link className="Menu-item" 
                     to="/about" 
                     onClick={()=>this.props.onClick()}>{this.props.t("about")}
                     <Lines />
               </Link>
               <Link className="Menu-item" 
                     to="/studio" 
                     onClick={()=>this.props.onClick()}>{this.props.t("studio")}
                     <Lines />
               </Link>
               <a className="Menu-item" 
                  href="https://www.instagram.com/passusatelier/">
                  <img alt="" 
                       className="Menu-instagram" 
                       src={instagram}/>
               </a>
             </aside>
             <Footer t={this.props.t} onClick={this.props.onClick}/>
           </div>
  }

}

export default Menu;