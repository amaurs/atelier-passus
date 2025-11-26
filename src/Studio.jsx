import React, { Component } from 'react';
import './Studio.css';
import assets from './assets.js';

export default class Studio extends Component {
    render() {
      return ( 
        <div className="Studio">

          <img alt="studio" 
               className={"Studio-image"}
            src={assets.studio1} />
          <p>{this.props.t("studio-paragraph0")}</p>
          <p>{this.props.t("studio-paragraph1")}</p>
          <p>{this.props.t("studio-paragraph2")}</p>
             {this.props.t("studio-paragraph3")}<br/>
             {this.props.t("studio-paragraph4")}<br/>
             {this.props.t("studio-paragraph5")}<br/>
             {this.props.t("studio-paragraph6")}<br/>
             {this.props.t("studio-paragraph7")}<br/>
             {this.props.t("studio-paragraph8")} 
        </div>
      )
    }
}