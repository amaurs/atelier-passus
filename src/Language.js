import React, { Component } from 'react';
import './Language.css';

export default class Language extends Component {

    render(){
      let hide = "";
      let el = document.querySelector('.Hamburger'),
          bounds = el && el.getBoundingClientRect();
      if(this.props.scroll < this.props.height) {
        hide = " hide";
      }
      return (
        <div className={"Language" + hide}>
          <button onClick={() => this.props.changeLanguage("es")}>es</button>
          <span>/</span>
          <button onClick={() => this.props.changeLanguage("fr")}>fr</button>
        </div>
        )
    }
}