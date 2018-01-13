
import React, { Component } from 'react';
import './Plain.css';

class Plain extends Component {
    render() {
        let headers = this.props.info.info.headers.map((h, index) => <h3 key={index}>{this.props.t(h)}</h3>);
        let paragraphs = this.props.info.info.paragraphs.map((p, index) => <p key={index}>{this.props.t(p)}</p>);
        
        return  (
                <div className="Plain-container">
                   <div className="Plain-text-container">
                        <div className="Plain-text">
                          <h1>{this.props.t(this.props.info.info.title)}</h1>
                          {headers}
                          {paragraphs}
                        </div>
                   </div>
                </div>
                );
    }
}



export default Plain;