import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {
  render() {
    let headers = this.props.headers.map(
         (h, index) => <h2 key={index} className="RenderHelper-subtitle">{this.props.t(h)}</h2>);
    let paragraphs = this.props.paragraphs.map(
         (p, index) => <p key={index} className="RenderHelper-text">{this.props.t(p)}</p>);
    let imageThumbnails = <div className="RenderHelper-shortcut">
                            {this.props.images.map((p, index) => 
                            <button className={ "RenderHelper-thumb " + (index===this.props.index?" highlight":"")} 
                                    key={index} 
                                    onClick={()=>this.props.handleOnSlide(index)}>{index + 1}
                            </button>)}
                          </div>
    return (
        <div className="RenderHelper-aside">
          <h1 className="Card-title">{this.props.t(this.props.title)}</h1>
          {headers}
          <div className="RenderHelper-description">
          {paragraphs}
          </div>
          {imageThumbnails}
        </div>
      )
  }
}