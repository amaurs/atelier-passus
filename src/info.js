import React, { Component } from 'react';
import './Info.css';
import assets from './assets.js';

class Info extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            image: 0,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleTumbnail = this.handleTumbnail.bind(this);
    }
    handleClick() {
      this.props.history.push('/')
    }  
    handleTumbnail(id){
      this.setState({image:id});
    }

    render() {
        let n = this.props.info.info.images.length;
        let headers = this.props.info.info.headers.map((h, index) => <h3 key={index}>{h}</h3>);
        let paragraphs = this.props.info.info.paragraphs.map((p, index) => <p key={index}>{p}</p>);
        let images = this.props.info.info.images.map((p, index) => <button className={ "Info-thumb " + (index===this.state.image?"highlight":"")} key={index} onClick={()=>this.handleTumbnail(index)}>{index + 1}</button>);
        return  <div className="Info-container">
                   <div className="Info-image">
                        <img alt="" src={assets[this.props.info.info.images[this.state.image]]}/>
                        <ul className="Info-nav">
                          <li><button className="thumbnail" onClick={()=>this.handleTumbnail(((this.state.image - 1) % n + n) % n)}>&lt;&lt;</button></li>
                          <li><button className="thumbnail" onClick={()=>this.handleClick()}>Gallery</button></li>
                          <li><button className="thumbnail" onClick={()=>this.handleTumbnail((this.state.image + 1) % n)}>&gt;&gt;</button></li>
                        </ul>
                   </div>
                   <div className="Info-text-container">
                        <div className="Info-text">
                          <h1>{this.props.info.info.title}</h1>
                          {headers}
                          {paragraphs}
                          <div id="Info-shortcut">
                            {images}
                          </div>
                        </div>
                   </div>
                </div>;
    }

}

export default Info;