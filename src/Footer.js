import React, { Component } from 'react';
import './Footer.css';
import Logo from './Logo.js';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render() {
      return ( 
        <div className="Footer">
          <p>Atelier-Passus<br />{this.props.t("contact-paragraph3")}</p>
          <Link to="/" onClick={()=>this.props.onClick()}>
            <Logo style={ {position: "absolute",
                           bottom: "25px", 
                           right: "25px",
                           width: "50px"} }/>
          </Link>
        </div>
      )
    }
}