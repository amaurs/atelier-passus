import React, { Component } from 'react';
import './Lines.css';

export default class Lines extends Component {
    render() {
        return (
              <svg className="Lines" style={this.props.style} 
                   xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0 0 27.5 20">
                   <rect x="0" y="0" width="5" height="5" transform="translate(0 7.5)"></rect>
                   <rect x="12.5" y="0" width="20" height="5" transform="translate(0 7.5)"></rect>
              </svg>


            )
    }
}