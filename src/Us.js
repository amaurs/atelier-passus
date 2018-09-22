import React, { Component } from 'react';
import './Us.css';

export default class Us extends Component {
    render() {
      return ( 
        <div className="Us">
          <p>{this.props.t("about-paragraph0")}</p>
          <p>{this.props.t("about-paragraph1")}</p>
          <p>{this.props.t("about-paragraph2")}<br/>
             {this.props.t("about-paragraph3")}<br/>
             {this.props.t("about-paragraph4")}<br/>
             {this.props.t("about-paragraph5")}<br/>
             {this.props.t("about-paragraph6")}<br/>
             {this.props.t("about-paragraph7")}<br/>
             {this.props.t("about-paragraph8")}</p>
        </div>
      )
    }
}