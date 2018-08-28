import React, { Component } from 'react';
import './Language.css';

export default class Language extends Component {

    render(){
      return (
        <div className="Language">
          <button onClick={() => this.props.changeLanguage("es")}>es</button>
          <span>/</span>
          <button onClick={() => this.props.changeLanguage("fr")}>fr</button>
        </div>
        )
    }
}