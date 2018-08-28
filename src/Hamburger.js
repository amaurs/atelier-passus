import React, { Component } from 'react';
import './Hamburger.css';

export default class Hamburger extends Component {
    render() {
      let hide = "";
      let el = document.querySelector('.Hamburger'),
          bounds = el && el.getBoundingClientRect();
      if(this.props.scroll < this.props.height) {
        hide = " hide";
      }
      return (
          <div onClick={this.props.onClick} className={"Hamburger" + hide}>
            <div className="Hamburger-hamburger"></div>
          </div>
      )
    }
}