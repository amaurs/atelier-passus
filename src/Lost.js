import React, { Component } from 'react';
import './Lost.css';

export default class Lost extends Component {
    render() {
      return ( 
        <div className="Lost">
          <p>{this.props.t("four-oh-four-header0")}</p>
        </div>
      )
    }
}