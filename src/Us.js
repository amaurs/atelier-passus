import React, { Component } from 'react';
import './Us.css';
import assets from './assets.js';

export default class Us extends Component {
    render() {
      return ( 
        <div className="Us">

          <img alt="studio" className={"Us-image"}
                       src={assets.us} />
          <p>{this.props.t("about-paragraph0")}</p>
          <p>{this.props.t("about-paragraph1")}</p>
          <p>{this.props.t("about-paragraph2")}</p>
             {this.props.t("about-paragraph3")}<br/>
             {this.props.t("about-paragraph4")}<br/>
             {this.props.t("about-paragraph5")}<br/>
             {this.props.t("about-paragraph6")}<br/>
             {this.props.t("about-paragraph7")}<br/>
             {this.props.t("about-paragraph8")} 
        </div>
      )
    }
}