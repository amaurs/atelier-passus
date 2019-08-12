import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {
  render() {
    let headers = this.props.headers.map(
         (h, index) => <h2 key={index} 
                           className="Card-subtitle">{this.props.t(h)}</h2>);
    let paragraphs = this.props.paragraphs.map(
         (p, index) => <p key={index} 
                          className="Card-text">{this.props.t(p)}</p>);



    let footer = null;

    if(this.props.footer != undefined) {
        footer = this.props.footer.map(
         (p, index) => <p key={index} 
                          className="Card-text">{this.props.t(p)}</p>);
    }


    

    let shortcut = null;

    if(this.props.images.length > 1) {
      shortcut = <Shortcut images={this.props.images}
                           index={this.props.index}
                           handleOnSlide={this.props.handleOnSlide}/>
    }
    
    return (
        <div className="Card">
          {shortcut}
          <h1 className="Card-title">{this.props.t(this.props.title)}</h1>
          {headers}
          <div className="Card-description">
          {paragraphs}
          </div>
          <div className="Card-footer">
          {footer}
          </div>
        </div>
      )
  }
}

function Shortcut(props) {
  return (
      <div className="Shortcut">
        {props.images.map((image, index) => 
        <button className={ "Shortcut-thumb " + (index===props.index?" highlight":"")} 
                key={index} 
                onClick={()=>props.handleOnSlide(index)}><span>{index + 1}</span>
        </button>)}
      </div>
    )
}