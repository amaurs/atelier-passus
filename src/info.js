import React, { Component } from 'react';
import './Info.css';
import assets from './assets.js';


class Info extends Component {


    render() {

        let headers = this.props.info.info.headers.map((h, index) => <h3 key={index}>{h}</h3>);
        let paragraphs = this.props.info.info.paragraphs.map((p, index) => <p key={index}>{p}</p>);
        let images = this.props.info.info.images.map((p, index) => <a className="thumbnail" key={index}>{index + 1}</a>);
        return  <div className="Info-container">
                   <div className="Info-text">
                        <h1>{this.props.info.info.title}</h1>
                        {headers}
                        {paragraphs}
                        {images}
                   </div>
                   <div className="Info-image">
                        <img src={assets.boissy1}/>
                   </div>
                </div>;
    }

}

export default Info;