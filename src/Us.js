import React, { Component } from 'react';
import './Us.css';

export default class Us extends Component {
    render() {
      return ( 
        <div className="Us">
          <p>{this.props.t("about-paragraph1")}</p>
          <p>{this.props.t("about-paragraph2")}</p>
          <p>{this.props.t("about-paragraph3")}</p>
          <p>{this.props.t("about-paragraph4")}</p>
          <p>{this.props.t("about-paragraph5")}</p>
          <p>{this.props.t("about-paragraph6")}</p>
        </div>
      )
    }
}