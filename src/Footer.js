import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
    render() {
      return ( 
        <div className="Footer">
          <p>Atelier-Passus</p>
          <p>{this.props.t("contact-paragraph3")}</p>
        </div>
      )
    }
}