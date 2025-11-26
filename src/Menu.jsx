import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './Menu.css';
import Footer from './Footer.jsx';
import Lines from './Lines.jsx';
import instagram from './images2/instagram.svg';

class Menu extends Component {

  render() {
    let isActive = this.props.isActive;
    return <div className={"Menu" + (isActive?" active":"")}>
             <aside className="Aside">
               <Link className="Menu-item" 
                     to="/projects" 
                     onClick={()=>this.props.onClick()}><Lines />{this.props.t("projects")}
               </Link>
               <Link className="Menu-item" 
                     to="/studio" 
                     onClick={()=>this.props.onClick()}><Lines />{this.props.t("studio")}
               </Link>
               <Link className="Menu-item" 
                     to="/us" 
                     onClick={()=>this.props.onClick()}><Lines />{this.props.t("us")}
                     
               </Link>
               <Link className="Menu-item" 
                     to="/contact" 
                     onClick={()=>this.props.onClick()}><Lines />{this.props.t("contact")}
               </Link>
               <a className="Menu-item" 
                  href="https://www.instagram.com/passusatelier/">
                  <Lines /><img alt="Instagram" 
                       className="Menu-instagram" 
                       src={instagram}/>
               </a>
             </aside>
             <Footer t={this.props.t} onClick={this.props.onClick}/>
           </div>
  }

}

export default Menu;