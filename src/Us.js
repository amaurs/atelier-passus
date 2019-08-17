import React, { Component } from 'react';
import './Us.css';
import assets from './assets.js';

export default class Us extends Component {
    render() {
      return ( 
        <div className="Us">

          <div className={"Us-image-container"}>
            <img alt="studio" 
                 src={assets.studio2} />
          </div>
          <div className="Us-content">
            <div className="Us-colabs">
              <h2>{this.props.t("usFooter1")}</h2>
              <p>{this.props.t("usFooter2")}</p>
              <p>{this.props.t("usFooter3")}</p>
              <p>{this.props.t("usFooter4")}</p>
              <h2>{this.props.t("usFooter5")}</h2>
              <p>{this.props.t("usFooter6")}</p>
              <p>{this.props.t("usFooter7")}</p>
              <p>{this.props.t("usFooter8")}</p>
              <h2>{this.props.t("usFooter9")}</h2>
              <p>{this.props.t("usFooter10")}</p>
            </div>
            <div className="Us-litany">
              <p>{this.props.t("usParagraph2")}</p>
              <p>{this.props.t("usParagraph3")}</p>
              <p>{this.props.t("usParagraph4")}</p>
              <p>{this.props.t("usParagraph5")}</p>
              <p>{this.props.t("usParagraph6")}</p>
              <p>{this.props.t("usParagraph7")}</p>
              <p>{this.props.t("usParagraph8")}</p>
            </div>
          </div>
        </div>
      )
    }
}