import React, { Component } from 'react';
import './Info.css';
import assets from './assets.js';


class Info extends Component {


    render() {
        console.log(this.props.info.info.images[this.props.image]);
        let headers = this.props.info.info.headers.map((h, index) => <h3 key={index}>{h}</h3>);
        let paragraphs = this.props.info.info.paragraphs.map((p, index) => <p key={index}>{p}</p>);
        let images = this.props.info.info.images.map((p, index) => <button className="thumbnail" key={index} onClick={()=>this.props.onClick(index)}>{index + 1}</button>);
        return  <div className="Info-container">
                   <div className="Info-text">
                        <h1>{this.props.info.info.title}</h1>
                        {headers}
                        {paragraphs}
                        {images}
                   </div>
                   <div className="Info-image">
                        <img src={assets[this.props.info.info.images[this.props.image]]}/>
                   </div>
                </div>;
    }

}

export default Info;