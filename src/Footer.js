import React, { Component } from 'react';
import './Footer.css';
import Logo from './Logo.js';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render() {
      return ( 
        <div className="Footer">
          <Link to="/" onClick={()=>this.props.onClick()}>
            <Logo style={ {position: "absolute",
                           bottom: "32.5px", 
                           left: "32.5px",
                           width: "75px"} }/>
          </Link>
        </div>
      )
    }
}